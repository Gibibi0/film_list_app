const cartoonList = document.getElementById('cartoonList')
const searchInput = document.getElementById('searchInput')
const addcartoonBtn = document.getElementById('addCartoonBtn')
const randomcartoonBtn = document.getElementById('randomCartoonBtn')

let cartoons = []

const savedCartoons = localStorage.getItem('cartoons')
if (savedCartoons) {
	cartoons = JSON.parse(savedCartoons)
}

function renderList() {
	cartoonList.innerHTML = ''

	const search = searchInput.value.toLowerCase()

	cartoons
	.filter(cartoon => cartoon.title.toLowerCase().includes(search))
	.forEach((cartoon, index) => {
		const li = document.createElement('li')
		li.textContent = cartoon.title
		if (cartoon.watched) li.classList.add('watched')

		li.addEventListener('click', () => {
			cartoons[index].watched = !cartoons[index].watched
			renderList()
		})

		cartoonList.appendChild(li)
	})

	localStorage.setItem('cartoons', JSON.stringify(cartoons))
}

addCartoonBtn.addEventListener('click', () => {
	const title = prompt('Input cartoon name: ')
	if (title) {
		cartoons.push({title, watched: false})
		renderList()
	}
})

searchInput.addEventListener('input', renderList)

randomCartoonBtn.addEventListener('click', () => {
	const unwatched = cartoons.filter(f => !f.watched)
	if (unwatched.length === 0) {
		alert('All of cartoons are watched!')
		return
	}

	const randomIndex = Math.floor(Math.random() * unwatched.length)
	alert(`Lets watch: ${unwatched[randomIndex].title}`)
})

renderList()