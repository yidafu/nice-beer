import { MarkdownPost } from "../MarkdownPost";

abstract class ContentGenerator {
  abstract generate(markdownPosts: MarkdownPost[]): void;
}

export {
  ContentGenerator
};
