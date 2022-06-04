// getting all the dom elements
const img = document.querySelector('.baseImg');
const container = document.querySelector('.container');
const countryA = document.querySelector('.topLeft');
const countryB = document.querySelector('.topRight');
const countryC = document.querySelector('.bottomLeft');
const countryD = document.querySelector('.bottomRight');

// some needed variables
let counter = 1;
let numberOfImages = 8;

let generateImageInterval;

const CountriesRepo = {
    "Chinese":[4,6,1], "Korean":[2,3],"Japanese":[5,7],"Thai":[8]
}


// functions
const startGame = ()=>{
  if( counter===1) shootImage();
  generateImageInterval = setInterval(shootImage,3000);
}

const shootImage=()=>{
}

startGame()

