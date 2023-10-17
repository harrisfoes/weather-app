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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetching */ "./src/fetching.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/ui.js");



(0,_ui__WEBPACK_IMPORTED_MODULE_1__.uiInit)();

const wData = (0,_fetching__WEBPACK_IMPORTED_MODULE_0__["default"])("Cebu").then((data) =>  data);
const theData = await wData;

const attachForm = () => {
  const cityForm = document.querySelector('form');
  cityForm.addEventListener("submit", findCity, {once: true});
}

const findCity = async (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.cityName').value;
  const cityData = await (0,_fetching__WEBPACK_IMPORTED_MODULE_0__["default"])(cityName).then((data) => data);
  console.log(cityData);

  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.clearCard)();
  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createForm)();
  attachForm();
  (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createWeatherCard)(cityData);
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
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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

function createButtons() {
  const btnC = document.createElement("button");
  const btnF = document.createElement("button");
  btnC.textContent = "°C";
  btnF.textContent = "°F";

  const div = document.createElement("div");

  div.appendChild(btnC);
  div.appendChild(btnF);
  contentDiv.appendChild(div);
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

async function createWeatherCard(data) {
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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU0sU0FBUyxhQUFhOztBQUU5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdlOztBQUVmLHlCQUF5QixNQUFNLEtBQUssTUFBTTtBQUMxQzs7QUFFQTtBQUNBLCtDQUErQyxZQUFZO0FBQzNEOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZEaUM7QUFDcUM7O0FBRXRFLDJDQUFNOztBQUVOLGNBQWMscURBQU87QUFDckI7O0FBRUE7QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxREFBTztBQUNoQzs7QUFFQSxFQUFFLDhDQUFTO0FBQ1gsRUFBRSwrQ0FBVTtBQUNaO0FBQ0EsRUFBRSxzREFBaUI7QUFDbkI7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLE1BQU07QUFDMUMsMEJBQTBCLE9BQU87QUFDakMscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7Ozs7O1VDcEZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ZldGNoaW5nLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB1cmwgPSBcImh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uXCJcbmNvbnN0IHdlYXRoZXJLZXkgPSBcImJjMWM5ZGUzYTE1NDRkNTNiMTU0NDEyODIzMDgxMFwiO1xuY29uc3QgbXlVcmwgPSBgJHsgdXJsICB9P2tleT0keyAgd2VhdGhlcktleSAgfWA7XG5cbmZ1bmN0aW9uIGZpbHRlckRhdGEoZGF0YSl7XG4gIGNvbnN0IGZpbHRlcmVkRGF0YSA9IHtcblxuICAgIGxvY2F0aW9uIDogZGF0YS5sb2NhdGlvbi5uYW1lLFxuICAgIGNvbmRpdGlvbiA6IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcbiAgICBodW1pZCA6IGRhdGEuY3VycmVudC5odW1pZGl0eSxcbiAgICB0ZW1wX2MgOiBkYXRhLmN1cnJlbnQudGVtcF9jLFxuICAgIHRlbXBfZiA6IGRhdGEuY3VycmVudC50ZW1wX2YsXG4gICAgZmxfYyA6IGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYyxcbiAgICBmbF9mIDogZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mLFxuICAgIGltZzogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uXG4gIH1cblxuICBjb25zb2xlLmxvZyhmaWx0ZXJlZERhdGEpO1xuICByZXR1cm4gZmlsdGVyZWREYXRhXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShxdWVyeSkge1xuXG4gIGNvbnN0IGNvbXBsZXRlVXJsID0gYCR7bXlVcmx9JnE9JHtxdWVyeX1gO1xuICBjb25zb2xlLmxvZyhteVVybCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbXBsZXRlVXJsLCB7bW9kZTonY29ycyd9KVxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGZpbHRlckRhdGEod2VhdGhlckRhdGEpO1xuICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgYWxlcnQoXCJTb3JyeSwgY2Fubm90IGZpbmQgdGhhdCBsb2NhdGlvblwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG5cblxuLypcbmN1cnJlbnQuY29uZGl0aW9uLmljb25cbmN1cnJlbnQuY29uZGl0aW9uLnRleHRcblxuY3VycmVudC5jb25kaXRpb24uZmVlbHNsaWtlX2NcbmN1cnJlbnQuY29uZGl0aW9uLmZlZWxzbGlrZV9mXG5jdXJyZW50LmNvbmRpdGlvbi5odW1pZGl0eVxuXG5jdXJyZW50LmNvbmRpdGlvbi50ZW1wX2NcbmN1cnJlbnQuY29uZGl0aW9uLnRlbXBfZlxuXG5sb2NhdGlvbi5uYW1lXG4qLyIsImltcG9ydCBnZXREYXRhIGZyb20gXCIuL2ZldGNoaW5nXCI7XG5pbXBvcnQge3VpSW5pdCwgY3JlYXRlV2VhdGhlckNhcmQsIGNsZWFyQ2FyZCwgY3JlYXRlRm9ybX0gZnJvbSBcIi4vdWlcIjtcblxudWlJbml0KCk7XG5cbmNvbnN0IHdEYXRhID0gZ2V0RGF0YShcIkNlYnVcIikudGhlbigoZGF0YSkgPT4gIGRhdGEpO1xuY29uc3QgdGhlRGF0YSA9IGF3YWl0IHdEYXRhO1xuXG5jb25zdCBhdHRhY2hGb3JtID0gKCkgPT4ge1xuICBjb25zdCBjaXR5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgY2l0eUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmaW5kQ2l0eSwge29uY2U6IHRydWV9KTtcbn1cblxuY29uc3QgZmluZENpdHkgPSBhc3luYyAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHlOYW1lJykudmFsdWU7XG4gIGNvbnN0IGNpdHlEYXRhID0gYXdhaXQgZ2V0RGF0YShjaXR5TmFtZSkudGhlbigoZGF0YSkgPT4gZGF0YSk7XG4gIGNvbnNvbGUubG9nKGNpdHlEYXRhKTtcblxuICBjbGVhckNhcmQoKTtcbiAgY3JlYXRlRm9ybSgpO1xuICBhdHRhY2hGb3JtKCk7XG4gIGNyZWF0ZVdlYXRoZXJDYXJkKGNpdHlEYXRhKTtcbn1cblxuXG5hdHRhY2hGb3JtKCk7XG5cbi8qXG5jdXJyZW50LmNvbmRpdGlvbi5pY29uXG5jdXJyZW50LmNvbmRpdGlvbi50ZXh0XG5cbmN1cnJlbnQuZmVlbHNsaWtlX2NcbmN1cnJlbnQuZmVlbHNsaWtlX2ZcbmN1cnJlbnQuaHVtaWRpdHlcblxuY3VycmVudC50ZW1wX2NcbmN1cnJlbnQudGVtcF9mXG5cbmxvY2F0aW9uLm5hbWVcbiovIiwiY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcblxuZnVuY3Rpb24gdWlDYXJkKCkge1xuICBjb25zdCBjYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZERpdi5jbGFzc0xpc3QuYWRkKFwiY29udGVudC1jYXJkXCIpO1xuXG4gIGNvbnN0IGNhcmRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZENvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNhcmQtY29udGVudFwiKTtcblxuICBjYXJkRGl2LmFwcGVuZENoaWxkKGNhcmRDb250ZW50KTtcbiAgY29udGVudERpdi5hcHBlbmRDaGlsZChjYXJkRGl2KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCB0ZXh0Q29udGVudCwgY2xhc3NOYW1lLCBwYXJlbnQpe1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbGUudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcblxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW1nU3JjLCBwYXJlbnQpe1xuICBjb25zdCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgZWxlLnNyYyA9IGltZ1NyYztcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXItaWNvbicpO1xuXG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnV0dG9ucygpIHtcbiAgY29uc3QgYnRuQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IGJ0bkYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG5DLnRleHRDb250ZW50ID0gXCLCsENcIjtcbiAgYnRuRi50ZXh0Q29udGVudCA9IFwiwrBGXCI7XG5cbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBkaXYuYXBwZW5kQ2hpbGQoYnRuQyk7XG4gIGRpdi5hcHBlbmRDaGlsZChidG5GKTtcbiAgY29udGVudERpdi5hcHBlbmRDaGlsZChkaXYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9ybSgpIHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2NpdHknKTtcblxuICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICB0ZXh0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NpdHlOYW1lJyk7XG5cbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKTtcbiAgYnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiU2VhcmNoXCIpO1xuXG4gIGZvcm0uYXBwZW5kQ2hpbGQodGV4dCk7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgY29udGVudERpdi5hcHBlbmRDaGlsZChmb3JtKTtcbiAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNhcmQoKSB7XG4gIGNvbnRlbnREaXYuaW5uZXJIVE1MID0gJyc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2FyZChkYXRhKSB7XG4gIGNvbnN0IGxvYyA9IGF3YWl0IGRhdGEubG9jYXRpb247XG4gIGNvbnN0IGNvbmRpID0gYXdhaXQgZGF0YS5jb25kaXRpb247IFxuICBjb25zdCBodW1pZCA9IGF3YWl0IGRhdGEuaHVtaWQ7XG4gIGNvbnN0IHRlbXBDID0gYXdhaXQgZGF0YS50ZW1wX2M7XG4gIGNvbnN0IGZlZWxzQyA9IGF3YWl0IGRhdGEuZmxfYztcbiAgY29uc3Qgd0ltYWdlID0gYXdhaXQgZGF0YS5pbWc7XG5cbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBsb2MsIFwibG9jYXRpb25cIiwgY29udGVudERpdik7XG4gIGNyZWF0ZUltYWdlKHdJbWFnZSwgY29udGVudERpdik7XG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgY29uZGksIFwiY29uZGl0aW9uXCIsIGNvbnRlbnREaXYpO1xuICBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIGBIdW1pZGl0eTogJHtodW1pZH1gLCBodW1pZCwgY29udGVudERpdik7XG4gIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYCR7dGVtcEN9IMKwQ2AsIFwidGVtcFwiLCBjb250ZW50RGl2KTtcbiAgY3JlYXRlRWxlbWVudChcImRpdlwiLCBgRmVlbHMgbGlrZSAke2ZlZWxzQ30gwrBDYCwgXCJmZWVscy1saWtlXCIsIGNvbnRlbnREaXYpO1xuICBjcmVhdGVCdXR0b25zKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1aUluaXQoKSB7XG4gIHVpQ2FyZCgpO1xuICBjcmVhdGVGb3JtKCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciB3ZWJwYWNrUXVldWVzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBxdWV1ZXNcIikgOiBcIl9fd2VicGFja19xdWV1ZXNfX1wiO1xudmFyIHdlYnBhY2tFeHBvcnRzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBleHBvcnRzXCIpIDogXCJfX3dlYnBhY2tfZXhwb3J0c19fXCI7XG52YXIgd2VicGFja0Vycm9yID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBlcnJvclwiKSA6IFwiX193ZWJwYWNrX2Vycm9yX19cIjtcbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgcXVldWUuZCA8IDEpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZihkZXBbd2VicGFja1F1ZXVlc10pIHJldHVybiBkZXA7XG5cdFx0aWYoZGVwLnRoZW4pIHtcblx0XHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdFx0cXVldWUuZCA9IDA7XG5cdFx0XHRkZXAudGhlbigocikgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0V4cG9ydHNdID0gcjtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXJyb3JdID0gZTtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0b2JqW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAoZm4ocXVldWUpKTtcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVxuXHR9XG5cdHZhciByZXQgPSB7fTtcblx0cmV0W3dlYnBhY2tRdWV1ZXNdID0geCA9PiB7fTtcblx0cmV0W3dlYnBhY2tFeHBvcnRzXSA9IGRlcDtcblx0cmV0dXJuIHJldDtcbn0pKTtcbl9fd2VicGFja19yZXF1aXJlX18uYSA9IChtb2R1bGUsIGJvZHksIGhhc0F3YWl0KSA9PiB7XG5cdHZhciBxdWV1ZTtcblx0aGFzQXdhaXQgJiYgKChxdWV1ZSA9IFtdKS5kID0gLTEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgcXVldWUuZCA8IDAgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==