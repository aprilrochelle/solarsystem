const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildCardString = (planetArray) => {
    let cardString = '';
    planetArray.forEach((planet) => {
        cardString += `<div class="planet-card">`;
        cardString +=   `<h1 class="planet-name">${planet.name}</h1>`;
        cardString +=   `<img class="planet-pic hidden" src="${planet.imageURL}">`;
        cardString += `</div>`;
    });
    printToDom(cardString, 'planet-holder');
}

const planetChosen = (e) => {
    let planetPicked = e.target;
    e.target.classList.add('hidden');
    e.target.parentNode.children[1].classList.remove('hidden');
    
}

const planetHoverEventListener = () => {
    const planetName = document.getElementsByClassName('planet-name');
    for (let i=0; i<planetName.length; i++) {
        planetName[i].addEventListener('mouseover', planetChosen);
    }
}



const showPic = () => {

}

const showInfo = () => {

}

function onLoad() {
    const data = JSON.parse(this.responseText);
    buildCardString(data.planets);
    planetHoverEventListener(data.planets);
}

function ifFail() {
    console.log('Ooops!');
}

const startApp = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', onLoad);
    myRequest.addEventListener('error', ifFail);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApp();