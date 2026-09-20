import type { CollectionConfig } from 'payload'
import { adminOrEditor, anyone } from '../access/roles'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'modelPurchased'],
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'modelPurchased',
      type: 'relationship',
      relationTo: 'bikes',
    },
  ],
}
