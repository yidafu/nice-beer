import { MarkdownPost } from "../MarkdownPost";

abstract class ContentGenerator {
  abstract generate(markdownPosts: MarkdownPost[]): string;
}

export {
  ContentGenerator
};
