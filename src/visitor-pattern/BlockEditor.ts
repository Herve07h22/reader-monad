import { match, P } from "ts-pattern";
import { Block } from "./Block";

export class BlockEditor {
  blocks: Array<Block> = [];

  addBlock(block: Block) {
    this.blocks.push(block);
  }

  removeBlock(block: Block) {
    const index = this.blocks.indexOf(block);
    index !== -1 && this.blocks.splice(index, 1);
  }

  outputHtml() {
    return this.blocks.reduce((html, block) => html + renderToHtml(block), "");
  }
}

function renderToHtml(block: Block) {
  return match(block)
    .with(
      { type: "header", data: P.select() },
      ({ level, text }) => `<h${level}>${text}</h${level}>`
    )
    .with(
      { type: "paragraph", data: P.select() },
      ({ text }) => `<p>${text}</p>`
    )
    .with(
      { type: "image", data: P.select() },
      ({ url, caption }) => `<img src="${url}" alt="${caption}" />`
    )
    .exhaustive();
}
