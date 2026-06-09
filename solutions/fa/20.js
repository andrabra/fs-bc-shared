/*
Задача: Cart Manager

Нужно реализовать класс CartManager для управления корзиной товаров.

Товар имеет структуру:
{
  id: number,
  title: string,
  price: number
}

Элемент корзины должен хранить:
{
  id: number,
  title: string,
  price: number,
  quantity: number
}

Требования:
1. addItem(product, quantity)
   - добавляет товар в корзину
   - если товар уже есть, увеличивает quantity

2. removeItem(productId)
   - полностью удаляет товар из корзины

3. getItems()
   - возвращает список товаров в корзине

4. getTotal()
   - возвращает итоговую стоимость корзины

5. clear()
   - очищает корзину

Важно:
- quantity не может быть меньше 1
- price должен учитываться при расчёте total
- исходный объект product мутировать нельзя
*/

class CartManager {
  constructor() {
    // TODO: создать хранилище корзины
  }
}

const cart = new CartManager();

const iphone = { id: 1, title: "iPhone", price: 1000 };
const caseProduct = { id: 2, title: "Case", price: 50 };

cart.addItem(iphone);
cart.addItem(caseProduct, 2);
cart.addItem(iphone, 3);

console.log(cart.getItems());
// [
//   { id: 1, title: "iPhone", price: 1000, quantity: 4 },
//   { id: 2, title: "Case", price: 50, quantity: 2 }
// ]

console.log(cart.getTotal());
// 4100

console.log(cart.getItems());
// [
//   { id: 1, title: "iPhone", price: 1000, quantity: 1 },
//   { id: 2, title: "Case", price: 50, quantity: 1 }
// ]

cart.removeItem(2);

console.log(cart.getItems());
// [
//   { id: 1, title: "iPhone", price: 1000, quantity: 1 }
// ]

cart.clear();

console.log(cart.getItems());
// []

console.log(cart.getTotal());
// 0