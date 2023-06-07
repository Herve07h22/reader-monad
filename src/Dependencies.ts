import { Product } from "./Product";

export interface Dependencies {
  logger: ILogger;
  catalog: ICatalog;
}

export interface ILogger {
  log: (message: string) => void;
}

export interface ICatalog {
  getProducts: () => Product[];
}
