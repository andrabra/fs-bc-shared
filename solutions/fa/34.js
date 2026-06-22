function generateMenu(menuItems) {
  // Your code goes here..

  let htmlMenu = '';

  for (let menuItem of menuItems) {
    htmlMenu += `<a href='${menuItem.url}'>${menuItem.text}</a>`;
  }
  return htmlMenu;
}

const inputs = [
  {
    url: 'http://www.google.com',
    text: '10^100',
  },
  {
    url: '#codewars',
    text: 'codewars',
  },
  {
    url: '#q',
    text: 'query',
  },
  {
    url: '#a',
    text: 'ans',
  },
  {
    url: '#123',
    text: 123,
  },
  {
    url: 'https://192.162.0.1',
    text: 1,
  },
  {
    url: 'https://localhost?',
    text: 2,
  },
  {
    url: 'https://sub.domain.com?==-==',
    text: 3,
  },
  {
    url: 'https://sub.domain.com?q=\n blah*£&$( ¯\_(ツ)_/¯',
    text: '!@£%^&*()',
  },
  {
    url: 'https://sub.domain.com?q=hello',
    text: 5,
  },
  {
    url: 'localhost',
    text: 0x234,
  },
  {
    url: 'http://✪df.ws/123',
    text: 'adsfdf',
  },
  {
    url: 'http://➡.ws/䨹',
    text: 'extended',
  },
  {
    url: 'http://142.42.1.1:8080/',
    text: 'port',
  },
  {
    url: 'http://foo.com/(something)?after=parens',
    text: 'parns',
  },
  {
    url: 'http://☺.damowmow.com/',
    text: '☺',
  },
];

// console.log(generateMenu(inputs));

// https://www.codewars.com/kata/5761a717780f8950ce001473/train/javascript
function calculateAge(bornYear, targetYear) {
  if (bornYear === targetYear) {
    return 'You were born this very year!';
  }

  let diffYears = targetYear - bornYear;

  if (bornYear > targetYear) {
    diffYears = bornYear - targetYear;
    return `You will be born in ${diffYears} year${diffYears !== 1 ? 's' : ''}.`;
  }

  return `You are ${diffYears} year${diffYears !== 1 ? 's' : ''} old.`;
}

// console.log(calculateAge(2012, 2016));

// https://www.codewars.com/kata/5aee86c5783bb432cd000018
function hydrate(s) {
  const regex = new RegExp(/\d+/g);

  let counter = 0;

  counter = s
    .split(' ')
    .filter((strItem) => strItem.match(regex))
    .reduce((acc, item) => {
      return (acc += Number(item));
    }, 0);

  return `${counter} glass${counter !== 1 ? 'es' : ''} of water`;
}

console.log(hydrate('1 shot, 5 beers, 2 shots, 1 glass of wine, 1 beer'));
