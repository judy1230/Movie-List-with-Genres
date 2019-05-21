
(function() {
	const dataPanel = document.getElementById('data-panel')
	const genresPanel = document.getElementById('genres-panel')
	const BASE_URL ='https://movie-list.alphacamp.io/api/v1/'
	const INDEX_URL = BASE_URL + '/movies/'
	const POSTER_URL = 'https://movie-list.alphacamp.io/posters/'
	const data = []
	const genresArray = {
		"1": "Action",
		"2": "Adventure",
		"3": "Animation",
		"4": "Comedy",
		"5": "Crime",
		"6": "Documentary",
		"7": "Drama",
		"8": "Family",
		"9": "Fantasy",
		"10": "History",
		"11": "Horror",
		"12": "Music",
		"13": "Mystery",
		"14": "Romance",
		"15": "Science Fiction",
		"16": "TV Movie",
		"17": "Thriller",
		"18": "War",
		"19": "Western"}
  const pagination = document.getElementById('pagination')
	const ITEM_PER_PAGE = 12
  
	let paginationData = []

 // get data
	axios.get(INDEX_URL).then((response) => {
		data.push(...response.data.results)
		displayGenres(genresArray)
		displayDataCard(data)
		getTotalPages(data)
		getPageData(1, data)    
	}).catch((err) =>
		console.log(err))





//display genres

function displayGenres(genresArray){
	let genresContent = ''
	for (let j = 0; j < Object.values(genresArray).length; j++){
		
		genresContent += `<div><a id="${j+1}" class="nav-link" href="#">${Object.values(genresArray)[j]}</a></div>
		`
	}
		genresPanel.innerHTML = genresContent
}
////mouseover
genresPanel.addEventListener('mouseover', function (event) {
	//console.log(this)
	//console.log(event.target)
	let element = event.target;
	element.classList.remove("nav-link");
	element.classList.add("nav-link", "active");
})

///mouseout
genresPanel.addEventListener('mouseout', function (event) {
	let element = event.target;
	element.classList.remove("nav-link", "active");
	element.classList.add("nav-link");
})	
	
  
genresPanel.addEventListener('click', function (event) {
	console.log(this)
	console.log(event.target.id)
	console.log(data)
	let focuser = parseInt(`${(event.target.id)}`)
	let newArray = data.filter(function (element){
			return element.genres.includes(focuser)
	})
	
	displayDataCard(newArray)
	getTotalPages(newArray)
	getPageData(1, newArray)
	
})


//display movies in card mode
function displayDataCard(data) {
	let htmlContent = ''
	data.forEach(function (item) {
		let genresContent = ''
		htmlContent += `
  <div class="col-sm-3">
    <div class="card mb-2">
      <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
      <div class="card-body movie-item-body">
        <h6 class="card-title">${item.title}</h5>
			</div>
			<div class= "row col-sm-12" style="display:flex;">
			`

		item.genres.forEach(function (i){
			genresContent += `<div><p style="font-size:13px;padding:0 5px;">${genresArray[i]}</p></div>`			
		})
		genresContent += ` 
		  </div>		
    </div>
	</div>				   	 	
`
		htmlContent += genresContent
})
	dataPanel.innerHTML = htmlContent

}


//////pagination/////

function getTotalPages(data) {
	let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
	let pageItemContent = ''
	for (let i = 0; i < totalPages; i++) {
		pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
	}
	pagination.innerHTML = pageItemContent
}


function getPageData(pageNum, data) {
	paginationData = data || paginationData
	let offset = (pageNum - 1) * ITEM_PER_PAGE
	let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
	displayDataCard(pageData)
}

	// listen to pagination click event
pagination.addEventListener('click', event => {
	console.log(event.target.dataset.page)
	if (event.target.tagName === 'A') {
		getPageData(event.target.dataset.page)
	}
})

})()