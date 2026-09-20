import type { CollectionConfig } from 'payload'
import { adminOrEditor, anyone } from '../access/roles'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: 'Content',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Battery & Charging', value: 'battery' },
        { label: 'Warranty & Service', value: 'warranty' },
        { label: 'Buying & EMI', value: 'buying' },
        { label: 'Riding & Safety', value: 'riding' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Sort order within category (ascending)',
      },
    },
  ],
}
