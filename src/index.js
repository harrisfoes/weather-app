import getData from "./fetching";
import {uiInit, createWeatherCard, clearCard, createForm} from "./ui";

uiInit();

const attachForm = () => {
  const cityForm = document.querySelector('form');
  cityForm.addEventListener("submit", findCity, {once: true});
}

const attachUnit = async (cityName,mode) => {
  const cityData = await getData(cityName).then((data) => data);
  clearCard();
  createForm();
  attachForm();
  await createWeatherCard(cityData, mode);
  attachCelsius(cityName);
  attachFarenheit(cityName);
}

const attachCelsius = async (cityName) => {
  const c = document.querySelector('.celcius');
  console.log(cityName);
  console.log(c);
  c.addEventListener("click", () => {attachUnit(cityName, "c")});
}

const attachFarenheit = async (cityName) => {
  const f = document.querySelector('.farenheit');
  console.log(f);
  f.addEventListener("click", () => {attachUnit(cityName, "f")});
}


const findCity = async (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.cityName').value;
  const cityData = await getData(cityName).then((data) => data);
  console.log(cityData);

  clearCard();
  createForm();
  attachForm();
  await createWeatherCard(cityData, "c");
  attachCelsius(cityName);
  attachFarenheit(cityName);
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