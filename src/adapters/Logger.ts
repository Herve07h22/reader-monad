import { ILogger } from "../Dependencies";

export class Logger implements ILogger {
  log(message: string): void {
    console.log(`[Logger] ${message}`);
  }
}
