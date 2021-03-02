export default class CartItems {
  constructor(count, productName, price, sum) {
    (this.count = count),
      (this.productName = productName),
      (this.price = price);
    this.sum = sum;
  }
}
