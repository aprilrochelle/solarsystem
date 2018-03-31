const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildCardString = (planetArray) => {
    let cardString = '';
    planetArray.forEach((planet) => {
        cardString += `<div class="planet-card">`;
        cardString +=   `<h1 class="planet-name">${planet.name}</h1>`;
        cardString +=   `<img id="${planet.name}" class="planet-pic hidden" src="${planet.imageURL}">`;
        cardString += `</div>`;
    });
    printToDom(cardString, 'planet-holder');
}

const planetChosenShowText = (e) => {
    let planetPicPicked = e.target;
    planetPicPicked.classList.add('hidden');
    planetPicPicked.parentNode.children[0].classList.remove('hidden');
}

const planetChosenShowPic = (e) => {
    let planetPicked = e.target;
    planetPicked.classList.add('hidden');
    planetPicked.parentNode.children[1].classList.remove('hidden');
    
}

const planetChosenShowInfo = (e) => {
    let planetPicPicked = e.target.id;
    newXHR(planetPicPicked);
    
}
const searchCards = (e) => {
    let userSearch = e.target.parentNode.children[1].value.toLowerCase().split(' ');
    searchXHR(userSearch);
}

const makeBigCard = (planet) => {
    let bigCardString = '';
        bigCardString += `<div class="big-planet-card">`;
        bigCardString +=   `<h2 class="close">X</h2>`;
        bigCardString +=   `<h1 class="planet-name">${planet.name}</h1>`;
        bigCardString +=   `<img class="planet-pic" src="${planet.imageURL}">`;
        bigCardString +=   `<p>${planet.description}</p>`;
        bigCardString +=   `<h3>Gas Planet: ${planet.isGasPlanet}</h3>`;
        bigCardString +=   `<h3>Number of Moons: ${planet.numberOfMoons}</h3>`;
        bigCardString +=   `<h3>Largest Moon: ${planet.nameOfLargestMoon}</h3>`;
        bigCardString += `</div>`;
    printToDom(bigCardString, 'planet-holder');
    initializeX();
}

const makeBigCardz = (planetArray) => {
    let medCardString = '';
    planetArray.forEach((planet) => {
        medCardString += `<div class="med-planet-card">`;
        medCardString +=   `<h2 class="close">X</h2>`;
        medCardString +=   `<h1 class="planet-name">${planet.name}</h1>`;
        medCardString +=   `<img class="planet-pic" src="${planet.imageURL}">`;
        medCardString +=   `<p>${planet.description}</p>`;
        medCardString +=   `<h3>Gas Planet: ${planet.isGasPlanet}</h3>`;
        medCardString +=   `<h3>Number of Moons: ${planet.numberOfMoons}</h3>`;
        medCardString +=   `<h3>Largest Moon: ${planet.nameOfLargestMoon}</h3>`;
        medCardString += `</div>`;
    });
    printToDom(medCardString, 'planet-holder');
    initializeX();
}

const initializeX = () => {
    const xBtn = document.getElementsByClassName('close');
    for (let k=0; k<xBtn.length; k++) {
        xBtn[k].addEventListener('click', reload);
    }
}

const initializeSearch = () => {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', searchCards);
    
}

const planetHoverEventListener = () => {
    const planetName = document.getElementsByClassName('planet-name');
    for (let i=0; i<planetName.length; i++) {
        planetName[i].addEventListener('mouseover', planetChosenShowPic);
    }
}

const planetPicEventListeners = () => {
    const planetPic = document.getElementsByClassName('planet-pic');
    for (let j=0; j<planetPic.length; j++) {
        planetPic[j].addEventListener('mouseout', planetChosenShowText);
        planetPic[j].addEventListener('click', planetChosenShowInfo);
    }
}

function onLoad() {
    const data = JSON.parse(this.responseText);
    buildCardString(data.planets);
    planetHoverEventListener();
    planetPicEventListeners();
    initializeSearch();
}

function ifFail() {
    console.log('Ooops!');
}

const reload = () => {
    startApp();
}

const newXHR = (input) => {
    let myOtherRequest = new XMLHttpRequest();
    myOtherRequest.addEventListener('load', function() {
        const data2 = JSON.parse(this.responseText);
        for (let m=0; m<data2.planets.length; m++) {
            if (data2.planets[m].name === input) {
                makeBigCard(data2.planets[m]);
            }
        }
    });
    myOtherRequest.addEventListener('error', ifFail);
    myOtherRequest.open("GET", "planets.json");
    myOtherRequest.send();
}

const searchXHR = (input) => {
    let mySearchRequest = new XMLHttpRequest();
    mySearchRequest.addEventListener('load', function() {
        const data3 = JSON.parse(this.responseText);
        const planetz = [];
        for (let n=0; n<data3.planets.length; n++) {
            if (input.includes(data3.planets[n].name.toLowerCase())) {
                planetz.push(data3.planets[n]);
            } else if (data3.planets[n].description.indexOf(input) >= 0) {
                planetz.push(data3.planets[n]);
            }
        }
        makeBigCardz(planetz);
    });
    mySearchRequest.addEventListener('error', ifFail);
    mySearchRequest.open("GET", "planets.json");
    mySearchRequest.send();
}

const startApp = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', onLoad);
    myRequest.addEventListener('error', ifFail);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApp();