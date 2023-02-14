
const api= axios.create(
    {
        baseURL: 'https://api.themoviedb.org/3/',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        params: {
            'api_key': API_KEY,
        },
    }
);

function createMovies(movies, container){
    container.innerHTML="";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click',()=>{
            location.hash='#movie=' + movie.id;
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https:image.tmdb.org/t/p/w300'+ movie.poster_path,);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories,container){
    container.innerHTML='';
    categories.forEach(genero => {
        const generoContainer = document.createElement('div');
        generoContainer.classList.add('category-container');
        const generoTitle = document.createElement('h3');
        generoTitle.classList.add('category-title');
        generoTitle.setAttribute('id', 'id'+genero.id);
        generoTitle.addEventListener('click',()=> {
            location.hash=`#category=${genero.id}-${genero.name}`
        });
        const generoTitleText= document.createTextNode(genero.name);
        generoTitle.appendChild(generoTitleText);
        generoContainer.appendChild(generoTitle);
        container.appendChild(generoContainer);
    });
}

async function getTrendingMoviesPreview (){
    const {data}= await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies,trendingMoviesPreviewList);
} 
async function getGenerosPreview (){
    const {data} = await api('genre/movie/list');
    const generos = data.genres;
    createCategories(generos,categoriesPreviewList);
} 

async function getMoviesByCategory (id){
    const {data} = await api('discover/movie?',{
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    createMovies(movies,genericSection);
} 

async function getMoviesBySearch (query){
    const {data} = await api('search/movie',{
        params: {
            query,
        },
    });
    const movies = data.results;
    createMovies(movies,genericSection);
} 

async function getTrendingMovies(){
    const {data}= await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies,genericSection);
} 
async function getMovieById(Id){
    const {data : movie}= await api('movie/'+Id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl);
    headerSection.style.background = ` linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%),
        url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres , movieDetailCategoriesList);
    getRelatedMoviesId(Id)
} 

async function getRelatedMoviesId(Id){
    const {data}= await api(`movie/${Id}/recommendations`);
    const relatedMovies= data.results; 

    createMovies(relatedMovies, relatedMoviesContainer)
} 
