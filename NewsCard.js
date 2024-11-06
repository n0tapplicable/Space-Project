import { create, cssomSheet } from 'twind'

class NewsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const container = document.createElement('div');
    container.classList = "p-4 bg-white shadow-lg rounded-lg";
    container.innerHTML = `
      <h2 class="text-sm text-red-700">${this.getAttribute('title_meta') || 'News Title'}</h2>
      <img src="${this.getAttribute('img_src') || 'default.jpg'}" alt="${this.getAttribute('title_meta') || 'News Image'}">`
    this.shadowRoot.appendChild(container);
  }
}

customElements.define('news-card', NewsCard);