const filmList = document.getElementById('filmList')
const searchInput = document.getElementById('searchInput')
const addFilmBtn = document.getElementById('addFilmBtn')
const randomFilmBtn = document.getElementById('randomFilmBtn')

let films = []

const savedFilms = localStorage.getItem('films')
if (savedFilms) {
	films = JSON.parse(savedFilms)
}

function renderList() {
	filmList.innerHTML = ''

	const search = searchInput.value.toLowerCase()

	films
	.filter(film => film.title.toLowerCase().includes(search))
	.forEach((film, index) => {
		const li = document.createElement('li')
		li.textContent = film.title
		if (film.watched) li.classList.add('watched')

		li.addEventListener('click', () => {
			films[index].watched = !films[index].watched
			renderList()
		})

		filmList.appendChild(li)
	})

	localStorage.setItem('films', JSON.stringify(films))
}

addFilmBtn.addEventListener('click', () => {
	const title = prompt('Input film name: ')
	if (title) {
		films.push({title, watched: false})
		renderList()
	}
})

searchInput.addEventListener('input', renderList)

randomFilmBtn.addEventListener('click', () => {
	const unwatched = films.filter(f => !f.watched)
	if (unwatched.length === 0) {
		alert('All of films are watched!')
		return
	}

	const randomIndex = Math.floor(Math.random() * unwatched.length)
	alert(`Lets watch: ${unwatched[randomIndex].title}`)
})

renderList()