const fetchWeather = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ temp: 15, condition: "Облачно" });
    }, 1100);
  });
};

const fetchExchangeRate = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(91.5);
    }, 700);
  });
};

const fetchTopHeadline = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Ученые обнаружили новый способ изучения асинхронности!");
    }, 1400);
  });
};

const loadDashboardWidget = () => {
  Promise.all([fetchWeather(), fetchExchangeRate(), fetchTopHeadline()])
    .then((res) => {
      const [weatherData, exchangeRate, topHeadline] = res;
      console.log(
        `Температура: ${weatherData.temp},
         Осадки: ${weatherData.condition},
         Курс: ${exchangeRate},
         Главная новость ${topHeadline}`
      );
    })
    .catch((e) => {
      console.error(e);
    });
};

loadDashboardWidget();
