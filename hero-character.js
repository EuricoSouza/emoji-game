class HeroCharacter {
  constructor({
    face = "🙂",
    outfitColor = "#5f666e",
    lowerBodyColor = "#062549",
    feet = "👟",
    className = "hero-mini",
    label = "Emoji hero character",
    ariaHidden = true,
  } = {}) {
    this.element = document.createElement("div");
    this.element.className = className;
    this.element.setAttribute("role", "img");
    this.element.setAttribute("aria-label", label);
    this.element.setAttribute("aria-hidden", String(ariaHidden));
    this.element.style.setProperty("--hero-outfit-color", outfitColor);
    this.element.style.setProperty("--hero-lower-body-color", lowerBodyColor);

    const art = document.createElement("div");
    art.className = "hero-mini-art";

    const parts = [
      ["hero-limb hero-limb-left", "❙"],
      ["hero-limb hero-limb-right", "❙"],
      ["hero-arm hero-hand-left", "🤛"],
      ["hero-arm hero-hand-right", "🤛"],
      ["hero-head", face],
      ["hero-body", "▮"],
      ["hero-hips", "▀"],
      ["hero-leg hero-leg-left", "❚"],
      ["hero-leg hero-leg-right", "❚"],
      ["hero-shoe hero-shoe-left", feet],
      ["hero-shoe hero-shoe-right", feet],
    ];

    for (const [classNames, content] of parts) {
      const part = document.createElement("span");
      part.className = classNames;
      part.textContent = content;
      art.append(part);
    }

    this.element.append(art);
  }

  mount(parent) {
    parent.append(this.element);
    return this.element;
  }
}

globalThis.HeroCharacter = HeroCharacter;