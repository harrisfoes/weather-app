
const weatherKey = "bc1c9de3a1544d53b1544128230810";
const url = "https://api.weatherapi.com/v1/current.json";
const query = "london";
const completeUrl = `${url  }?key=${  weatherKey  }&q=${  query}`;


export default async function getData(myUrl) {
  try {
    const response = await fetch(myUrl, {mode:'cors'})
    const weatherData = await response.json();
    
    return weatherData;

  } catch (error) {
    return null;
  }
}

getData(completeUrl);



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