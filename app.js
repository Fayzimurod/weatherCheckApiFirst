// // ; const apiKey = "8709f88f1a6cc4c7acf0d457106eb048"
// // const apiKey = "8709f88f1a6cc4c7acf0d457106eb048"; // OpenWeatherMap API kalitingizni bu yerga joylashtiring

// const apiKey = "d5a3a047d0ce2a989e9d8706938e3e52";
//    document.getElementById("searchBtn").addEventListener("click", () => {
//       const city = document.getElementById("cityInput").value;
//       if (city === "") return;

//       fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//       )
//          .then((response) => response.json())
//          .then((data) => {
//             document.getElementById(
//                "temperature"
//             ).innerText = `${Math.round(data.main.temp)}°C`;
//             document.getElementById("description").innerText =
//                data.weather[0].description;
//             document.getElementById(
//                "weatherIcon"
//             ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//          })
//          .catch((error) => {
//             console.error("Xatolik yuz berdi:", error);
//             alert("Shahar topilmadi!");
//          });
//    });













const apiKey = "d5a3a047d0ce2a989e9d8706938e3e52"; // Ваш текущий ключ

document.getElementById("searchBtn").addEventListener("click", getWeather);
document.getElementById("cityInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error:", error);
        alert("City not found! Please try again.");
        clearWeatherUI();
    }
}

function updateWeatherUI(data) {
    document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weatherIcon").alt = data.weather[0].description;
}

function clearWeatherUI() {
    document.getElementById("temperature").innerText = "";
    document.getElementById("description").innerText = "";
    document.getElementById("weatherIcon").src = "./image-card.png"; // Возвращаем дефолтное изображение
}