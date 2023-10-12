import getData from "./fetching";
import uiCard from "./ui";

uiCard();
const wData = getData("Cebu").then((data) =>  data);
const theData = await wData;

console.log(theData);
console.log(theData.current);
console.log(theData.location);

const location = theData.location.name;
console.log(location);

const condition = theData.current.condition.text;
console.log(condition);

const humid = theData.current.humidity;
console.log(humid);

const temp_c = theData.current.temp_c;
console.log(temp_c);
const temp_f = theData.current.temp_f;
console.log(temp_f);

const fl_c = theData.current.feelslike_c;
console.log(fl_c);
const fl_f = theData.current.feelslike_f;
console.log(fl_f);

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