# emoji-game
A landing page for the emoji game

## Hero character

Load `hero-character.css` and `hero-character.js` on a page, then create a character with `new HeroCharacter(options).mount(parent)`:

```js
new HeroCharacter({
	face: "😎",
	outfitColor: "#2d6db5",
	feet: "🥾",
}).mount(document.body);
```

The options default to a smiling face, gray outfit, and sneakers. `className` and `label` can also be customized.

## License

The original source code and `EMOJIGAME.pdf` in this project are licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for the full license text.

The MIDI files in the `midi/` directory are excluded from this license. They are third-party works and remain subject to the rights and terms of their respective owners. This project does not grant permission to use, copy, modify, or distribute those files.

Any other third-party materials included in the project remain subject to their own license terms.
