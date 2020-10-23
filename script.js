'use strict'
function handleBoops() {
  let boopCount = 0;
  
  $('.js-boop-counter').text(boopCount);
  
  $('.js-booper').click(function(event) {
    boopCount += 1;
  
    $('.js-boop-counter').text(boopCount);
  });
}



//this is for the nasa APOD
function renderAPOD(response) {
  //console.log('render apod ran');
  if(response.media_type == "image") {
    $('#js-apod').html(`<img src=${response.url} alt="nasaAPOD"><br><p>Via NASA Astronomy Picture of the Day: ${response.explanation}</p>`)
  } else {
    $('#js-apod').html(`<iframe width="420" height="315" src=${response.url} name="nasaApodVideo"></iframe><br><p>Via NASA Astronomy Picture of the Day: ${response.explanation}</p>`)
  }
}

function getAPOD() {
  fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error(response.statusText);
          }
    })
    .then(responseJson => renderAPOD(responseJson))
    .catch(err => {
       $('#apod').addClass('hidden');
        });
    //console.log(responseJson);
}

//for the advice api
function renderAdvice(response) {
  //console.log('render advice ran');
  $('#js-advice').html(`<p>"${response.slip.advice}"</p>`)
}

function getAdvice() {
  fetch('https://api.adviceslip.com/advice')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error(response.statusText);
          }
    })
    .then(responseJson => renderAdvice(responseJson))
    .catch(err => {
       $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}


//for the dog api
function renderDogImage(response) {
  //console.log('render dog image ran');
  $('#random-dog').html(`<img src=${response.message} alt="randomDog">`)
}

function getDogImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error(response.statusText);
          }
    })
    .then(responseJson => renderDogImage(responseJson))
    .catch(err => {
       $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}


// For the bored.com api
function displayResults(responseJson) {
    $('#js-results-list').empty();
    $('#js-results-list').append(
      `<h3>${responseJson.activity}</h3>`
      );
    $('#js-results').removeClass('hidden');
}


//for the bored.com api
function getActivity(){
  //console.log('getActivity ran');
  fetch('https://www.boredapi.com/api/activity?participants=1')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
          throw new Error(response.statusText);
          }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
       $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

//for the bored.com api
function watchForm() {
    $('form').submit(function (event) {
        event.preventDefault();
        getActivity();
    });
}

$(function () {
    //console.log('App loaded')
    watchForm();
    getDogImage();
    getAdvice();
    getAPOD();
    handleBoops();
});