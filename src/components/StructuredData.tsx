type Props = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * JSON-LD block (PRD §6.4). `<` is escaped so a value containing `</script>`
 * cannot break out of the tag.
 */
export const StructuredData = ({ data }: Props) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    type="application/ld+json"
  />
)
