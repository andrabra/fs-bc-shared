// Codewars 6 kyu — Stop it, HTML!
// https://www.codewars.com/kata/5a561ce6145c468f8b00005d/train/javascript
// После aclean / строковых задач
//
// Нужен свой «шаблонный язык»: функции-теги, которые возвращают HTML-строку.
//
// Сигнатура каждого тега:
//   tag(attributes, content?)
//
//   attributes — объект (может быть {}), пары ключ → значение для HTML-атрибутов.
//   content    — необязательный массив: строки и/или результаты других тегов.
//
// Теги:
//   html, head, title, body, script, link, div, span, img, br, hr
//
// Правила:
//   • Обычный тег: <tag attr="value">...внутренности...</tag>
//   • Атрибуты: key="value", через пробел (на Codewars — двойные кавычки).
//   • content: элементы массива склеить по порядку (join).
//   • Без content — пустое тело: <script ...></script>
//   • Самозакрывающиеся: link, img, br, hr → строго <tag ... /> (со пробелом перед /)
//   • loadMyTemplateLanguage() вызывается до тестов на Codewars — повесь функции
//     на global scope (в Node: globalThis.html = ..., и т.д.).
//
// Пример из условия:
//   html({}, [ head({}, [ title({}, ['Hello, world!']), ... ]), body({}, [...]) ])
//
// Связь с вашими задачами:
//   • 34.js generateMenu — склейка HTML из частей;
//   • aclean — работа со строками;
//   • фабрики / замыкания — один генератор на все теги вместо 11 копипаст.
//
// Подсказки уровня структуры:
//   1. Список void-тегов: link, img, br, hr.
//   2. Функция makeTag(name, isVoid): собрать строку атрибутов из Object.entries.
//   3. В loadMyTemplateLanguage — цикл по именам тегов, присвоить в globalThis.
//   4. content === undefined → ''; иначе content.join('').

/**
 * Регистрирует html, head, title, ... в глобальной области.
 * На Codewars вызывается автоматически перед assert.
 */

const tags = [
  ['html', false],
  ['head', false],
  ['title', false],
  ['body', false],
  ['script', false],
  ['link', true],
  ['div', false],
  ['span', false],
  ['br', true],
  ['hr', true],
  ['img', true],
];

function makeTag(tagName, isVoid = false) {
  return function (attrs = {}, content) {
    let attrsStr = '';
    let attrsArr = [];

    for (let [key, value] of Object.entries(attrs)) {
      attrsArr.push(`${key}="${value}"`);
    }

    if (attrsArr.length > 0) {
      attrsStr = attrsArr.join(' ');
    }

    const openTag = `<${tagName}${attrsStr.length > 0 ? ' ' : ''}${attrsStr}${isVoid ? ' /' : ''}>`;

    const contentPart = content !== undefined ? content.join('') : '';

    const closeTag = `${isVoid ? '' : `</${tagName}>`}`;

    return openTag + contentPart + closeTag;
  };
}

function loadMyTemplateLanguage() {
  for (const [name, isVoid] of tags) {
    globalThis[name] = makeTag(name, isVoid);
  }
}

// --- локальные тесты ---

function assertEqual(label, got, expected) {
  const ok = got === expected;
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', got);
    console.log('  expected:', expected);
  }
}

function assertAllTagsExist() {
  const names = [
    'html',
    'head',
    'title',
    'body',
    'script',
    'link',
    'div',
    'span',
    'img',
    'br',
    'hr',
  ];
  let ok = true;
  for (const name of names) {
    const exists = typeof globalThis[name] === 'function';
    console.log(`exist ${name}`, exists ? 'OK' : 'FAIL');
    if (!exists) ok = false;
  }
  return ok;
}

function runTests() {
  loadMyTemplateLanguage();

  const { html, head, title, body, script, link, div, span, br, hr, img } =
    globalThis;

  assertAllTagsExist();

  assertEqual('ex1 br void', br({}), '<br />');

  assertEqual(
    'ex2 div + br inside',
    div({}, ['a', br({}), 'b']),
    '<div>a<br />b</div>',
  );

  assertEqual(
    'ex3 link void',
    link({ rel: 'stylesheet', href: 'css/style.css' }),
    '<link rel="stylesheet" href="css/style.css" />',
  );

  assertEqual(
    'ex4 script empty body',
    script({ type: 'text/javascript', src: 'js/index.js' }),
    '<script type="text/javascript" src="js/index.js"></script>',
  );

  assertEqual(
    'ex5 title',
    title({}, ['Hello, world!']),
    '<title>Hello, world!</title>',
  );

  assertEqual(
    'ex6 mini page from kata',
    html({}, [
      head({}, [
        title({}, ['Hello, world!']),
        script({ type: 'text/javascript', src: 'js/index.js' }),
        link({ rel: 'stylesheet', href: 'css/style.css' }),
      ]),
      body({}, [
        div({ class: 'this-is-a-class', id: 'this-makes-me-unique' }, [
          'Hello, world!',
        ]),
      ]),
    ]),
    '<html><head><title>Hello, world!</title><script type="text/javascript" src="js/index.js"></script><link rel="stylesheet" href="css/style.css" /></head><body><div class="this-is-a-class" id="this-makes-me-unique">Hello, world!</div></body></html>',
  );

  assertEqual(
    'ex7 span + hr',
    span({ class: 'x' }, ['text', hr({})]),
    '<span class="x">text<hr /></span>',
  );

  assertEqual(
    'ex8 img void',
    img({ src: 'pic.png', alt: 'pic' }),
    '<img src="pic.png" alt="pic" />',
  );

  // Codewars — describe("Basic test") / it("sample tests")
  // https://github.com/codewars/codewars.com/issues/3168
  assertEqual(
    'ex9 codewars sample',
    html({}, [
      head({}, [
        title({}, ['Hello, world!']),
        script({
          type: 'text/javascript',
          src: 'js/index.js',
        }),
        link({
          rel: 'stylesheet',
          href: 'css/style.css',
        }),
      ]),
      body({}, ['Hello, world!']),
    ]),
    '<html><head><title>Hello, world!</title><script type="text/javascript" src="js/index.js"></script><link rel="stylesheet" href="css/style.css" /></head><body>Hello, world!</body></html>',
  );
}

// Раскомментируйте после реализации:
runTests();
