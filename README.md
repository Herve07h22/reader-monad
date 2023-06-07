# Dependencies injection with the Reader monad

Say you have some dependencies :

```
interface Dependencies {
  logger: ILogger;
  catalog: ICatalog;
}
```

And you want to use different sets of dependencies (test, production).

```
export const productionDependencies: Dependencies = {
  logger: new Logger(),
  catalog: new Catalog(),
};
```

The Reader Monad is a FP-way to inject the dependencies at the run time.

Let's write a use-case like this :
```
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
```

Lokk at the `context.map` call. It encapsulates the function in a Reader Monad.

Now we can delay the execution of the function, waiting for the dependencies to be build.

```
const price = findProductPrice({ sku: "SKU0001" }).runWith(productionDependencies);
```



