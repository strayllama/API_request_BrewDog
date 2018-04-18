const apiBeerList = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);

  const selectBeerDropDown = document.querySelector('#beer-picker');
  selectBeerDropDown.addEventListener('change', handleSelectBeer);
});

// The steps to get info from any API
const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
};

// on requestComplete from getting api info do this:
const requestComplete = function () {
  if (this.status !==200) return; // this. is the request object. should be 200, else an error object
  const jsonString = this.responseText;  // take response
  const beers = JSON.parse(jsonString); // make to useable javascript object
  beers.forEach((beer) => {
    apiBeerList.push(beer);
  });
  populateBeerDropDown();
//  populateBeerList();
};

const populateBeerDropDown = function () {
  const selectBeerDropDown = document.querySelector('#beer-picker');
  selectBeerDropDown.innerHTML = "";

  const chooseOption = document.createElement('option');
  chooseOption.value = "";
  chooseOption.disabled;
  chooseOption.innerHTML = "Select a Beer to view:";
  selectBeerDropDown.appendChild(chooseOption);
  apiBeerList.forEach((beer) => {
    const optionBeer = document.createElement('option');
    optionBeer.value = beer.name;
    optionBeer.textContent = beer.name;
    selectBeerDropDown.appendChild(optionBeer);
  });
}

const clearBeerContainer = function () {
  const beerContainer = document.querySelector('#beer-list')
  beerContainer.innerHTML = "";
};

const handleSelectBeer = function (event) {
  const beerName = event.target.value;
  console.log(beerName);
  currentBeer = findBeer(beerName);
  clearBeerContainer();
  const beerContainer = document.querySelector('#beer-list');
  displayBeer(currentBeer, beerContainer);
};

// const populateBeerList = function () {
//   const beerList = document.querySelector('#beer-list');
//   apiBeerList.forEach((beer) => {
//     displayBeer(beer, beerList);
//   });
// };
const findBeer = function(beerName) {
  return apiBeerList.find((beer) => {
  if (beer.name === beerName){
    return beer;
    };
  });
};


const displayBeer = function (beer, container) {
  const beerName = document.createElement('h3');
  beerName.classList.add("bold");
  beerName.textContent = `Beer Name: ${beer.name}`;
  console.log(beer);
   const beerDetails = document.createElement('ul');
    const abv = document.createElement('li');
    abv.textContent = `abv : ${beer.abv}%`;
    const tagLine = document.createElement('li');
    tagLine.textContent = `"${beer.tagline}"`;
    const beerPic = document.createElement('img');
    beerPic.classList.add("beerPic");
    beerPic.src = beer.image_url;

  container.appendChild(beerName);
    beerDetails.appendChild(abv);
    beerDetails.appendChild(tagLine);
    beerDetails.appendChild(beerPic);
  container.appendChild(beerDetails);
}
