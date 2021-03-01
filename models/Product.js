export default class Product {
  constructor(id, usrId, productName, imgUrl, description, price) {
    (this.id = id),
      (this.usrId = usrId),
      (this.productName = productName),
      (this.imgUrl = imgUrl),
      (this.description = description),
      (this.price = price);
  }
}
