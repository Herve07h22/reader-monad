import { ICatalog } from "../Dependencies";

export class Catalog implements ICatalog {
  getProducts() {
    return [
      { sku: "SKU0001", label: "Product 1", price: 10 },
      { sku: "SKU0002", label: "Product 2", price: 15 },
    ];
  }
}
