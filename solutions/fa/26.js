// 2694. Event Emitter
// https://leetcode.com/problems/event-emitter/
// 30 Days of JavaScript — после Execute Asynchronous Functions in Parallel
//
// Реализовать класс EventEmitter — упрощённый аналог Node.js EventEmitter / DOM EventTarget.
// Подписка на события по имени (строка) и вызов всех подписчиков при emit.
//
// Методы:
//
// subscribe(eventName, callback)
//   • Запомнить callback для eventName.
//   • На одно событие — несколько подписчиков; порядок вызова = порядок подписки.
//   • Вернуть объект { unsubscribe } — по вызову unsubscribe() этот callback удаляется,
//     возвращается undefined.
//   • Гарантируется: один и тот же callback не подписывают дважды (по ссылке).
//
// emit(eventName, args?)
//   • args — необязательный массив аргументов для callback (по умолчанию []).
//   • Вызвать все подписанные callback для eventName в порядке подписки.
//   • Вернуть массив результатов вызовов (что вернул каждый callback).
//   • Если подписчиков нет — вернуть [].
//
// Связь с вашими задачами:
//   • 20.js CartManager — класс + внутреннее хранилище;
//   • 19.js mostFrequent / join — Map или объект «ключ → список»;
//   • 11.js debounce — работа с функциями-колбэками;
//   • promiseAll — параллельный запуск; здесь — последовательный вызов списка функций.
//
// Подсказки уровня структуры:
//   1. В конструкторе — хранилище: имя события → массив callback'ов.
//   2. subscribe: если массива для eventName ещё нет — создать; push(callback);
//      вернуть { unsubscribe: () => убрать этот callback из массива }.
//   3. emit: взять массив callback'ов; для каждого вызвать с аргументами из args;
//      собрать return-значения в новый массив и вернуть.
//   4. Удаление из массива: filter (оставить все, кроме этого callback) или splice.

class EventEmitter {
  constructor() {
    this.eMap = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (this.eMap.has(eventName)) {
      const value = this.eMap.get(eventName);
      value.push(callback);
      this.eMap.set(eventName, value);
    } else {
      const value = [];
      value.push(callback);
      this.eMap.set(eventName, value);
    }

    const cb = callback;
    const en = eventName;

    return {
      unsubscribe: () => {
        const cbArr = this.eMap.get(eventName);
        this.eMap.set(
          eventName,
          cbArr.filter((item) => item !== cb),
        );
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    if (!this.eMap.has(eventName)) {
      return [];
    }

    return this.eMap.get(eventName).map((cb) => cb(...args));
  }
}

// --- локальные тесты ---

function assertEqual(label, got, expected) {
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', JSON.stringify(got));
    console.log('  expected:', JSON.stringify(expected));
  }
}

function runTests() {
  const emitter = new EventEmitter();

  assertEqual('ex1 no listeners', emitter.emit('firstEvent'), []);

  const sub = emitter.subscribe('firstEvent', function cb1() {
    return 'some string';
  });
  emitter.subscribe('firstEvent', function cb2() {
    return 5;
  });

  assertEqual('ex2 two listeners', emitter.emit('firstEvent'), [
    'some string',
    5,
  ]);

  assertEqual('ex3 unsubscribe return', sub.unsubscribe(), undefined);
  assertEqual('ex4 after unsubscribe', emitter.emit('firstEvent'), [5]);

  const emitter2 = new EventEmitter();
  emitter2.subscribe('onClick', function clickHandler(...args) {
    return args[1];
  });
  assertEqual('ex5 emit with args', emitter2.emit('onClick', [1, 2, 3]), [2]);

  const emitter3 = new EventEmitter();
  emitter3.subscribe('join', (...args) => args.join(','));
  assertEqual('ex6 spread args', emitter3.emit('join', ['a', 'b', 'c']), [
    'a,b,c',
  ]);
}

// Раскомментируйте после реализации:
runTests();
