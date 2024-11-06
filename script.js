import { create, cssomSheet } from 'https://cdn.skypack.dev/twind'
// import { create, cssomSheet } from 'twind'
const sheet = cssomSheet({ target: new CSSStyleSheet() })
// 2. Use that to create an own twind instance
const { tw } = create({ sheet })

class NewsCard extends HTMLElement {
  constructor(props) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [sheet.target]
    const container = document.createElement('div');
    container.classList = "p-4 bg-white shadow-lg rounded-lg";
    container.innerHTML = `
    <article>
      <h1 class="${tw`text-sm text-gray-200`}">
      ${props.title || 'News Title'}</h1>
      <img
      src="${props.image_url || 'default.jpg'}"
      alt="${this.getAttribute('title_meta') || 'News Image'}"
      class="${tw`w-64 h-64 object-cover rounded-full`}">
      <p class="${tw`text-sm text-gray-500`}">${props.summary}</p>
    </article>
    `
    shadow.appendChild(container);
  } 
}

customElements.define('news-card', NewsCard);

fetch('https://raw.githubusercontent.com/n0tapplicable/Space-Project/refs/heads/main/news.json').then(data => data.json())
    .then(data => {
    const container = document.querySelector('#news-container')
    data.results.forEach(item => {
      const newsCard = new NewsCard(item)
      console.log(item)
      newsCard.setAttribute("title_meta", item.title)
      newsCard.setAttribute("img_src", item.image_url)
      container.appendChild(newsCard)
    });
  })