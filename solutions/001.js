function fetchUserInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Алекс Алгоритмов",
        bio: "Строю будущее, по одному циклу за раз.",
      });
    }, 1000);
  });
}

function fetchUserTweets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        "Коммичу в пятницу вечером. Что может пойти не так?",
        "Баг или фича? 🤔 #программирование",
        "Рефакторинг старого кода - это как археология.",
      ]);
    }, 1500);
  });
}

function fetchUserFollowers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(15000);
      } else {
        reject(new Error("Не удалось получить количество подписчиков"));
      }
    }, 500);
  });
}

function fetchUserLikes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(42);
    }, 1000);
  });
}

// Для зависимых запросов,
// если любой промис завершится с ошибкой, остальные промисы не будут выполняться
async function loadUserProfile() {
  try {
    const [userInfo, tweets, followers, likes] = await Promise.all([
      fetchUserInfo(),
      fetchUserTweets(),
      fetchUserFollowers(),
      fetchUserLikes(),
    ]);
    console.log(`Имя: ${userInfo.name}`);
    console.log(`Био: ${userInfo.bio}`);
    console.log(`Твиты: ${tweets.join(",")}`);
    console.log(`Подписчики: ${followers}`);
    console.log(`Лайки: ${likes}`);
    return { userInfo, tweets, followers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Для независимых запросов, если любой завершится ошибкой, это не сломает остальные
async function loadUserProfile2() {
  const userPromise = fetchUserInfo().catch(() => ({
    name: "Ошибка",
    bio: "",
  }));
  const tweetsPromise = fetchUserTweets().catch(() => []);
  const followersPromise = fetchUserFollowers().catch(() => 0);
  const likesPromise = fetchUserLikes().catch(() => 0);

  const [userInfo, tweets, followers, likes] = await Promise.all([
    userPromise,
    tweetsPromise,
    followersPromise,
    likesPromise,
  ]);
  console.log(`Имя: ${userInfo.name}`);
  console.log(`Био: ${userInfo.bio}`);
  console.log(`Твиты: ${tweets.join(",")}`);
  console.log(`Подписчики: ${followers}`);
  console.log(`Лайки: ${likes}`);
}

// loadUserProfile();
loadUserProfile2();
