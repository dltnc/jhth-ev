import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOrEditor, publishedOrStaff } from '../access/roles'
import { previewUrl } from '../lib/preview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: publishedOrStaff,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishDate', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data, locale }) =>
        previewUrl(`/${locale?.code ?? 'en'}/blog/${String(data.slug ?? '')}`),
    },
    preview: (doc, { locale }) => previewUrl(`/${locale ?? 'en'}/blog/${String(doc.slug ?? '')}`),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({
      useAsSlug: 'title',
      localized: true,
    }),
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
  ],
}
