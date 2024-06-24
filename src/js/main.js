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

//FUNCTIONS




//FUNCTIONS AND EVENTS


//create LiCard and increment them one by one

function createLiForCards(card) {

    //CARDs WITHOUT AN IMAGE
    if (card.imageUrl === undefined) {
        card.imageUrl = imageNotFound;
    }



    //INSERT CARD IN THE ARRAY OBJECT nd();
    const cardHTML = `
        <li class="js__card cards" data-id= "${card._id}">
            <img class = "imgLi" src="${card.imageUrl}" alt="Picture of ${card.name}">
            <p class = "nameLi">${card.name}</p>
        </li>`;


    return cardHTML;

}


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

    // Attach click event listeners to each favorite card
    /*
    const favouriteCard = document.querySelectorAll('.js__favouritesUl'); 
    favouriteCard.forEach(card => {card.addEventListener('click', handleClickCard);
        console.log(favouriteCard)
    });
    */

}

//CLICK'S EVENT - CARDS
function handleClickCard(ev) {

    const clickedImageId = parseInt(ev.currentTarget.dataset.id);

    //search the clicked card (favourite one) by the ID
    const clickedCard = cards.find(eachCard =>
        eachCard._id === clickedImageId);

    // search the value in favourite object now
    const clickedFavoriteIndex = favourites.findIndex(eachFavoriteCard => eachFavoriteCard._id === clickedImageId);

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

//CLICK'S EVENT - SEARCH
function handleSearchClick(ev) {
    ev.preventDefault();

    const searchCard = SearchInput.value.toLowerCase();

    fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${searchCard}`)
        .then(response => response.json())
        .then(dataFromSearch => {
            cards = dataFromSearch.data;
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




