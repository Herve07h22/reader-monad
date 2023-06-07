import { findProductPrice, discountPrice, productionDependencies } from ".";
import { it, expect } from "vitest";

it("Display the discounted price", () => {
  const discountedPriceChained = findProductPrice({ sku: "SKU0001" })
    .then(discountPrice({ rate: 0.8 }))
    .runWith(productionDependencies);

  discountedPriceChained.print();
  expect(discountedPriceChained.value).toBe(8);
});
