const loadNews = async (category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data)
}

const displayNews = (datalist) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = ''
    datalist.forEach(data =>{
        console.log(data)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card">
            <img src="${data.image_url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.details.slice(0, 200)}...</p>
            </div>

            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">
                <img src="${data.author.img}" alt="" width="44" height="44" class="rounded-circle">
                </div>
                <div class="p-2 bd-highlight">${data.author.name ? data.author.name: 'Author not available'}
                <p>${data.author.published_date ? data.author.published_date: 'Published date not available'}</p>
                </div>
                <p><i class="fa-solid fa-eye py-4 ms-3"></i></i> ${data.total_view}</p>
                
                <p><i class="fa-solid fa-star py-4 ms-4"></i></p>
                <p><i class="fa-solid fa-star py-4"></i></p>
                <p><i class="fa-solid fa-star py-4"></i></p>
                <p><i class="fa-solid fa-star py-4"></i></p>
                <p><i class="fa-solid fa-star-half-stroke py-4"></i></p>
                
                <div>
                <button onclick="loadNewsDetails('${data._id}')" type="button" class="btn btn-outline-info mt-3 mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                </div>

            </div>
        </div>       
        `
        newsContainer.appendChild(newsDiv)
    })
}


const loadNewsDetails = async (news_id) =>{
    const url =`https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data)
}

const displayNewsDetails = datalist =>{
    console.log(datalist)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = datalist.data[0].title;
    const modalDetails = document.getElementById('modal-Details');
    modalDetails.innerHTML = `
    <p>Author Name: ${datalist.data[0].author.name}</p>
    <p>News Details: ${datalist.data[0].details}</p>
    <img src="${datalist.data[0].image_url}" width="470" height="280" alt="" />
    <p class="mt-3 text-center p-3 mb-2 bg-danger text-white rounded-pill">Total View: ${datalist.data[0].total_view}, Rating: ${datalist.data[0].rating.badge}</p>

    `
}

const loadNewsCatagorie = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCatagorie(data.data.news_category)
}

const displayNewsCatagorie = (catagorie) =>{
    console.log(catagorie)
    const newsCatagorieContent = document.getElementById('catagorie-btn');
    catagorie.forEach(data =>{
        console.log(data)
    const catagorieDiv = document.createElement('div')
    catagorieDiv.innerHTML = `
    <button onclick="loadNews('${data.category_id}')" type="button" class="btn btn-outline-danger mx-3">${data.category_name}</button>
    `
    newsCatagorieContent.appendChild(catagorieDiv);
    })
    loadNews('08');

}


loadNewsCatagorie()
loadNews('');