class GoogleTrendsCard extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    if (this.content) {
      this.updateContent();
    }
  }

  connectedCallback() {
    if (!this.content) {
      const card = document.createElement("ha-card");
      const wrapper = document.createElement("div");
      card.appendChild(wrapper);
      this.content = document.createElement("div");
      wrapper.appendChild(this.content);
      this.appendChild(card);
    }

    this.manageTimer();
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  manageTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.index = (this.index + 1) % this.config.entities.length;
      }, 10000);
    }
  }

  updateContent() {
    if (!this._hass || !this.config) {
      return;
    }

    const entities = this.config.entities;

    let index = this.index || 0;
    const entity = entities[index];
    this.content.innerHTML = `<h2>${this._hass.states[entity].attributes.friendly_name}</h2><p>${this._hass.states[entity].state}</p>`;
  }
}

customElements.define("google-trends-card", GoogleTrendsCard);
