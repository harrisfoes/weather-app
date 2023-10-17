const contentDiv = document.querySelector(".content");

function uiCard() {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("content-card");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  cardDiv.appendChild(cardContent);
  contentDiv.appendChild(cardDiv);
}

function createElement(type, textContent, className, parent){
  const ele = document.createElement(type);
  ele.textContent = textContent;
  ele.classList.add(className);

  parent.appendChild(ele);
}

function createImage(imgSrc, parent){
  const ele = document.createElement('img');
  ele.src = imgSrc;
  ele.classList.add('weather-icon');

  parent.appendChild(ele);
}

export function createButtons() {
  const btnC = document.createElement("button");
  const btnF = document.createElement("button");
  btnC.textContent = "°C";
  btnF.textContent = "°F";

  const div = document.createElement("div");

  div.appendChild(btnC);
  div.appendChild(btnF);
  contentDiv.appendChild(div);
}

export function createForm() {
  const form = document.createElement("form");
  form.classList.add('city');

  const text = document.createElement("input");
  text.setAttribute("type", "text");
  text.classList.add('cityName');

  const btn = document.createElement("input");
  btn.setAttribute("type", "submit");
  btn.setAttribute("value", "Search");

  form.appendChild(text);
  form.appendChild(btn);
  contentDiv.appendChild(form);
  
}

export function clearCard() {
  contentDiv.innerHTML = '';
}

export async function createWeatherCard(data) {
  const loc = await data.location;
  const condi = await data.condition; 
  const humid = await data.humid;
  const tempC = await data.temp_c;
  const feelsC = await data.fl_c;
  const wImage = await data.img;

  createElement("div", loc, "location", contentDiv);
  createImage(wImage, contentDiv);
  createElement("div", condi, "condition", contentDiv);
  createElement("div", `Humidity: ${humid}`, humid, contentDiv);
  createElement("div", `${tempC} °C`, "temp", contentDiv);
  createElement("div", `Feels like ${feelsC} °C`, "feels-like", contentDiv);
  createButtons();
}

export function uiInit() {
  uiCard();
  createForm();
}