
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


export default async function getData(query) {

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