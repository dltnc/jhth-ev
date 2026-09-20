import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

type LexicalData = Parameters<typeof PayloadRichText>[0]['data']

type Props = {
  className?: string
  data: unknown
}

/**
 * Renders a lexical field. The generated types describe the editor state
 * loosely (`[k: string]: unknown`), so the cast happens once, here, instead of
 * at every call site.
 */
export const RichText = ({ className, data }: Props) => {
  if (!data || typeof data !== 'object') return null

  return (
    <div
      className={`prose-voltride max-w-none [&_a]:text-[var(--accent)] [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-5 [&_blockquote]:text-[var(--body)] [&_blockquote]:italic [&_h2]:mt-11 [&_h2]:mb-3.5 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-[30px] [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:mb-2.5 [&_h3]:font-[family-name:var(--font-display)] [&_h3]:text-[22px] [&_h3]:font-bold [&_li]:my-1.5 [&_li]:text-[15px] [&_li]:leading-[1.8] [&_li]:text-[var(--body)] [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:text-[var(--body)] [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 ${className ?? ''}`}
    >
      <PayloadRichText data={data as LexicalData} disableContainer />
    </div>
  )
}
