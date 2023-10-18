/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _fetching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetching */ "./src/fetching.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/ui.js");




const attachForm = () => {
  const cityForm = document.querySelector('form');
  cityForm.addEventListener("submit", findCity, {once: true});
}

const attachUnit = async (cityName,mode) => {
  const cityData = await (0,_fetching__WEBPACK_IMPORTED_MODULE_0__["default"])(cityName).then((data) => data);
  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.clearCard)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createForm)();
  attachForm();
  await (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createWeatherCard)(cityData, mode);
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
  const cityData = await (0,_fetching__WEBPACK_IMPORTED_MODULE_0__["default"])(cityName).then((data) => data);

  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.clearCard)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createForm)();
  attachForm();
  await (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createWeatherCard)(cityData, "c");
  attachCelsius(cityName);
  attachFarenheit(cityName);
}

function init(){
  ;(0,_ui__WEBPACK_IMPORTED_MODULE_1__.uiInit)();
  attachForm();
}


/***/ }),

/***/ "./src/fetching.js":
/*!*************************!*\
  !*** ./src/fetching.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getData)
/* harmony export */ });

const url = "https://api.weatherapi.com/v1/current.json"
const weatherKey = "bc1c9de3a1544d53b1544128230810";
const myUrl = `${ url  }?key=${  weatherKey  }`;

function filterData(data){
  const filteredData = {

    location : data.location.name,
    condition : data.current.condition.text,
    humid : data.current.humidity,
    temp_c : data.current.temp_c,
    temp_f : data.current.temp_f,
    fl_c : data.current.feelslike_c,
    fl_f : data.current.feelslike_f,
    img: data.current.condition.icon
  }

  console.log(filteredData);
  return filteredData
}


async function getData(query) {

  const completeUrl = `${myUrl}&q=${query}`;
  console.log(myUrl);

  try {
    const response = await fetch(completeUrl, {mode:'cors'})
    const weatherData = await response.json();

    return filterData(weatherData);
  
  } catch (error) {
    alert("Sorry, cannot find that location");
    return null;
  }

}


/*
current.condition.icon
current.condition.text

current.condition.feelslike_c
current.condition.feelslike_f
current.condition.humidity

current.condition.temp_c
current.condition.temp_f

location.name
*/

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCard: () => (/* binding */ clearCard),
/* harmony export */   createButtons: () => (/* binding */ createButtons),
/* harmony export */   createForm: () => (/* binding */ createForm),
/* harmony export */   createWeatherCard: () => (/* binding */ createWeatherCard),
/* harmony export */   uiInit: () => (/* binding */ uiInit)
/* harmony export */ });
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

function createButtons(parentDiv) {
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

function createForm() {
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

function clearCard() {
  contentDiv.innerHTML = '';
}

async function createWeatherCard(data, mode) {
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

function uiInit() {
  uiCard();
  createForm();
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");


(0,_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ3FDOzs7QUFHdEU7QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEOztBQUVBO0FBQ0EseUJBQXlCLHFEQUFPO0FBQ2hDLEVBQUUsOENBQVM7QUFDWCxFQUFFLCtDQUFVO0FBQ1o7QUFDQSxRQUFRLHNEQUFpQjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQywwQkFBMEI7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQywwQkFBMEI7QUFDL0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxREFBTzs7QUFFaEMsRUFBRSw4Q0FBUztBQUNYLEVBQUUsK0NBQVU7QUFDWjtBQUNBLFFBQVEsc0RBQWlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsNENBQU07QUFDUjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTSxTQUFTLGFBQWE7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR2U7O0FBRWYseUJBQXlCLE1BQU0sS0FBSyxNQUFNO0FBQzFDOztBQUVBO0FBQ0EsK0NBQStDLFlBQVk7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsT0FBTyxTQUFTLE9BQU87QUFDL0Qsd0NBQXdDLFFBQVEsU0FBUyxRQUFROztBQUVqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLHFDQUFxQyxVQUFVO0FBQy9DLG9DQUFvQyxNQUFNO0FBQzFDOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7Ozs7OztVQ2pHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmdDOztBQUVoQyx1REFBSSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mZXRjaGluZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZXREYXRhIGZyb20gXCIuL2ZldGNoaW5nXCI7XG5pbXBvcnQge3VpSW5pdCwgY3JlYXRlV2VhdGhlckNhcmQsIGNsZWFyQ2FyZCwgY3JlYXRlRm9ybX0gZnJvbSBcIi4vdWlcIjtcblxuXG5jb25zdCBhdHRhY2hGb3JtID0gKCkgPT4ge1xuICBjb25zdCBjaXR5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgY2l0eUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmaW5kQ2l0eSwge29uY2U6IHRydWV9KTtcbn1cblxuY29uc3QgYXR0YWNoVW5pdCA9IGFzeW5jIChjaXR5TmFtZSxtb2RlKSA9PiB7XG4gIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgZ2V0RGF0YShjaXR5TmFtZSkudGhlbigoZGF0YSkgPT4gZGF0YSk7XG4gIGNsZWFyQ2FyZCgpO1xuICBjcmVhdGVGb3JtKCk7XG4gIGF0dGFjaEZvcm0oKTtcbiAgYXdhaXQgY3JlYXRlV2VhdGhlckNhcmQoY2l0eURhdGEsIG1vZGUpO1xuICBhdHRhY2hDZWxzaXVzKGNpdHlOYW1lKTtcbiAgYXR0YWNoRmFyZW5oZWl0KGNpdHlOYW1lKTtcbn1cblxuY29uc3QgYXR0YWNoQ2Vsc2l1cyA9IGFzeW5jIChjaXR5TmFtZSkgPT4ge1xuICBjb25zdCBjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNlbGNpdXMnKTtcbiAgYy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2F0dGFjaFVuaXQoY2l0eU5hbWUsIFwiY1wiKX0pO1xufVxuXG5jb25zdCBhdHRhY2hGYXJlbmhlaXQgPSBhc3luYyAoY2l0eU5hbWUpID0+IHtcbiAgY29uc3QgZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXJlbmhlaXQnKTtcbiAgZi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2F0dGFjaFVuaXQoY2l0eU5hbWUsIFwiZlwiKX0pO1xufVxuXG5cbmNvbnN0IGZpbmRDaXR5ID0gYXN5bmMgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5TmFtZScpLnZhbHVlO1xuICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGdldERhdGEoY2l0eU5hbWUpLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xuXG4gIGNsZWFyQ2FyZCgpO1xuICBjcmVhdGVGb3JtKCk7XG4gIGF0dGFjaEZvcm0oKTtcbiAgYXdhaXQgY3JlYXRlV2VhdGhlckNhcmQoY2l0eURhdGEsIFwiY1wiKTtcbiAgYXR0YWNoQ2Vsc2l1cyhjaXR5TmFtZSk7XG4gIGF0dGFjaEZhcmVuaGVpdChjaXR5TmFtZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKXtcbiAgdWlJbml0KCk7XG4gIGF0dGFjaEZvcm0oKTtcbn1cbiIsIlxuY29uc3QgdXJsID0gXCJodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb25cIlxuY29uc3Qgd2VhdGhlcktleSA9IFwiYmMxYzlkZTNhMTU0NGQ1M2IxNTQ0MTI4MjMwODEwXCI7XG5jb25zdCBteVVybCA9IGAkeyB1cmwgIH0/a2V5PSR7ICB3ZWF0aGVyS2V5ICB9YDtcblxuZnVuY3Rpb24gZmlsdGVyRGF0YShkYXRhKXtcbiAgY29uc3QgZmlsdGVyZWREYXRhID0ge1xuXG4gICAgbG9jYXRpb24gOiBkYXRhLmxvY2F0aW9uLm5hbWUsXG4gICAgY29uZGl0aW9uIDogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxuICAgIGh1bWlkIDogZGF0YS5jdXJyZW50Lmh1bWlkaXR5LFxuICAgIHRlbXBfYyA6IGRhdGEuY3VycmVudC50ZW1wX2MsXG4gICAgdGVtcF9mIDogZGF0YS5jdXJyZW50LnRlbXBfZixcbiAgICBmbF9jIDogZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jLFxuICAgIGZsX2YgOiBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YsXG4gICAgaW1nOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb25cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGZpbHRlcmVkRGF0YSk7XG4gIHJldHVybiBmaWx0ZXJlZERhdGFcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXREYXRhKHF1ZXJ5KSB7XG5cbiAgY29uc3QgY29tcGxldGVVcmwgPSBgJHtteVVybH0mcT0ke3F1ZXJ5fWA7XG4gIGNvbnNvbGUubG9nKG15VXJsKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY29tcGxldGVVcmwsIHttb2RlOidjb3JzJ30pXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZmlsdGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGFsZXJ0KFwiU29ycnksIGNhbm5vdCBmaW5kIHRoYXQgbG9jYXRpb25cIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5cbi8qXG5jdXJyZW50LmNvbmRpdGlvbi5pY29uXG5jdXJyZW50LmNvbmRpdGlvbi50ZXh0XG5cbmN1cnJlbnQuY29uZGl0aW9uLmZlZWxzbGlrZV9jXG5jdXJyZW50LmNvbmRpdGlvbi5mZWVsc2xpa2VfZlxuY3VycmVudC5jb25kaXRpb24uaHVtaWRpdHlcblxuY3VycmVudC5jb25kaXRpb24udGVtcF9jXG5jdXJyZW50LmNvbmRpdGlvbi50ZW1wX2ZcblxubG9jYXRpb24ubmFtZVxuKi8iLCJjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuXG5mdW5jdGlvbiB1aUNhcmQoKSB7XG4gIGNvbnN0IGNhcmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjYXJkRGl2LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50LWNhcmRcIik7XG5cbiAgY29uc3QgY2FyZENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjYXJkQ29udGVudC5jbGFzc0xpc3QuYWRkKFwiY2FyZC1jb250ZW50XCIpO1xuXG4gIGNhcmREaXYuYXBwZW5kQ2hpbGQoY2FyZENvbnRlbnQpO1xuICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGNhcmREaXYpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHRleHRDb250ZW50LCBjbGFzc05hbWUsIHBhcmVudCl7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuICBlbGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZShpbWdTcmMsIHBhcmVudCl7XG4gIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBlbGUuc3JjID0gaW1nU3JjO1xuICBlbGUuY2xhc3NMaXN0LmFkZCgnd2VhdGhlci1pY29uJyk7XG5cbiAgcGFyZW50LmFwcGVuZENoaWxkKGVsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdXR0b25zKHBhcmVudERpdikge1xuICBjb25zdCBidG5DID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY29uc3QgYnRuRiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ0bkMuY2xhc3NMaXN0LmFkZChcImNlbGNpdXNcIik7XG4gIGJ0bkYuY2xhc3NMaXN0LmFkZChcImZhcmVuaGVpdFwiKTtcbiAgYnRuQy50ZXh0Q29udGVudCA9IFwiwrBDXCI7XG4gIGJ0bkYudGV4dENvbnRlbnQgPSBcIsKwRlwiO1xuXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwidGVtcC1idXR0b25zXCIpO1xuXG4gIGRpdi5hcHBlbmRDaGlsZChidG5DKTtcbiAgZGl2LmFwcGVuZENoaWxkKGJ0bkYpO1xuICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQoZGl2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcm0oKSB7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKCdjaXR5Jyk7XG5cbiAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgdGV4dC5jbGFzc0xpc3QuYWRkKCdjaXR5TmFtZScpO1xuXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJzdWJtaXRcIik7XG4gIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcIlNlYXJjaFwiKTtcblxuICBmb3JtLmFwcGVuZENoaWxkKHRleHQpO1xuICBmb3JtLmFwcGVuZENoaWxkKGJ0bik7XG4gIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYXJkKCkge1xuICBjb250ZW50RGl2LmlubmVySFRNTCA9ICcnO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlV2VhdGhlckNhcmQoZGF0YSwgbW9kZSkge1xuICBjb25zdCBsb2MgPSBhd2FpdCBkYXRhLmxvY2F0aW9uO1xuICBjb25zdCBjb25kaSA9IGF3YWl0IGRhdGEuY29uZGl0aW9uOyBcbiAgY29uc3QgaHVtaWQgPSBhd2FpdCBkYXRhLmh1bWlkO1xuICBjb25zdCB0ZW1wQyA9IGF3YWl0IGRhdGEudGVtcF9jO1xuICBjb25zdCBmZWVsc0MgPSBhd2FpdCBkYXRhLmZsX2M7XG4gIGNvbnN0IHdJbWFnZSA9IGF3YWl0IGRhdGEuaW1nO1xuICBjb25zdCB0ZW1wRiA9IGF3YWl0IGRhdGEudGVtcF9mO1xuICBjb25zdCBmZWVsc0YgPSBhd2FpdCBkYXRhLmZsX2Y7XG5cbiAgY29uc3QgdGVtcFRvVXNlID0gKG1vZGUgPT09IFwiY1wiKSA/IGAke3RlbXBDfSDCsENgIDogYCR7dGVtcEZ9IMKwRmBcbiAgY29uc3QgZmVlbFRvVXNlID0gKG1vZGUgPT09IFwiY1wiKSA/IGAke2ZlZWxzQ30gwrBDYCA6IGAke2ZlZWxzRn0gwrBGYFxuXG4gIGNvbnN0IHBhcmVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhcmVudERpdi5jbGFzc0xpc3QuYWRkKFwicGFyZW50RGl2XCIpO1xuXG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbG9jLCBcImxvY2F0aW9uXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUltYWdlKHdJbWFnZSwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBjb25kaSwgXCJjb25kaXRpb25cIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBgJHt0ZW1wVG9Vc2V9YCwgXCJ0ZW1wXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYEZlZWxzIGxpa2UgJHtmZWVsVG9Vc2V9YCwgXCJmZWVscy1saWtlXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYEh1bWlkaXR5OiAke2h1bWlkfSVgLCBcImh1bWlkXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUJ1dHRvbnMocGFyZW50RGl2KTtcblxuICBjb250ZW50RGl2LmFwcGVuZENoaWxkKHBhcmVudERpdik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1aUluaXQoKSB7XG4gIHVpQ2FyZCgpO1xuICBjcmVhdGVGb3JtKCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdCBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmluaXQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=