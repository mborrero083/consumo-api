searchFormBtn.addEventListener('click',()=>{
    location.hash='#search='+searchFormInput.value;
});
trendingBtn.addEventListener('click',()=>{
    location.hash='#trends';
});
arrowBtn.addEventListener('click',()=>{
    history.back();
   /*  location.hash='#home'; */
});
window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);

function navigator(){
    console.log(location);
    if (location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#search')){
        searhPage();
    }else if (location.hash.startsWith('#movie')){
        movieDetailsPage();
    }else if (location.hash.startsWith('#category=')){
        categoriesPage();
    }else {
        homePage();
    } 
    document.body.scrollTop =0;
    document.documentElement.scrollTop=0;
}

function homePage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow-white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    getTrendingMoviesPreview();
    getGenerosPreview();
}
function searhPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow-white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [ ,query] = location.hash.split('=');
    getMoviesBySearch(query);
}
function movieDetailsPage(){
    headerSection.classList.add('header-container--long');
    /* headerSection.style.background=''; */
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    const [ , movieId]= location.hash.split('=');
    getMovieById(movieId);
}
function categoriesPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow-white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [ ,categoryData] = location.hash.split('=');
    const [categoryId, categoryName]=categoryData.split('-');
    headerCategoryTitle.innerHTML=categoryName;

    getMoviesByCategory(categoryId);
    
}
function trendsPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow-white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML= 'Tendecias';
    getTrendingMovies();

}