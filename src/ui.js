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

export function createButtons(parentDiv) {
  const btnC = document.createElement("button");
  const btnF = document.createElement("button");
  btnC.classList.add("celcius");
  btnF.classList.add("farenheit");
  btnC.textContent = "°C";
  btnF.textContent = "°F";

  const div = document.createElement("div");
  div.classList.add("temp-buttons");

  div.appendChild(btnC);
  div.appendChild(btnF);
  parentDiv.appendChild(div);
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

export async function createWeatherCard(data, mode) {
  const loc = await data.location;
  const condi = await data.condition; 
  const humid = await data.humid;
  const tempC = await data.temp_c;
  const feelsC = await data.fl_c;
  const wImage = await data.img;
  const tempF = await data.temp_f;
  const feelsF = await data.fl_f;

  const tempToUse = (mode === "c") ? `${tempC} °C` : `${tempF} °F`
  const feelToUse = (mode === "c") ? `${feelsC} °C` : `${feelsF} °F`

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("parentDiv");

  createElement("div", loc, "location", parentDiv);
  createImage(wImage, parentDiv);
  createElement("div", condi, "condition", parentDiv);
  createElement("div", `${tempToUse}`, "temp", parentDiv);
  createElement("div", `Feels like ${feelToUse}`, "feels-like", parentDiv);
  createElement("div", `Humidity: ${humid}%`, "humid", parentDiv);
  createButtons(parentDiv);

  contentDiv.appendChild(parentDiv);
}

export function uiInit() {
  uiCard();
  createForm();
}