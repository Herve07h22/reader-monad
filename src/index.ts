import { Dependencies } from "./Dependencies";
import { Price } from "./Product";
import { Result } from "./monads/Result";
import { Reader } from "./monads/Reader";
import { Catalog } from "./adapters/Catalog";
import { Logger } from "./adapters/Logger";

export const productionDependencies: Dependencies = {
  logger: new Logger(),
  catalog: new Catalog(),
};

const context = Reader.ask<Dependencies>();

// This function uses the injected logger and the catalog
// and returns a Reader monad.
export const findProductPrice = (props: { sku: string }) =>
  context.map((deps: Dependencies): Result<Price> => {
    const { logger, catalog } = deps;
    const { sku } = props;
    // We can use the injected deps here !
    const products = catalog.getProducts();
    logger.log(`${products.length} products in the catalog`);

    const product = products.find((p) => p.sku === sku);
    return product
      ? Result.of(product.price)
      : Result.error(`Product sku${sku} not found`);
  });

// This function does not use any dependency
export const discountPrice = (props: { rate: number }) =>
  context.map(
    (deps: Dependencies) =>
      (price: Result<Price>): Result<Price> =>
        price.map((p) => p * props.rate)
  );

const price = findProductPrice({ sku: "SKU0001" }).runWith(
  productionDependencies
);
const discountedPrice = discountPrice({ rate: 0.8 }).runWith(
  productionDependencies
)(price);

discountedPrice.print(); // 8

/* or */

const discountedPriceChained = findProductPrice({ sku: "SKU0001" })
  .then(discountPrice({ rate: 0.8 }))
  .runWith(productionDependencies);

discountedPriceChained.print(); // 8
