import { create, cssomSheet } from 'https://cdn.skypack.dev/twind'

// import { create, cssomSheet } from 'twind'
const sheet = cssomSheet({ target: new CSSStyleSheet() })
// 2. Use that to create an own twind instance
const { tw } = create({ sheet })

const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
* {
  font-family: 'Space Grotesk', sans-serif;
}
`);
class NewsCard extends HTMLElement {
  constructor(props) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [sheet.target, sharedStyles]
    const newsCard = document.createElement('div');
    newsCard.classList = tw`
    bg-[#1E3E62]
    flex flex-col md:flex-row md:h-64 h-256
    shadow-lg rounded-md
    overflow-x-wrap
  `;
    newsCard.innerHTML = 
    `
      <img
        src="${props.image_url || 'default.jpg'}"
        alt="${this.getAttribute('title_meta') || 'News Image'}"
        class="${tw`h-64 w-full md:h-64 md:w-64 object-cover rounded-sm mr-3`}">
        <div class="${tw`flex flex-col flex-1 overflow-y-scroll p-2`}">
        <a href=${props.url} target="_blank"><h1 class="${tw`text-2xl hover:underline font-bold text-[#FC6736] font-semibold`}"> 
        ${props.title || 'News Title'}
        </h1></a>
        <span class="${tw`font-bold text-xl mb-2`}">${props.news_site}<br>${new Date(props.published_at).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}</span>
        <p class="${tw`text-lg md:text-xl text-white break-words`}">
          ${props.summary}
        </p>
      </div>
    `
    shadow.appendChild(newsCard);
  } 
}
customElements.define('news-card', NewsCard);
const container = document.querySelector('#news-container')
fetch('https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10').then(data => data.json())
    .then(data => {
    container.classList = tw`
      flex flex-col p-3
      space-y-3
      overflow-y-scroll
      md:grid
      md:grid-cols-2
      md:grid-rows-[repeat(5, minmax(100px))]
      md:gap-4
      md:space-y-2
    `
    data.results.forEach(item => {
      const newsCard = new NewsCard(item)
      container.appendChild(newsCard)
    });
  })

const next_button = document.querySelector('#next')
const previous_button = document.querySelector('#previous')
let current_page = 0
previous_button.style.display = 'none'
next_button.addEventListener('click', () => {
  current_page += 1
  if (current_page > 0) {
    previous_button.style.display = 'block'
  }
  fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&offset=${current_page*10}`).then(data => data.json())
    .then(data => {
      container.innerHTML = ''
      data.results.forEach(item => {
        const newsCard = new NewsCard(item)
        container.appendChild(newsCard)
      });
    })
})

previous_button.addEventListener('click', () => {
  current_page -= 1
  if (current_page == 0) {
    previous_button.style.display = 'none'
  }
  fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=10&offset=${current_page*10}`).then(data => data.json())
    .then(data => {
      container.innerHTML = ''
      data.results.forEach(item => {
        const newsCard = new NewsCard(item)
        container.appendChild(newsCard)
      });
    })
})