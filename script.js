const apiKey = 'fe21c3ed35281d0904acc45ed5966fc1';
    const weatherCards = document.getElementById('weatherCards');
    const cityInput = document.getElementById('cityInput');
    const addButton = document.getElementById('addButton');

    addButton.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city !== '') {
        fetchWeather(city);
        cityInput.value = '';
      }
    });

    async function fetchWeather(city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        createWeatherCard(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    function createWeatherCard(data) {
      const card = document.createElement('div');
    //   card.className = cards;
      card.classList.add('weather-card'); 

      // Get the weather icon URL
      const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      // Construct the card content using data from the API response
      card.innerHTML = `
      <div class="card-temp">
        <h2> ${Math.round( data.main.temp)}°</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" width="50">
      </div>
      <div class="card-temphigh">
        <div class="bottomcard">
          <div class="temphl">      
            <p>H:${Math.round(data.main.temp_max)}°</p>
            <p>L: ${Math.round(data.main.temp_min)}°</p>
          </div>
          <div class="country">
            <p>${data.name}, ${data.sys.country}</p>
          </div>
        </div>
        
        <div id="weather">
        <p> ${data.weather[0].main}</p>
        </div>
        
        </div>

      
      `;

      weatherCards.appendChild(card);
    }
