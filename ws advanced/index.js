let myKey = "b8110a634f093cf08425647119b08198";
// let cityValue = document.getElementById("city")
// let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue.value}&units=metric&APPID=${myKey}`
let searchBTN = document.getElementById("searchBTN");
let results = document.getElementById("results");



function apiCall(apiURL){
    let promise = fetch(apiURL);
    console.log(promise);
    promise
        .then(function(response){
            // console.log(response);
            return response.text();
        })
        .then(function(result){
            // console.log(result);
            let parsedResult = JSON.parse(result);
            console.log(parsedResult);
            printHome(parsedResult, results)
        })
        .catch(function(error){
            console.log(error)
        })
}

function printHome(data, element){
    let temperatures = findTemperature(data);
    console.log(temperatures);
    element.innerHTML = " "
    element.innerHTML += `<h1>${data.city.name}</h1><br/>
        <h3>Temperature ${data.list[0].main.temp}</h3>
        <h3>Feels Like ${data.list[0].main.feels_like}</h3>
        <h3>Highest Temperature ${temperatures.highestTemp.main.temp}</h3>
        <h3>Lowest Temperature ${temperatures.lowestTemp.main.temp}</h3>
        <h3>Highest Humidity ${temperatures.highestHum.main.humidity}</h3>
        <h3>Lowest Humidity ${temperatures.lowestHum.main.humidity}</h3>

    `;
    
};
function findTemperature(data){
    let highestTemp = data.list[0];
    let lowestTemp = data.list[0];
    let lowestHum = data.list[0];
    let highestHum = data.list[0];
    for(let i = 0; i < data.list.length; i++){
        if(highestTemp.main.temp < data.list[i].main.temp){
            highestTemp = data.list[i];
        };
        if(lowestTemp.main.temp > data.list[i].main.temp){
            lowestTemp = data.list[i];
        };
        if(lowestHum.main.humidity > data.list[i].main.humidity){
            lowestHum = data.list[i];
        };
        if(highestHum.main.humidity < data.list[i].main.humidity){
            highestHum = data.list[i];
        }
    }
    return {
        highestTemp,
        lowestTemp,
        lowestHum,
        highestHum
    }
}
searchBTN.addEventListener("click", function(){
    let cityValue = document.getElementById("city").value
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&units=metric&APPID=${myKey}`
    apiCall(apiURL);
})