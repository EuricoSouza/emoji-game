import * as Tone from 'https://cdn.jsdelivr.net/npm/tone@15.1.22/+esm';
import { Midi } from 'https://cdn.jsdelivr.net/npm/@tonejs/midi@2.0.28/+esm';

const fileInput = document.getElementById('midi-file-input');
const addButton = document.getElementById('midi-add');
const clearButton = document.getElementById('midi-clear');
const playlistElement = document.getElementById('midi-playlist');
const trackName = document.getElementById('midi-track-name');
const trackCount = document.getElementById('midi-track-count');
const status = document.getElementById('midi-status');
const playButton = document.getElementById('midi-play');
const pauseButton = document.getElementById('midi-pause');
const stopButton = document.getElementById('midi-stop');
const seekInput = document.getElementById('midi-seek');
const currentTimeLabel = document.getElementById('midi-current-time');
const durationLabel = document.getElementById('midi-duration');

const playlist = [];
let selectedIndex = -1;
let synth;
let position = 0;
let playbackStartedAt = 0;
let playbackTimer;
let progressTimer;
let isPlaying = false;

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

function updateControls() {
  const hasTrack = selectedIndex >= 0;
  playButton.disabled = !hasTrack || isPlaying;
  pauseButton.disabled = !isPlaying;
  stopButton.disabled = !hasTrack;
  seekInput.disabled = !hasTrack;
  clearButton.disabled = playlist.length === 0;
}

function renderPlaylist() {
  playlistElement.replaceChildren();
  trackCount.textContent = `${playlist.length} ${playlist.length === 1 ? 'track' : 'tracks'}`;

  playlist.forEach((track, index) => {
    const row = document.createElement('li');
    row.className = `midi-track-row${index === selectedIndex ? ' is-active' : ''}`;

    const select = document.createElement('button');
    select.className = 'midi-track-select';
    select.type = 'button';
    select.textContent = track.name;
    select.setAttribute('aria-current', index === selectedIndex ? 'true' : 'false');
    select.addEventListener('click', () => selectTrack(index));

    const meta = document.createElement('span');
    meta.className = 'midi-track-meta';

    const duration = document.createElement('span');
    duration.textContent = formatTime(track.duration);

    const remove = document.createElement('button');
    remove.className = 'midi-track-remove';
    remove.type = 'button';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Remove ${track.name}`);
    remove.addEventListener('click', () => removeTrack(index));

    meta.append(duration, remove);
    row.append(select, meta);
    playlistElement.append(row);
  });

  updateControls();
}

function updateProgress() {
  if (selectedIndex < 0) return;
  const track = playlist[selectedIndex];
  const current = isPlaying
    ? Math.min(track.duration, position + Tone.now() - playbackStartedAt)
    : position;
  currentTimeLabel.textContent = formatTime(current);
  seekInput.value = String(track.duration ? Math.round((current / track.duration) * 1000) : 0);
}

function stopPlayback(resetPosition = false) {
  clearTimeout(playbackTimer);
  clearInterval(progressTimer);
  if (synth) synth.releaseAll();
  isPlaying = false;
  if (resetPosition) position = 0;
  updateProgress();
  updateControls();
}

function selectTrack(index) {
  stopPlayback(true);
  selectedIndex = index;
  position = 0;
  const track = playlist[index];
  trackName.textContent = track.name;
  durationLabel.textContent = formatTime(track.duration);
  currentTimeLabel.textContent = '0:00';
  seekInput.value = '0';
  status.textContent = `${track.notes.length} notes ready`;
  renderPlaylist();
}

function removeTrack(index) {
  const [removed] = playlist.splice(index, 1);
  if (removed.objectUrl) URL.revokeObjectURL(removed.objectUrl);

  if (index === selectedIndex) {
    stopPlayback(true);
    selectedIndex = -1;
    trackName.textContent = 'Choose MIDI files to begin';
    durationLabel.textContent = '0:00';
    currentTimeLabel.textContent = '0:00';
    seekInput.value = '0';
    status.textContent = 'Select a track from your playlist.';
  } else if (index < selectedIndex) {
    selectedIndex -= 1;
  }

  renderPlaylist();
}

function parseMidiTrack(name, bytes, objectUrl = '') {
  const midi = new Midi(bytes);
  const notes = midi.tracks.flatMap((track) => track.notes);
  if (!notes.length) throw new Error('No playable notes found');
  const duration = Math.max(midi.duration, ...notes.map((note) => note.time + note.duration));
  return { name, notes, duration, objectUrl };
}

async function loadBundledPlaylist() {
  try {
    const response = await fetch('./midi/playlist.json');
    if (response.status === 404) {
      status.textContent = 'Add files from your device or list them in midi/playlist.json.';
      return;
    }
    if (!response.ok) throw new Error('Playlist manifest could not be loaded');

    const manifest = await response.json();
    const paths = Array.isArray(manifest) ? manifest : manifest.tracks;
    if (!Array.isArray(paths)) throw new Error('Playlist manifest must contain a tracks array');
    status.textContent = `Loading ${paths.length} MIDI tracks...`;

    const loadedTracks = await Promise.all(paths.map(async (entry) => {
      const path = typeof entry === 'string' ? entry : entry.path;
      if (typeof path !== 'string') return null;
      try {
        const fileResponse = await fetch(new URL(path, new URL('./midi/', window.location.href)));
        if (!fileResponse.ok) throw new Error('File could not be loaded');
        const name = typeof entry === 'string' ? path.split('/').pop() : entry.name || path.split('/').pop();
        return parseMidiTrack(name, await fileResponse.arrayBuffer());
      } catch (error) {
        console.warn(`Skipping MIDI file ${path}:`, error);
        return null;
      }
    }));

    playlist.push(...loadedTracks.filter(Boolean));
    renderPlaylist();
    if (playlist.length) selectTrack(0);
    else status.textContent = 'No playable tracks found in midi/playlist.json.';
  } catch (error) {
    status.textContent = 'Could not load midi/playlist.json. Add MIDI files from your device instead.';
    console.warn('MIDI playlist manifest unavailable:', error);
  }
}

async function playTrack() {
  if (selectedIndex < 0 || isPlaying) return;
  const track = playlist[selectedIndex];
  if (position >= track.duration) position = 0;

  try {
    await Tone.start();
    if (!synth) {
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.12, sustain: 0.35, release: 0.35 },
      }).toDestination();
    }

    isPlaying = true;
    playbackStartedAt = Tone.now();
    for (const note of track.notes) {
      if (note.time + note.duration <= position) continue;
      const startOffset = Math.max(0, note.time - position);
      const noteDuration = Math.max(0.05, note.duration - Math.max(0, position - note.time));
      synth.triggerAttackRelease(note.name, noteDuration, playbackStartedAt + startOffset, note.velocity);
    }

    status.textContent = 'Playing';
    progressTimer = window.setInterval(updateProgress, 100);
    playbackTimer = window.setTimeout(finishTrack, Math.max(0, track.duration - position) * 1000);
    updateControls();
  } catch (error) {
    status.textContent = 'Audio could not start. Press Play again to allow audio.';
    console.error('MIDI playback failed:', error);
  }
}

function finishTrack() {
  stopPlayback(true);
  if (playlist.length > 1) {
    selectTrack((selectedIndex + 1) % playlist.length);
    playTrack();
  } else {
    status.textContent = 'Track finished.';
  }
}

addButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
  const files = [...fileInput.files];
  if (!files.length) return;

  status.textContent = `Loading ${files.length} MIDI ${files.length === 1 ? 'file' : 'files'}...`;
  let addedCount = 0;

  for (const file of files) {
    const objectUrl = URL.createObjectURL(file);
    try {
      playlist.push(parseMidiTrack(file.name, await file.arrayBuffer(), objectUrl));
      addedCount += 1;
    } catch {
      URL.revokeObjectURL(objectUrl);
      status.textContent = `Could not read ${file.name}. Choose a valid MIDI file.`;
    }
  }

  renderPlaylist();
  if (selectedIndex < 0 && playlist.length) selectTrack(0);
  if (addedCount) status.textContent = `Added ${addedCount} MIDI ${addedCount === 1 ? 'file' : 'files'}.`;
  fileInput.value = '';
});

clearButton.addEventListener('click', () => {
  stopPlayback(true);
  playlist.forEach((track) => {
    if (track.objectUrl) URL.revokeObjectURL(track.objectUrl);
  });
  playlist.length = 0;
  selectedIndex = -1;
  position = 0;
  trackName.textContent = 'Choose MIDI files to begin';
  durationLabel.textContent = '0:00';
  currentTimeLabel.textContent = '0:00';
  seekInput.value = '0';
  status.textContent = 'Add MIDI files or provide a midi/playlist.json manifest.';
  renderPlaylist();
});

playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', () => {
  if (!isPlaying || selectedIndex < 0) return;
  position = Math.min(playlist[selectedIndex].duration, position + Tone.now() - playbackStartedAt);
  stopPlayback();
  status.textContent = 'Paused';
});
stopButton.addEventListener('click', () => {
  stopPlayback(true);
  status.textContent = 'Stopped';
});
seekInput.addEventListener('change', () => {
  if (selectedIndex < 0) return;
  const track = playlist[selectedIndex];
  const wasPlaying = isPlaying;
  if (wasPlaying) {
    position = Math.min(track.duration, position + Tone.now() - playbackStartedAt);
    stopPlayback();
  }
  position = (Number(seekInput.value) / 1000) * track.duration;
  updateProgress();
  if (wasPlaying) playTrack();
});

renderPlaylist();
loadBundledPlaylist();
