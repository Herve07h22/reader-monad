import { it, expect } from "vitest";
import { BlockEditor } from "./BlockEditor";
import { HeaderBlock, ParagraphBlock, ImageBlock } from "./Block";

it("Generates a correct html output", () => {
  const blockEditor = new BlockEditor();

  blockEditor.addBlock(
    new HeaderBlock({
      text: "Hello Bytefer!",
      level: 1,
    })
  );

  blockEditor.addBlock(
    new ParagraphBlock({
      text: "Learn Visitor Pattern!",
    })
  );

  blockEditor.addBlock(
    new ImageBlock({
      url: "https://miro.medium.com/fit/c/176/176/1*krjVh9VFhDEcMUif4Ewt-A.png",
      caption: "bytefer-avatar",
    })
  );
  const html = blockEditor.outputHtml();
  expect(html).toBe(
    `<h1>Hello Bytefer!</h1><p>Learn Visitor Pattern!</p><img src="https://miro.medium.com/fit/c/176/176/1*krjVh9VFhDEcMUif4Ewt-A.png" alt="bytefer-avatar" />`
  );
});
