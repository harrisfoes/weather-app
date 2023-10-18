import getData from "./fetching";
import {uiInit, createWeatherCard, clearCard, createForm} from "./ui";


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
  c.addEventListener("click", () => {attachUnit(cityName, "c")});
}

const attachFarenheit = async (cityName) => {
  const f = document.querySelector('.farenheit');
  f.addEventListener("click", () => {attachUnit(cityName, "f")});
}


const findCity = async (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.cityName').value;
  const cityData = await getData(cityName).then((data) => data);

  clearCard();
  createForm();
  attachForm();
  await createWeatherCard(cityData, "c");
  attachCelsius(cityName);
  attachFarenheit(cityName);
}

export default function init(){
  uiInit();
  attachForm();
}
