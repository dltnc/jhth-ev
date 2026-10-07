import type { CollectionConfig } from 'payload'
import { adminOrEditor } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Required for accessibility (WCAG 2.1 AA). Describe the image in one line.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
  upload: {
    // Responsive srcset sizes, per PRD §6.1. Sharp converts to WebP.
    staticDir: 'public/media',
    formatOptions: {
      format: 'webp',
      options: { quality: 78 },
    },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'wide', width: 1280, height: undefined },
      { name: 'hero', width: 1920, height: undefined },
    ],
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
}
