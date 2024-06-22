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



//FUNCTIONS AND EVENTS




//ADD CARDS TO FAVORITES



//REMOVE CARDS FROM FAVORITES



    //CLICK'S EVENT - CARDS

function handleClickCard(ev) {
  ev.preventDefault();

}

cardsUl.addEventListener( 'click', handleClickCard );


    //CLICK'S EVENT - SEARCH
/*
function handleClickFavourite(ev) {
    //code

}

favouritessUl.addEventListener( 'click', handleClickFavourite );
*/


    //FETCH AND LOCALSTORAGE 

fetch ('https://api.disneyapi.dev/character?pageSize=10')     
    .then(response => response.json())
    .then(dataFromFetch => {
        console.log(dataFromFetch.data);
    
        }
    )

