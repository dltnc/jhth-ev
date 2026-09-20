import type { Post } from '../payload-types'

/**
 * Lexical editor state, as the generated types describe it. Building the JSON by
 * hand keeps the seed free of an editor dependency; every node below matches the
 * shape `@payloadcms/richtext-lexical` writes for the default feature set.
 */
export type RichText = Post['content']

type LexicalNode = RichText['root']['children'][number]

const textNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  type: 'text',
  version: 1,
})

const root = (children: LexicalNode[]): RichText => ({
  root: {
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

export const paragraphNode = (text: string): LexicalNode => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  type: 'paragraph',
  version: 1,
})

export const headingNode = (text: string, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2'): LexicalNode => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  type: 'heading',
  version: 1,
})

export const listNode = (
  items: string[],
  listType: 'bullet' | 'number' = 'bullet',
): LexicalNode => ({
  children: items.map((item, index) => ({
    children: [textNode(item)],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'listitem',
    value: index + 1,
    version: 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType,
  start: 1,
  tag: listType === 'number' ? 'ol' : 'ul',
  type: 'list',
  version: 1,
})

export const quoteNode = (text: string): LexicalNode => ({
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'quote',
  version: 1,
})

/** Composes any number of nodes into one field value. */
export const richText = (...nodes: LexicalNode[]): RichText => root(nodes)

export const paragraph = (text: string): RichText => root([paragraphNode(text)])

export const heading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): RichText =>
  root([headingNode(text, tag)])
