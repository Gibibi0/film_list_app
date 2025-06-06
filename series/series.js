const seriesList = document.getElementById('seriesList')
const searchInput = document.getElementById('searchInput')
const addseriesBtn = document.getElementById('addSeriesBtn')
const randomseriesBtn = document.getElementById('randomSeriesBtn')

let seriess = []

const savedSeriess = localStorage.getItem('seriess')
if (savedSeriess) {
	seriess = JSON.parse(savedSeriess)
}

function renderList() {
	seriesList.innerHTML = ''

	const search = searchInput.value.toLowerCase()

	seriess
	.filter(series => series.title.toLowerCase().includes(search))
	.forEach((series, index) => {
		const li = document.createElement('li')
		li.textContent = series.title
		if (series.watched) li.classList.add('watched')

		li.addEventListener('click', () => {
			seriess[index].watched = !seriess[index].watched
			renderList()
		})

		seriesList.appendChild(li)
	})

	localStorage.setItem('seriess', JSON.stringify(seriess))
}

addSeriesBtn.addEventListener('click', () => {
	const title = prompt('Input series name: ')
	if (title) {
		seriess.push({title, watched: false})
		renderList()
	}
})

searchInput.addEventListener('input', renderList)

randomSeriesBtn.addEventListener('click', () => {
	const unwatched = seriess.filter(f => !f.watched)
	if (unwatched.length === 0) {
		alert('All of seriess are watched!')
		return
	}

	const randomIndex = Math.floor(Math.random() * unwatched.length)
	alert(`Lets watch: ${unwatched[randomIndex].title}`)
})

renderList()