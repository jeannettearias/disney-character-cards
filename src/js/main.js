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
function renderCards(cards) {

    let cardHTML = '';

    for (const card of cards) {
        cardHTML += `<li class="cards">
        <img class = "imgLi" src="${card.imageUrl}" alt="Picture of ${card.name}">
        <p class = "nameLi">${card.name}</p>
      </li>`;
    }

    return cardHTML;

}





//ADD CARDS TO FAVORITES



//REMOVE CARDS FROM FAVORITES



//CARD WITHOUT AN IMAGE




//CLICK'S EVENT - CARDS

function handleClickCard(ev) {
    ev.preventDefault();

}

cardsUl.addEventListener('click', handleClickCard);


//CLICK'S EVENT - SEARCH



//START LOADING PAGE 

fetch('https://api.disneyapi.dev/character?pageSize=10')
    .then(response => response.json())
    .then(dataFromFetch => {
        console.log(dataFromFetch.data);

        cards = dataFromFetch.data;

        cardsUl.innerHTML = renderCards(cards);
    });

    console.log(cards);

