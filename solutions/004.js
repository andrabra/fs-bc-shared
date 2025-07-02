function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkItemStock(itemName) {
  const delay = getRandomInt(0.1, 0.6);
  const success = Math.random() > 0.2;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ item: itemName, status: "in_stock" });
      } else {
        reject(new Error(`Товар ${itemName} закончился`));
      }
    }, delay * 1000);
  });
}

function processPayment(orderInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ paymentId: `${orderInfo.length}-123`, status: "paid" });
    }, 1 * 1000);
  });
}

function createOrder(paymentInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ orderId: `${paymentInfo.paymentId}-123`, status: "created" });
    }, 0.5 * 1000);
  });
}

async function placeOrder(items) {
  try {
    const orderInfo = await Promise.all(
      items.map((item) => checkItemStock(item))
    );
    const paymentInfo = await processPayment(orderInfo);
    const orderId = await createOrder(paymentInfo);
    console.log("--- Заказ успешно оформлен! ---");
    console.table(orderInfo);
    console.table([paymentInfo]);
    console.table([orderId]);
    return orderId;
  } catch (error) {
    console.error(`Ошибка создания заказа: ${error.message}`);
  }
}

placeOrder(["item1", "item2", "item3"]);
