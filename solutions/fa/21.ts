/*
Задача: Typed Store

Нужно реализовать функцию createStore<TState>(), которая создаёт мини-store.

Store должен иметь методы:

1. getState()
   - возвращает текущее состояние

2. setState(partialState)
   - обновляет состояние частично
   - принимает только поля из текущего состояния
   - значения должны соответствовать типам этих полей

3. subscribe(listener)
   - подписывает listener на изменения состояния
   - listener вызывается после каждого setState
   - listener получает новое состояние
   - subscribe должен вернуть функцию unsubscribe

Требования:
- store должен быть типизирован через generic
- нельзя передать в setState несуществующее поле
- нельзя передать значение неправильного типа
- состояние лучше обновлять иммутабельно
*/

interface IUserState {
  name: string;
  age: number;
  isAuth: boolean;
}

function createStore<TState extends object>(initialState: TState) {
  let state = initialState;
  const listeners = new Set<(args: TState) => void>();

  return {
    getState(): TState {
      return state;
    },

    setState(partialState: Partial<TState>): void {
      state = {
        ...state,
        ...partialState,
      };

      listeners.forEach((listener) => {
        listener(state);
      });
    },

    subscribe(listener: (args: TState) => void) {
      listeners.add(listener);

      return function unsubscribe() {
        listeners.delete(listener);
      };
    },
  };
}

const userStore = createStore({
  name: "Alex",
  age: 25,
  isAuth: false,
});

const unsubscribe = userStore.subscribe((state) => {
  console.log("State changed:", state);
});

console.log(userStore.getState());
// { name: "Alex", age: 25, isAuth: false }

userStore.setState({ name: "Bob" });
// State changed: { name: "Bob", age: 25, isAuth: false }

userStore.setState({ age: 30, isAuth: true });
// State changed: { name: "Bob", age: 30, isAuth: true }

unsubscribe();

userStore.setState({ name: "John" });
// listener уже не должен вызваться

console.log(userStore.getState());
// { name: "John", age: 30, isAuth: true }


const userStore = createStore<IUserState>({
  name: "Alex",
  age: 25,
  isAuth: false,
});

const unsubscribe = userStore.subscribe((state) => {
  console.log("State changed:", state);
});

console.log(userStore.getState());
// { name: "Alex", age: 25, isAuth: false }

userStore.setState({ name: "Bob" });
// State changed: { name: "Bob", age: 25, isAuth: false }

userStore.setState({ age: 30, isAuth: true });
// State changed: { name: "Bob", age: 30, isAuth: true }

unsubscribe();

userStore.setState({ name: "John" });
// listener уже не должен вызваться

console.log(userStore.getState());
// { name: "John", age: 30, isAuth: true }

// Эти вызовы должны давать ошибку TypeScript:

// userStore.setState({ unknownField: "test" });
// userStore.setState({ age: "30" });
// userStore.setState({ isAuth: "yes" });