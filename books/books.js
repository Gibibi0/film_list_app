const bookList = document.getElementById('bookList')
const searchInput = document.getElementById('searchInput')
const addbookBtn = document.getElementById('addBookBtn')
const randombookBtn = document.getElementById('randomBookBtn')

let books = []

const savedbooks = localStorage.getItem('books')
if (savedBooks) {
	books = JSON.parse(savedBooks)
}

function renderList() {
	bookList.innerHTML = ''

	const search = searchInput.value.toLowerCase()

	books
	.filter(book => book.title.toLowerCase().includes(search))
	.forEach((book, index) => {
		const li = document.createElement('li')
		li.textContent = book.title
		if (book.watched) li.classList.add('watched')

		li.addEventListener('click', () => {
			books[index].watched = !books[index].watched
			renderList()
		})

		bookList.appendChild(li)
	})

	localStorage.setItem('books', JSON.stringify(books))
}

addBookBtn.addEventListener('click', () => {
	const title = prompt('Input book name: ')
	if (title) {
		books.push({title, watched: false})
		renderList()
	}
})

searchInput.addEventListener('input', renderList)

randomBookBtn.addEventListener('click', () => {
	const unwatched = books.filter(f => !f.watched)
	if (unwatched.length === 0) {
		alert('All of books are watched!')
		return
	}

	const randomIndex = Math.floor(Math.random() * unwatched.length)
	alert(`Lets watch: ${unwatched[randomIndex].title}`)
})

renderList()