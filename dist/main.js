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

const url = "http://api.weatherapi.com/v1/current.json"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ3FDOzs7QUFHdEU7QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEOztBQUVBO0FBQ0EseUJBQXlCLHFEQUFPO0FBQ2hDLEVBQUUsOENBQVM7QUFDWCxFQUFFLCtDQUFVO0FBQ1o7QUFDQSxRQUFRLHNEQUFpQjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQywwQkFBMEI7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQywwQkFBMEI7QUFDL0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxREFBTzs7QUFFaEMsRUFBRSw4Q0FBUztBQUNYLEVBQUUsK0NBQVU7QUFDWjtBQUNBLFFBQVEsc0RBQWlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsNENBQU07QUFDUjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTSxTQUFTLGFBQWE7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR2U7O0FBRWYseUJBQXlCLE1BQU0sS0FBSyxNQUFNO0FBQzFDOztBQUVBO0FBQ0EsK0NBQStDLFlBQVk7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsT0FBTyxTQUFTLE9BQU87QUFDL0Qsd0NBQXdDLFFBQVEsU0FBUyxRQUFROztBQUVqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDLHFDQUFxQyxVQUFVO0FBQy9DLG9DQUFvQyxNQUFNO0FBQzFDOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7Ozs7OztVQ2pHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmdDOztBQUVoQyx1REFBSSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mZXRjaGluZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZXREYXRhIGZyb20gXCIuL2ZldGNoaW5nXCI7XG5pbXBvcnQge3VpSW5pdCwgY3JlYXRlV2VhdGhlckNhcmQsIGNsZWFyQ2FyZCwgY3JlYXRlRm9ybX0gZnJvbSBcIi4vdWlcIjtcblxuXG5jb25zdCBhdHRhY2hGb3JtID0gKCkgPT4ge1xuICBjb25zdCBjaXR5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgY2l0eUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmaW5kQ2l0eSwge29uY2U6IHRydWV9KTtcbn1cblxuY29uc3QgYXR0YWNoVW5pdCA9IGFzeW5jIChjaXR5TmFtZSxtb2RlKSA9PiB7XG4gIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgZ2V0RGF0YShjaXR5TmFtZSkudGhlbigoZGF0YSkgPT4gZGF0YSk7XG4gIGNsZWFyQ2FyZCgpO1xuICBjcmVhdGVGb3JtKCk7XG4gIGF0dGFjaEZvcm0oKTtcbiAgYXdhaXQgY3JlYXRlV2VhdGhlckNhcmQoY2l0eURhdGEsIG1vZGUpO1xuICBhdHRhY2hDZWxzaXVzKGNpdHlOYW1lKTtcbiAgYXR0YWNoRmFyZW5oZWl0KGNpdHlOYW1lKTtcbn1cblxuY29uc3QgYXR0YWNoQ2Vsc2l1cyA9IGFzeW5jIChjaXR5TmFtZSkgPT4ge1xuICBjb25zdCBjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNlbGNpdXMnKTtcbiAgYy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2F0dGFjaFVuaXQoY2l0eU5hbWUsIFwiY1wiKX0pO1xufVxuXG5jb25zdCBhdHRhY2hGYXJlbmhlaXQgPSBhc3luYyAoY2l0eU5hbWUpID0+IHtcbiAgY29uc3QgZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXJlbmhlaXQnKTtcbiAgZi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2F0dGFjaFVuaXQoY2l0eU5hbWUsIFwiZlwiKX0pO1xufVxuXG5cbmNvbnN0IGZpbmRDaXR5ID0gYXN5bmMgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5TmFtZScpLnZhbHVlO1xuICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGdldERhdGEoY2l0eU5hbWUpLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xuXG4gIGNsZWFyQ2FyZCgpO1xuICBjcmVhdGVGb3JtKCk7XG4gIGF0dGFjaEZvcm0oKTtcbiAgYXdhaXQgY3JlYXRlV2VhdGhlckNhcmQoY2l0eURhdGEsIFwiY1wiKTtcbiAgYXR0YWNoQ2Vsc2l1cyhjaXR5TmFtZSk7XG4gIGF0dGFjaEZhcmVuaGVpdChjaXR5TmFtZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKXtcbiAgdWlJbml0KCk7XG4gIGF0dGFjaEZvcm0oKTtcbn1cbiIsIlxuY29uc3QgdXJsID0gXCJodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvblwiXG5jb25zdCB3ZWF0aGVyS2V5ID0gXCJiYzFjOWRlM2ExNTQ0ZDUzYjE1NDQxMjgyMzA4MTBcIjtcbmNvbnN0IG15VXJsID0gYCR7IHVybCAgfT9rZXk9JHsgIHdlYXRoZXJLZXkgIH1gO1xuXG5mdW5jdGlvbiBmaWx0ZXJEYXRhKGRhdGEpe1xuICBjb25zdCBmaWx0ZXJlZERhdGEgPSB7XG5cbiAgICBsb2NhdGlvbiA6IGRhdGEubG9jYXRpb24ubmFtZSxcbiAgICBjb25kaXRpb24gOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXG4gICAgaHVtaWQgOiBkYXRhLmN1cnJlbnQuaHVtaWRpdHksXG4gICAgdGVtcF9jIDogZGF0YS5jdXJyZW50LnRlbXBfYyxcbiAgICB0ZW1wX2YgOiBkYXRhLmN1cnJlbnQudGVtcF9mLFxuICAgIGZsX2MgOiBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MsXG4gICAgZmxfZiA6IGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZixcbiAgICBpbWc6IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvblxuICB9XG5cbiAgY29uc29sZS5sb2coZmlsdGVyZWREYXRhKTtcbiAgcmV0dXJuIGZpbHRlcmVkRGF0YVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldERhdGEocXVlcnkpIHtcblxuICBjb25zdCBjb21wbGV0ZVVybCA9IGAke215VXJsfSZxPSR7cXVlcnl9YDtcbiAgY29uc29sZS5sb2cobXlVcmwpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjb21wbGV0ZVVybCwge21vZGU6J2NvcnMnfSlcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBmaWx0ZXJEYXRhKHdlYXRoZXJEYXRhKTtcbiAgXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYWxlcnQoXCJTb3JyeSwgY2Fubm90IGZpbmQgdGhhdCBsb2NhdGlvblwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG5cblxuLypcbmN1cnJlbnQuY29uZGl0aW9uLmljb25cbmN1cnJlbnQuY29uZGl0aW9uLnRleHRcblxuY3VycmVudC5jb25kaXRpb24uZmVlbHNsaWtlX2NcbmN1cnJlbnQuY29uZGl0aW9uLmZlZWxzbGlrZV9mXG5jdXJyZW50LmNvbmRpdGlvbi5odW1pZGl0eVxuXG5jdXJyZW50LmNvbmRpdGlvbi50ZW1wX2NcbmN1cnJlbnQuY29uZGl0aW9uLnRlbXBfZlxuXG5sb2NhdGlvbi5uYW1lXG4qLyIsImNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbmZ1bmN0aW9uIHVpQ2FyZCgpIHtcbiAgY29uc3QgY2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhcmREaXYuY2xhc3NMaXN0LmFkZChcImNvbnRlbnQtY2FyZFwiKTtcblxuICBjb25zdCBjYXJkQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhcmRDb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjYXJkLWNvbnRlbnRcIik7XG5cbiAgY2FyZERpdi5hcHBlbmRDaGlsZChjYXJkQ29udGVudCk7XG4gIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQoY2FyZERpdik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgdGV4dENvbnRlbnQsIGNsYXNzTmFtZSwgcGFyZW50KXtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWxlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG4gIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cbiAgcGFyZW50LmFwcGVuZENoaWxkKGVsZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlKGltZ1NyYywgcGFyZW50KXtcbiAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGVsZS5zcmMgPSBpbWdTcmM7XG4gIGVsZS5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyLWljb24nKTtcblxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbnMocGFyZW50RGl2KSB7XG4gIGNvbnN0IGJ0bkMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBidG5GID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnRuQy5jbGFzc0xpc3QuYWRkKFwiY2VsY2l1c1wiKTtcbiAgYnRuRi5jbGFzc0xpc3QuYWRkKFwiZmFyZW5oZWl0XCIpO1xuICBidG5DLnRleHRDb250ZW50ID0gXCLCsENcIjtcbiAgYnRuRi50ZXh0Q29udGVudCA9IFwiwrBGXCI7XG5cbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJ0ZW1wLWJ1dHRvbnNcIik7XG5cbiAgZGl2LmFwcGVuZENoaWxkKGJ0bkMpO1xuICBkaXYuYXBwZW5kQ2hpbGQoYnRuRik7XG4gIHBhcmVudERpdi5hcHBlbmRDaGlsZChkaXYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2NpdHknKTtcblxuICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICB0ZXh0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NpdHlOYW1lJyk7XG5cbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKTtcbiAgYnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiU2VhcmNoXCIpO1xuXG4gIGZvcm0uYXBwZW5kQ2hpbGQodGV4dCk7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgY29udGVudERpdi5hcHBlbmRDaGlsZChmb3JtKTtcbiAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNhcmQoKSB7XG4gIGNvbnRlbnREaXYuaW5uZXJIVE1MID0gJyc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2FyZChkYXRhLCBtb2RlKSB7XG4gIGNvbnN0IGxvYyA9IGF3YWl0IGRhdGEubG9jYXRpb247XG4gIGNvbnN0IGNvbmRpID0gYXdhaXQgZGF0YS5jb25kaXRpb247IFxuICBjb25zdCBodW1pZCA9IGF3YWl0IGRhdGEuaHVtaWQ7XG4gIGNvbnN0IHRlbXBDID0gYXdhaXQgZGF0YS50ZW1wX2M7XG4gIGNvbnN0IGZlZWxzQyA9IGF3YWl0IGRhdGEuZmxfYztcbiAgY29uc3Qgd0ltYWdlID0gYXdhaXQgZGF0YS5pbWc7XG4gIGNvbnN0IHRlbXBGID0gYXdhaXQgZGF0YS50ZW1wX2Y7XG4gIGNvbnN0IGZlZWxzRiA9IGF3YWl0IGRhdGEuZmxfZjtcblxuICBjb25zdCB0ZW1wVG9Vc2UgPSAobW9kZSA9PT0gXCJjXCIpID8gYCR7dGVtcEN9IMKwQ2AgOiBgJHt0ZW1wRn0gwrBGYFxuICBjb25zdCBmZWVsVG9Vc2UgPSAobW9kZSA9PT0gXCJjXCIpID8gYCR7ZmVlbHNDfSDCsENgIDogYCR7ZmVlbHNGfSDCsEZgXG5cbiAgY29uc3QgcGFyZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGFyZW50RGl2LmNsYXNzTGlzdC5hZGQoXCJwYXJlbnREaXZcIik7XG5cbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBsb2MsIFwibG9jYXRpb25cIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlSW1hZ2Uod0ltYWdlLCBwYXJlbnREaXYpO1xuICBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIGNvbmRpLCBcImNvbmRpdGlvblwiLCBwYXJlbnREaXYpO1xuICBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIGAke3RlbXBUb1VzZX1gLCBcInRlbXBcIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBgRmVlbHMgbGlrZSAke2ZlZWxUb1VzZX1gLCBcImZlZWxzLWxpa2VcIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBgSHVtaWRpdHk6ICR7aHVtaWR9JWAsIFwiaHVtaWRcIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlQnV0dG9ucyhwYXJlbnREaXYpO1xuXG4gIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQocGFyZW50RGl2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVpSW5pdCgpIHtcbiAgdWlDYXJkKCk7XG4gIGNyZWF0ZUZvcm0oKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuaW5pdCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==