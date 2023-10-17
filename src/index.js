import getData from "./fetching";
import {uiInit, createWeatherCard, clearCard, createForm} from "./ui";

uiInit();

const wData = getData("Cebu").then((data) =>  data);
const theData = await wData;

const attachForm = () => {
  const cityForm = document.querySelector('form');
  cityForm.addEventListener("submit", findCity, {once: true});
}

const findCity = async (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.cityName').value;
  const cityData = await getData(cityName).then((data) => data);
  console.log(cityData);

  clearCard();
  createForm();
  attachForm();
  createWeatherCard(cityData);
}


attachForm();

/*
current.condition.icon
current.condition.text

current.feelslike_c
current.feelslike_f
current.humidity

current.temp_c
current.temp_f

location.name
*/