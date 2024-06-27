'use strict'

// QUERY SELECTORS
const cardsUl = document.querySelector('.js__cardsUl');
const favouritesUl = document.querySelector('.js__favouritesUl');

const SearchInput = document.querySelector('.js__searchInput');
const SearchBtn = document.querySelector('.js__searchBtn');



// DATA AND GLOBAL VARIABLES

const imageNotFound = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'

//OBJECT ARRAYS
let cards = [];
let favourites = [];

//FUNCTIONS AND EVENTS

//create LiCard and increment them one by one
function createLiForCards(card) {

    //CARDs WITHOUT AN IMAGE
    if (card.imageUrl === undefined) {
        card.imageUrl = imageNotFound;
    }

    //INSERT CARD IN THE ARRAY OBJECT nd();
    const cardHTML = `
        <li class="js__card licards" data-id= "${card._id}">
            <div class = "liCardContent ">
                <img class = "imgLi" src="${card.imageUrl}" alt="Picture of ${card.name}">
                <p class = "nameLi">${card.name}</p>
            </div>
        </li>`;

    return cardHTML;

}
//render cards 
function renderCards(cards) {
    let html = '';

    for (const card of cards) {
        html += createLiForCards(card);
    };

    //Paint the cards
    cardsUl.innerHTML = html;

    const allCards = document.querySelectorAll('.js__card');

    for (const eachCard of allCards) {
        eachCard.addEventListener('click', handleClickCard);
    }
}

//ADD CARDS TO FAVORITES
function renderFavourites() {
    let favouriteHTML = '';

    for (const favouriteCard of favourites) {

        favouriteHTML += createLiForCards(favouriteCard);
    }

    //paint the favourite cards
    favouritesUl.innerHTML = favouriteHTML;

}

//CLICK'S EVENT - CARDS
function handleClickCard(ev) {
    const clickedImageId = parseInt(ev.currentTarget.dataset.id);

    //search the clicked card (favourite one) by the ID
    const clickedCard = cards.find(eachCard =>
        eachCard._id === clickedImageId);

    // search the value in favourite object now
    const clickedFavoriteIndex = favourites.findIndex(eachFavoriteCard =>
        eachFavoriteCard._id === clickedImageId);

    if (clickedFavoriteIndex === -1) {
        favourites.push(clickedCard);

        localStorage.setItem('favs', JSON.stringify(favourites));
        renderFavourites();
    }
    //REMOVE CARDS FROM FAVORITES
    else {
        favourites.splice(clickedFavoriteIndex, 1);

        localStorage.setItem('favs', JSON.stringify(favourites));

        renderFavourites();
    }
    //add and remove the favorite card selected in the HTML 
    ev.currentTarget.classList.toggle('favourites');
}

function handleClickFavourites(ev) {

    if (ev.target.closest("li") !== null) {
        const clickedImageId = parseInt(ev.target.closest("li").dataset.id);

        console.log(ev.target.closest("li"));

        const clickedFavoriteIndex = favourites.findIndex(eachFavoriteCard =>
            eachFavoriteCard._id === clickedImageId);

        // load and compare each favorite card with id value 
        favourites.splice(clickedFavoriteIndex, 1);

        localStorage.setItem('favs', JSON.stringify(favourites));

        renderFavourites();
    }
}

favouritesUl.addEventListener('click', handleClickFavourites);


//REMOVE ALL FAVOURITES BUTTON

// Function to clear the favs array
function clearFavourites() {
    favourites.length = 0;

    renderFavourites();
    //clean localstorage again
    localStorage.setItem('favs', JSON.stringify(favourites));

}

// Function to handle the button click event
function handleRemoveAllFavClick(ev) {
    clearFavourites();
}

// Get the button element and listen for the click event :) 
const removeAllFavBtn = document.getElementById('js__removeAllFavBtn');

removeAllFavBtn.addEventListener('click', handleRemoveAllFavClick);



//CLICK'S EVENT - SEARCH
function handleSearchClick(ev) {
    ev.preventDefault();

    const searchCard = SearchInput.value.toLowerCase();

    fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${searchCard}`)
        .then(response => response.json())
        .then(dataFromSearch => {
            let cardsSearched = [];

            if (dataFromSearch.data.length < 1 || dataFromSearch.data.length === undefined) {
                cardsSearched.push(dataFromSearch.data);
            } else {
                cardsSearched = dataFromSearch.data;
            }
            cards = cardsSearched;

            renderCards(cards);

        });
}

SearchBtn.addEventListener('click', handleSearchClick)


//START LOADING PAGE 

fetch('https://api.disneyapi.dev/character?pageSize=10')
    .then(response => response.json())
    .then(dataFromFetch => {

        cards = dataFromFetch.data;

        renderCards(cards);

    });

// code to save in local storage and convert in numeric the ID
const favsFromLS = JSON.parse(localStorage.getItem('favs'));

// code to manage the null ones in favorites object
if (favsFromLS !== null) {
    favourites = favsFromLS;

    renderFavourites();

}



