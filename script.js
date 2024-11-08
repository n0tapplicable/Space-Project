import { create, setup, cssomSheet } from 'https://cdn.skypack.dev/twind'
setup({ darkMode: 'class' })
// import { create, cssomSheet } from 'twind'
const sheet = cssomSheet({ target: new CSSStyleSheet() })
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
    flex flex-col h-96
    shadow-lg rounded-md
    overflow-x-wrap 
  `;
    newsCard.innerHTML = 
    `
      <img
        loading="lazy"
        src="${props.image_url || 'default.jpg'}"
        alt="${!props.image_url ? props.title : "The data source didn't provide an image"}"
        title="${props.title}"
        class="${tw`h-32 lg:hidden w-full object-cover rounded-t-sm`}">
      <div class="${tw`flex flex-col overflow-y-auto`}">
      <div class="${tw`p-2`}">
        <a href=${props.url} target="_blank"><h1 class="${tw`text-2xl hover:underline font-bold text-[#FC6736] font-semibold`}"> 
        ${props.title || 'News Title'}
        </h1></a>
        <span class="${tw`font-bold text-xl mb-2 text-[#7ED4AD]`}">${props.news_site}<br>${new Date(props.published_at).toLocaleString('en-US', {
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
        <img
        src="${props.image_url || 'default.jpg'}"
        alt="${!props.image_url ? props.title : "The data source didn't provide an image"}"
        title="${props.title}"
        class="${tw`hidden mt-4 h-64 lg:block w-full object-cover rounded-b-sm`}">
      </div>
    `
    shadow.appendChild(newsCard);
  } 
}
customElements.define('news-card', NewsCard);
const container = document.querySelector('#news-container')
const n_articles = 15
fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=${n_articles}`).then(data => data.json())
    .then(data => {
    container.classList = tw`
      flex flex-col p-3
      space-y-3
      overflow-y-auto
      md:grid
      md:grid-cols-3
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
  fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=${n_articles}&offset=${current_page*n_articles}`).then(data => data.json())
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
  fetch(`https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=${n_articles}&offset=${current_page*n_articles}`).then(data => data.json())
    .then(data => {
      container.innerHTML = ''
      data.results.forEach(item => {
        const newsCard = new NewsCard(item)
        container.appendChild(newsCard)
      });
    })
})

//const themeToggleButton = document.querySelector('#theme-toggle');
//themeToggleButton.addEventListener('click', () => {
  //document.documentElement.classList.toggle(tw`dark`);
  //if (document.documentElement.classList.contains(tw`dark`)) {
    //localStorage.setItem('theme', 'dark');
  //} else {
  //  localStorage.setItem('theme', 'light');
 // }
//});

//Load theme from localStorage
  //if (localStorage.getItem('theme') === 'dark') {
    //document.documentElement.classList.add(tw`dark`);
  //} else {
  //document.documentElement.classList.remove(tw`dark`);
  //}
  //const toggleButton = document.getElementById('theme-toggle');

const toggleButton = document.getElementById('theme-toggle');


function applyTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.body.classList.add(savedTheme);
  } else {

    document.body.classList.add('light-theme');
  }
}

// Toggle between themes and save the preference
toggleButton.addEventListener('click', () => {
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    document.body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
});
applyTheme();

