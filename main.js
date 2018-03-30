const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildCardString = (planetArray) => {
    let cardString = '';
    planetArray.forEach((planet) => {
        cardString += `<div class="planet-card">`;
        cardString +=   `<h1>${planet.name}</h1>`;
        cardString += `</div>`;
    });
    printToDom(cardString, 'planet-holder');
}

function onLoad() {
    const data = JSON.parse(this.responseText);
    buildCardString(data.planets);
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