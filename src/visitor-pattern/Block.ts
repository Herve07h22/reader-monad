const headerBlocType = {
  Header: "header",
  Paragraph: "paragraph",
  Image: "image",
} as const;

interface HeadBlockData {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface ParagraphBlockData {
  text: string;
}

interface ImageBlockData {
  url: string;
  caption: string;
}

export class HeaderBlock {
  type = headerBlocType.Header;
  constructor(public data: HeadBlockData) {}
}

export class ParagraphBlock {
  type = headerBlocType.Paragraph;
  constructor(public data: ParagraphBlockData) {}
}

export class ImageBlock {
  type = headerBlocType.Image;
  constructor(public data: ImageBlockData) {}
}

export type Block = HeaderBlock | ParagraphBlock | ImageBlock;
