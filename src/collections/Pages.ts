import type { Block, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { adminOrEditor, publishedOrStaff } from '../access/roles'
import { previewUrl } from '../lib/preview'

export const pageBlocks: Block[] = [
  {
    slug: 'hero',
    fields: [
      {
        name: 'heading',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'subheading',
        type: 'text',
        localized: true,
      },
      {
        name: 'backgroundImage',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'cta',
        type: 'group',
        fields: [
          {
            name: 'label',
            type: 'text',
            localized: true,
          },
          {
            name: 'url',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    slug: 'richText',
    fields: [
      {
        name: 'content',
        type: 'richText',
        localized: true,
      },
    ],
  },
  {
    slug: 'featureGrid',
    fields: [
      {
        name: 'heading',
        type: 'text',
        localized: true,
      },
      {
        name: 'features',
        type: 'array',
        fields: [
          {
            name: 'icon',
            type: 'select',
            options: ['battery', 'range', 'speed', 'chargeTime', 'eco', 'cost', 'service', 'warranty'],
          },
          {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
          },
          {
            name: 'description',
            type: 'textarea',
            localized: true,
          },
        ],
      },
    ],
  },
  {
    slug: 'gallery',
    fields: [
      {
        name: 'images',
        type: 'array',
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
          {
            name: 'caption',
            type: 'text',
            localized: true,
          },
        ],
      },
    ],
  },
  {
    slug: 'cta',
    fields: [
      {
        name: 'heading',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'text',
        type: 'textarea',
        localized: true,
      },
      {
        name: 'buttons',
        type: 'array',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
          },
          {
            name: 'url',
            type: 'text',
            required: true,
          },
          {
            name: 'style',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'specTable',
    fields: [
      {
        name: 'heading',
        type: 'text',
        localized: true,
      },
      {
        name: 'rows',
        type: 'array',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            localized: true,
          },
          {
            name: 'value',
            type: 'text',
            required: true,
            localized: true,
          },
        ],
      },
    ],
  },
  {
    slug: 'testimonialsSection',
    fields: [
      {
        name: 'heading',
        type: 'text',
        localized: true,
      },
    ],
  },
  {
    slug: 'faqSection',
    fields: [
      {
        name: 'heading',
        type: 'text',
        localized: true,
      },
      {
        name: 'category',
        type: 'select',
        options: [
          { label: 'All', value: 'all' },
          { label: 'General', value: 'general' },
          { label: 'Battery & Charging', value: 'battery' },
          { label: 'Warranty & Service', value: 'warranty' },
          { label: 'Buying & EMI', value: 'buying' },
          { label: 'Riding & Safety', value: 'riding' },
        ],
      },
    ],
  },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
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
    defaultColumns: ['title', 'slug', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data, locale }) => previewUrl(`/${locale?.code ?? 'en'}/${String(data.slug ?? '')}`),
    },
    preview: (doc, { locale }) => previewUrl(`/${locale ?? 'en'}/${String(doc.slug ?? '')}`),
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
      name: 'blocks',
      type: 'blocks',
      blocks: pageBlocks,
      localized: true,
    },
    {
      type: 'collapsible',
      label: 'Meta',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
