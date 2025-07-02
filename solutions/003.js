function fetchVideoDetails(videoId) {
  const success = Math.random() > 0.1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          title: "Глубокое погружение в асинхронный JavaScript",
          description: "Изучаем промисы, async/await и обработку ошибок.",
        });
      } else {
        reject(new Error("Видео не найдено"));
      }
    }, 1 * 1000);
  });
}

function fetchComments(videoId) {
  const success = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          { user: "Алекс", text: "Отличное видео!" },
          { user: "Мария", text: "Очень полезно!" },
        ]);
      } else {
        reject(new Error("Не удалось загрузить комментарии"));
      }
    }, 1.5 * 1000);
  });
}

function fetchRelatedVideos(videoId) {
  const success = Math.random() > 0.05;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          { id: "vid123", title: "Что такое замыкания в JS?" },
          { id: "vid456", title: "Промисы и async/await" },
          { id: "vid222", title: "Паттерны проектирования для начинающих" },
        ]);
      } else {
        reject(new Error("Не удалось загрузить похожие видео"));
      }
    }, 2 * 1000);
  });
}

async function loadVideoPage(videoId) {
  try {
    const [videoDetails, comments, relatedVideos] = await Promise.all([
      fetchVideoDetails(videoId),
      fetchComments(videoId),
      fetchRelatedVideos(videoId),
    ]);
    console.log(`Заголовок: ${videoDetails.title}`);
    console.log(`Описание: ${videoDetails.description}`);
    console.log(
      `Комментарии: ${comments.map((c) => `${c.user}: ${c.text}`).join(", ")}`
    );
    console.log(
      `Похожие видео: ${relatedVideos.map((v) => v.title).join(", ")}`
    );
  } catch (error) {
    console.error("Ошибка при загрузке страницы видео:", error.message);
  }
}

// loadVideoPage('vid789');

// Promise.all позволяет параллельно выполнять несколько запросов и обрабатывать их результаты.
// Если один из промисов завершится с ошибкой, Promise.all вернет ошибку

// Обработка каждого запроса отдельно с использованием try/catch
// позволяет более гибко управлять ошибками и продолжать выполнение других запросов.
async function loadVideoPageWithErrorHandling(videoId) {
  try {
    const videoDetails = await fetchVideoDetails(videoId);
    console.log(`Заголовок: ${videoDetails.title}`);
    console.log(`Описание: ${videoDetails.description}`);
  } catch (error) {
    console.error("Ошибка при загрузке деталей видео:", error.message);
  }

  try {
    const comments = await fetchComments(videoId);
    console.log(
      `Комментарии: ${comments.map((c) => `${c.user}: ${c.text}`).join(", ")}`
    );
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error.message);
  }

  try {
    const relatedVideos = await fetchRelatedVideos(videoId);
    console.log(
      `Похожие видео: ${relatedVideos.map((v) => v.title).join(", ")}`
    );
  } catch (error) {
    console.error("Ошибка при загрузке похожих видео:", error.message);
  }
}

// loadVideoPageWithErrorHandling('videoId')

// Promise.allSettled позволяет обрабатывать результаты всех промисов,
// независимо от того, завершились ли они успешно или с ошибкой.
async function loadVideoPromiseAllSettled(videoId) {
  const results = await Promise.allSettled([
    fetchVideoDetails(videoId),
    fetchComments(videoId),
    fetchRelatedVideos(videoId),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Результат запроса ${index + 1}:`, result.value);
    } else {
      console.error(`Ошибка запроса ${index + 1}:`, result.reason.message);
    }
  });
}

loadVideoPromiseAllSettled("videoId");
