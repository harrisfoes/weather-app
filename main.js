/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    console.log(error);
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
  console.log(data);
  console.log(mode);
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
  createElement("div", `Humidity: ${humid}%`, "humid", parentDiv);
  createElement("div", `${tempToUse}`, "temp", parentDiv);
  createElement("div", `Feels like ${feelToUse}`, "feels-like", parentDiv);
  createButtons(parentDiv);

  contentDiv.appendChild(parentDiv);
  console.log("buttons created");
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
/* harmony import */ var _fetching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetching */ "./src/fetching.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/ui.js");



(0,_ui__WEBPACK_IMPORTED_MODULE_1__.uiInit)();

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
  const cityData = await (0,_fetching__WEBPACK_IMPORTED_MODULE_0__["default"])(cityName).then((data) => data);
  console.log(cityData);

  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.clearCard)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createForm)();
  attachForm();
  await (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createWeatherCard)(cityData, "c");
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU0sU0FBUyxhQUFhOztBQUU5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdlOztBQUVmLHlCQUF5QixNQUFNLEtBQUssTUFBTTtBQUMxQzs7QUFFQTtBQUNBLCtDQUErQyxZQUFZO0FBQzNEOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLE9BQU8sU0FBUyxPQUFPO0FBQy9ELHdDQUF3QyxRQUFRLFNBQVMsUUFBUTs7QUFFakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQywwQkFBMEIsVUFBVTtBQUNwQyxxQ0FBcUMsVUFBVTtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7Ozs7OztVQ3BHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNxQzs7QUFFdEUsMkNBQU07O0FBRU47QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEOztBQUVBO0FBQ0EseUJBQXlCLHFEQUFPO0FBQ2hDLEVBQUUsOENBQVM7QUFDWCxFQUFFLCtDQUFVO0FBQ1o7QUFDQSxRQUFRLHNEQUFpQjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsMEJBQTBCO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywwQkFBMEI7QUFDL0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxREFBTztBQUNoQzs7QUFFQSxFQUFFLDhDQUFTO0FBQ1gsRUFBRSwrQ0FBVTtBQUNaO0FBQ0EsUUFBUSxzREFBaUI7QUFDekI7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZmV0Y2hpbmcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHVybCA9IFwiaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb25cIlxuY29uc3Qgd2VhdGhlcktleSA9IFwiYmMxYzlkZTNhMTU0NGQ1M2IxNTQ0MTI4MjMwODEwXCI7XG5jb25zdCBteVVybCA9IGAkeyB1cmwgIH0/a2V5PSR7ICB3ZWF0aGVyS2V5ICB9YDtcblxuZnVuY3Rpb24gZmlsdGVyRGF0YShkYXRhKXtcbiAgY29uc3QgZmlsdGVyZWREYXRhID0ge1xuXG4gICAgbG9jYXRpb24gOiBkYXRhLmxvY2F0aW9uLm5hbWUsXG4gICAgY29uZGl0aW9uIDogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxuICAgIGh1bWlkIDogZGF0YS5jdXJyZW50Lmh1bWlkaXR5LFxuICAgIHRlbXBfYyA6IGRhdGEuY3VycmVudC50ZW1wX2MsXG4gICAgdGVtcF9mIDogZGF0YS5jdXJyZW50LnRlbXBfZixcbiAgICBmbF9jIDogZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jLFxuICAgIGZsX2YgOiBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YsXG4gICAgaW1nOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb25cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGZpbHRlcmVkRGF0YSk7XG4gIHJldHVybiBmaWx0ZXJlZERhdGFcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXREYXRhKHF1ZXJ5KSB7XG5cbiAgY29uc3QgY29tcGxldGVVcmwgPSBgJHtteVVybH0mcT0ke3F1ZXJ5fWA7XG4gIGNvbnNvbGUubG9nKG15VXJsKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY29tcGxldGVVcmwsIHttb2RlOidjb3JzJ30pXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZmlsdGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICBhbGVydChcIlNvcnJ5LCBjYW5ub3QgZmluZCB0aGF0IGxvY2F0aW9uXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cblxuXG4vKlxuY3VycmVudC5jb25kaXRpb24uaWNvblxuY3VycmVudC5jb25kaXRpb24udGV4dFxuXG5jdXJyZW50LmNvbmRpdGlvbi5mZWVsc2xpa2VfY1xuY3VycmVudC5jb25kaXRpb24uZmVlbHNsaWtlX2ZcbmN1cnJlbnQuY29uZGl0aW9uLmh1bWlkaXR5XG5cbmN1cnJlbnQuY29uZGl0aW9uLnRlbXBfY1xuY3VycmVudC5jb25kaXRpb24udGVtcF9mXG5cbmxvY2F0aW9uLm5hbWVcbiovIiwiY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcblxuZnVuY3Rpb24gdWlDYXJkKCkge1xuICBjb25zdCBjYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZERpdi5jbGFzc0xpc3QuYWRkKFwiY29udGVudC1jYXJkXCIpO1xuXG4gIGNvbnN0IGNhcmRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZENvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNhcmQtY29udGVudFwiKTtcblxuICBjYXJkRGl2LmFwcGVuZENoaWxkKGNhcmRDb250ZW50KTtcbiAgY29udGVudERpdi5hcHBlbmRDaGlsZChjYXJkRGl2KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCB0ZXh0Q29udGVudCwgY2xhc3NOYW1lLCBwYXJlbnQpe1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbGUudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW1nU3JjLCBwYXJlbnQpe1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgZWxlLnNyYyA9IGltZ1NyYztcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXItaWNvbicpO1xuXG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnV0dG9ucyhwYXJlbnREaXYpIHtcbiAgY29uc3QgYnRuQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IGJ0bkYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG5DLmNsYXNzTGlzdC5hZGQoXCJjZWxjaXVzXCIpO1xuICBidG5GLmNsYXNzTGlzdC5hZGQoXCJmYXJlbmhlaXRcIik7XG4gIGJ0bkMudGV4dENvbnRlbnQgPSBcIsKwQ1wiO1xuICBidG5GLnRleHRDb250ZW50ID0gXCLCsEZcIjtcblxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYuY2xhc3NMaXN0LmFkZChcInRlbXAtYnV0dG9uc1wiKTtcblxuICBkaXYuYXBwZW5kQ2hpbGQoYnRuQyk7XG4gIGRpdi5hcHBlbmRDaGlsZChidG5GKTtcbiAgcGFyZW50RGl2LmFwcGVuZENoaWxkKGRpdik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGZvcm0uY2xhc3NMaXN0LmFkZCgnY2l0eScpO1xuXG4gIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIHRleHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gIHRleHQuY2xhc3NMaXN0LmFkZCgnY2l0eU5hbWUnKTtcblxuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpO1xuICBidG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJTZWFyY2hcIik7XG5cbiAgZm9ybS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgZm9ybS5hcHBlbmRDaGlsZChidG4pO1xuICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGZvcm0pO1xuICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2FyZCgpIHtcbiAgY29udGVudERpdi5pbm5lckhUTUwgPSAnJztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVdlYXRoZXJDYXJkKGRhdGEsIG1vZGUpIHtcbiAgY29uc29sZS5sb2coZGF0YSk7XG4gIGNvbnNvbGUubG9nKG1vZGUpO1xuICBjb25zdCBsb2MgPSBhd2FpdCBkYXRhLmxvY2F0aW9uO1xuICBjb25zdCBjb25kaSA9IGF3YWl0IGRhdGEuY29uZGl0aW9uOyBcbiAgY29uc3QgaHVtaWQgPSBhd2FpdCBkYXRhLmh1bWlkO1xuICBjb25zdCB0ZW1wQyA9IGF3YWl0IGRhdGEudGVtcF9jO1xuICBjb25zdCBmZWVsc0MgPSBhd2FpdCBkYXRhLmZsX2M7XG4gIGNvbnN0IHdJbWFnZSA9IGF3YWl0IGRhdGEuaW1nO1xuICBjb25zdCB0ZW1wRiA9IGF3YWl0IGRhdGEudGVtcF9mO1xuICBjb25zdCBmZWVsc0YgPSBhd2FpdCBkYXRhLmZsX2Y7XG5cbiAgY29uc3QgdGVtcFRvVXNlID0gKG1vZGUgPT09IFwiY1wiKSA/IGAke3RlbXBDfSDCsENgIDogYCR7dGVtcEZ9IMKwRmBcbiAgY29uc3QgZmVlbFRvVXNlID0gKG1vZGUgPT09IFwiY1wiKSA/IGAke2ZlZWxzQ30gwrBDYCA6IGAke2ZlZWxzRn0gwrBGYFxuXG4gIGNvbnN0IHBhcmVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBhcmVudERpdi5jbGFzc0xpc3QuYWRkKFwicGFyZW50RGl2XCIpO1xuXG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbG9jLCBcImxvY2F0aW9uXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUltYWdlKHdJbWFnZSwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBjb25kaSwgXCJjb25kaXRpb25cIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBgSHVtaWRpdHk6ICR7aHVtaWR9JWAsIFwiaHVtaWRcIiwgcGFyZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBgJHt0ZW1wVG9Vc2V9YCwgXCJ0ZW1wXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYEZlZWxzIGxpa2UgJHtmZWVsVG9Vc2V9YCwgXCJmZWVscy1saWtlXCIsIHBhcmVudERpdik7XG4gIGNyZWF0ZUJ1dHRvbnMocGFyZW50RGl2KTtcblxuICBjb250ZW50RGl2LmFwcGVuZENoaWxkKHBhcmVudERpdik7XG4gIGNvbnNvbGUubG9nKFwiYnV0dG9ucyBjcmVhdGVkXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdWlJbml0KCkge1xuICB1aUNhcmQoKTtcbiAgY3JlYXRlRm9ybSgpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdldERhdGEgZnJvbSBcIi4vZmV0Y2hpbmdcIjtcbmltcG9ydCB7dWlJbml0LCBjcmVhdGVXZWF0aGVyQ2FyZCwgY2xlYXJDYXJkLCBjcmVhdGVGb3JtfSBmcm9tIFwiLi91aVwiO1xuXG51aUluaXQoKTtcblxuY29uc3QgYXR0YWNoRm9ybSA9ICgpID0+IHtcbiAgY29uc3QgY2l0eUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gIGNpdHlGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZmluZENpdHksIHtvbmNlOiB0cnVlfSk7XG59XG5cbmNvbnN0IGF0dGFjaFVuaXQgPSBhc3luYyAoY2l0eU5hbWUsbW9kZSkgPT4ge1xuICBjb25zdCBjaXR5RGF0YSA9IGF3YWl0IGdldERhdGEoY2l0eU5hbWUpLnRoZW4oKGRhdGEpID0+IGRhdGEpO1xuICBjbGVhckNhcmQoKTtcbiAgY3JlYXRlRm9ybSgpO1xuICBhdHRhY2hGb3JtKCk7XG4gIGF3YWl0IGNyZWF0ZVdlYXRoZXJDYXJkKGNpdHlEYXRhLCBtb2RlKTtcbiAgYXR0YWNoQ2Vsc2l1cyhjaXR5TmFtZSk7XG4gIGF0dGFjaEZhcmVuaGVpdChjaXR5TmFtZSk7XG59XG5cbmNvbnN0IGF0dGFjaENlbHNpdXMgPSBhc3luYyAoY2l0eU5hbWUpID0+IHtcbiAgY29uc3QgYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZWxjaXVzJyk7XG4gIGNvbnNvbGUubG9nKGNpdHlOYW1lKTtcbiAgY29uc29sZS5sb2coYyk7XG4gIGMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHthdHRhY2hVbml0KGNpdHlOYW1lLCBcImNcIil9KTtcbn1cblxuY29uc3QgYXR0YWNoRmFyZW5oZWl0ID0gYXN5bmMgKGNpdHlOYW1lKSA9PiB7XG4gIGNvbnN0IGYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmFyZW5oZWl0Jyk7XG4gIGNvbnNvbGUubG9nKGYpO1xuICBmLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7YXR0YWNoVW5pdChjaXR5TmFtZSwgXCJmXCIpfSk7XG59XG5cblxuY29uc3QgZmluZENpdHkgPSBhc3luYyAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHlOYW1lJykudmFsdWU7XG4gIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgZ2V0RGF0YShjaXR5TmFtZSkudGhlbigoZGF0YSkgPT4gZGF0YSk7XG4gIGNvbnNvbGUubG9nKGNpdHlEYXRhKTtcblxuICBjbGVhckNhcmQoKTtcbiAgY3JlYXRlRm9ybSgpO1xuICBhdHRhY2hGb3JtKCk7XG4gIGF3YWl0IGNyZWF0ZVdlYXRoZXJDYXJkKGNpdHlEYXRhLCBcImNcIik7XG4gIGF0dGFjaENlbHNpdXMoY2l0eU5hbWUpO1xuICBhdHRhY2hGYXJlbmhlaXQoY2l0eU5hbWUpO1xufVxuXG5cbmF0dGFjaEZvcm0oKTtcblxuLypcbmN1cnJlbnQuY29uZGl0aW9uLmljb25cbmN1cnJlbnQuY29uZGl0aW9uLnRleHRcblxuY3VycmVudC5mZWVsc2xpa2VfY1xuY3VycmVudC5mZWVsc2xpa2VfZlxuY3VycmVudC5odW1pZGl0eVxuXG5jdXJyZW50LnRlbXBfY1xuY3VycmVudC50ZW1wX2ZcblxubG9jYXRpb24ubmFtZVxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=