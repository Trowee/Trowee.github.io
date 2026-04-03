function loadMovies(search = '') {
    const url = `https://movie.pequla.com/api/movie?search=${search}`

    function openDetails(id) {
        console.log(id)
    }

    fetch(url)
        .then(rsp => rsp.json())
        .then(data => {
            // Referenca ka listi u html
            const template = document.getElementById('movie-template')
            const list = document.getElementById('movies')
            list.innerHTML = ''
            // let content = ''

            // for (let movie of data) {
            //     content += `
            //     <div class="card movie-card" onclick="openDetails(${movie.shortUrl})">
            //         <img src="${movie.poster}" alt="${movie.title}">
            //         <div class="card-body">
            //             <h5 class="card-title">${movie.title}</h5>
            //             <h6 class="card-subtitle mb-2 text-body-secondary">${movie.director.name}</h6>
            //             <p class="card-text">${movie.shortDescription}</p>
            //         </div>
            //     </div>
            //     `
            // }

            // // DOdavanje sadrzaja u movies DIV
            // list.innerHTML = content
            for (let movie of data) {
                const copy = template.content.cloneNode(true)
                const img = copy.querySelector('.card-img-top')
                img.src = movie.poster
                img.alt = movie.title

                copy.querySelector('.card-title').innerText = movie.title
                copy.querySelector('.card-subtitle').innerText = movie.director.name
                copy.querySelector('.card-text').innerText = movie.shortDescription
                copy.querySelector('.card-title').addEventListener('click', () => {
                    window.location.href = `./details.html?p=${movie.shortUrl}`
                })
                list.appendChild(copy)
            }
        })
}

const input = document.getElementById('search-input')
const btn = document.getElementById('search-btn')

btn.addEventListener('click', () => {
    loadMovies(input.value)
})

let timeout
input.addEventListener('keyup', () => {
    if (input.value != '') {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            loadMovies(input.value)
        }, 1000)
    }
    else {
        loadMovies()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    loadMovies()
})

// const timeout = setTimeout(() => {
//     loadMovies(input.value)
// }, 3000)

clearTimeout(timeout)
