// Реализуйте функцию normalizeUsers, которая
// принимает массив пользователей и возвращает очищенный список.
// Нужно:
// убрать пользователей без валидного email;
// привести email к lowercase и убрать пробелы по краям;
// удалить дубли по email;
// если встретились дубли, оставить первого пользователя;
// вернуть новый массив, не мутируя исходный.

// нет решения

function normalizeUsers(users) {
  if (!users.length) return [];

  const usedEmails = new Set();
  const res = [];

  for (const user of users) {
    const formattedEmail = user.email.trim().toLowerCase();

    usedEmails.add(formattedEmail);
  }

  for (const user of users) {
    if (!user.email) continue;

    const formattedEmail = user.email.trim().toLowerCase();

    if (usedEmails.has(formattedEmail)) {
      res.push(user);
    }
  }

  return res;
}

const users = [
  { id: 1, name: 'Alex', email: ' Alex@mail.com ', isActive: true },
  { id: 2, name: 'Ivan', email: 'alex@mail.com', isActive: false },
  { id: 3, name: 'Kate', email: 'KATE@mail.com', isActive: true },
  { id: 4, name: 'No Email', email: '', isActive: true },
  { id: 5, name: 'Null Email', email: null, isActive: false },
];

console.log(normalizeUsers(users));
// Ожидаемый результат:
// [
//   { id: 1, name: "Alex", email: "alex@mail.com", isActive: true },
//   { id: 3, name: "Kate", email: "kate@mail.com", isActive: true }
// ]

// console.log(normalizeUsers([]));
// Ожидаемый результат: []

console.log(
  normalizeUsers([
    { id: 1, name: 'A', email: 'TEST@mail.com', isActive: true },
    { id: 2, name: 'B', email: ' test@mail.com ', isActive: false },
  ]),
);
// Ожидаемый результат:
// [{ id: 1, name: "A", email: "test@mail.com", isActive: true }]
