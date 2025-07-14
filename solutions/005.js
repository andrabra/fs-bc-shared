function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchAlbumDetails(albumId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({
          id: albumId,
          title: "Синтаксический Сахар",
          artist: "Нейросеть Нейронович",
          tracks: [
            "Асинхронная Баллада",
            "Цикл Бесконечности",
            "Баг в Матрице",
          ],
        });
      } else {
        reject(new Error(`Album ${albumId} не найден`));
      }
    }, 0.8 * 1000);
  });
}

function fetchRecommendations(engineId, albumId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        engine: engineId,
        similarAlbums: [
          `Похожий альбом от ${engineId} 1`,
          `Похожий альбом от ${engineId} 2`,
        ],
      });
    }, getRandomInt(0.5, 2) * 1000);
  });
}

function timeoutPromise(delay, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, delay);
  });
}

async function loadAlbumPage(albumId, recommendationEngines, totalTimeout) {
  try {
    const fastestRecommendationsPromise = Promise.race(
      recommendationEngines.map((engineId) =>
        fetchRecommendations(engineId, albumId)
      )
    );

    const dataFetchPromise = Promise.all([
      fetchAlbumDetails(albumId),
      fastestRecommendationsPromise, // Передаем промис!
    ])
      .then(([albumDetails, recommendations]) => {
        console.log("--- Страница альбома загружена ---");
        console.log(
          "Альбом:",
          albumDetails.title,
          "Исполнитель:",
          albumDetails.artist
        );
        console.log("Треки:", albumDetails.tracks);
        console.log(
          `Рекомендации (от ${recommendations.engine}):`,
          recommendations.similarAlbums
        );
      })
      .catch((error) => {
        console.error(error);
      });
    await Promise.race([
      dataFetchPromise,
      timeoutPromise(
        totalTimeout,
        `Страница альбома ${albumId} не загрузилась за ${totalTimeout} мс`
      ),
    ]);
  } catch (e) {
    console.log(e);
  }
}

loadAlbumPage(1, ["engine1", "engine2", "engine3"], 5000);
