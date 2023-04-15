class GoogleTrendsCard extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define the entity");
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
      this.content = document.createElement("div");
      card.appendChild(this.content);
      this.appendChild(card);
    }
  }

  updateContent() {
    if (!this._hass || !this.config) {
      return;
    }

    const entity = this.config.entity;
    const googleLogo = "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg";
    this.content.innerHTML = `
      <style>
        .google-trends-container {
          display: flex;
          align-items: center;
          padding: 8px 16px;
        }
        .google-trends-title {
          font-size: 16px;
          font-weight: bold;
          margin-left: 8px;
        }
        .google-trends-text {
          font-size: 14px;
          margin-top: 4px;
        }
      </style>
      <div class="google-trends-container">
        <img src="${googleLogo}" alt="Google logo" width="74" height="24">
        <span class="google-trends-title">Currently Trending:</span>
      </div>
      <div class="google-trends-text">${this._hass.states[entity].state}</div>
    `;
  }
}

customElements.define("google-trends-card", GoogleTrendsCard);