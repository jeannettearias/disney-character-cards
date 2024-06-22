'use strict'

// QUERY SELECTORS
const cardsUl = document.querySelector('.js__cardsUl');
const favouritessUl = document.querySelector('.js__favouritesUl');

const SearchInput = document.querySelector('.js__searchInput');
const SearchBtn = document.querySelector('js__searchBtn');



// DATA AND GLOBAL VARIABLES

//OBJECT ARRAYS
let cards = [];
let favourites = [];

//FUNCTIONS




//FUNCTIONS AND EVENTS


//create LiCard and increment them one by one
function createLiForCards(cards) {

    let cardHTML = '';

    for (const card of cards) {
        cardHTML += `<li class="js__card cards" data-id= "${card._id}">
        <img class = "imgLi" src="${card.imageUrl}" alt="Picture of ${card.name}">
        <p class = "nameLi">${card.name}</p>
      </li>`;
    };

    return cardHTML;
}

function renderCards(cards) {
    cardsUl.innerHTML = createLiForCards(cards);

    const allCards = document.querySelectorAll('.js__card');

    for (const eachCard of allCards) {
        eachCard.addEventListener('click', handleClickCard);
    }

}

//ADD CARDS TO FAVORITES
function renderFavourites() {
    let favouriteHTML = '';

    for ( const favouriteCard of favourites ) {
        favouriteHTML += createLiForCards(favouriteCard);
    }

    favouritessUl.innerHTML = favouriteHTML;

}


//REMOVE CARDS FROM FAVORITES



//CARD WITHOUT AN IMAGE




//CLICK'S EVENT - CARDS

function handleClickCard(ev) {
    //ev.preventDefault();

    const clickedImageId = ev.currentTarget.dataset.id;
    console.log(clickedImageId);


}



//CLICK'S EVENT - SEARCH




//START LOADING PAGE 

fetch('https://api.disneyapi.dev/character?pageSize=10')
    .then(response => response.json())
    .then(dataFromFetch => {

        cards = dataFromFetch.data;

        renderCards(cards);

    });



