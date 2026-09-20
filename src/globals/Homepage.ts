import type { GlobalConfig } from 'payload'

import { adminOrEditor } from '../access/roles'

/**
 * Every editable surface on the home page. Each field is optional: the frontend
 * falls back to the translated copy in `src/i18n/dictionaries.ts` when a value
 * is empty, so the site still renders correctly before the global is filled in.
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
    update: adminOrEditor,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'slides',
              type: 'array',
              admin: {
                description:
                  'Rotating full-bleed slides. Leave empty to use the built-in copy and the featured models’ own photography.',
              },
              labels: { plural: 'Slides', singular: 'Slide' },
              maxRows: 5,
              fields: [
                {
                  name: 'title',
                  type: 'textarea',
                  localized: true,
                  required: true,
                  admin: { description: 'Line breaks are preserved.' },
                },
                { name: 'subtitle', type: 'textarea', localized: true },
                {
                  name: 'badge',
                  type: 'text',
                  localized: true,
                  admin: { description: 'Small pill above the title, e.g. “New 2026 line”.' },
                },
                { name: 'image', type: 'upload', relationTo: 'media' },
                {
                  name: 'bike',
                  type: 'relationship',
                  relationTo: 'bikes',
                  admin: {
                    description:
                      'Optional. Points the slide’s primary button at this model and borrows its hero image when none is set above.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Counters',
          fields: [
            {
              name: 'stats',
              type: 'array',
              admin: {
                description:
                  'Green band under the hero. Leave empty to count models and dealerships automatically.',
              },
              labels: { plural: 'Counters', singular: 'Counter' },
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', localized: true, required: true },
                { name: 'label', type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
        {
          label: 'Product range',
          fields: [
            { name: 'rangeEyebrow', type: 'text', localized: true },
            { name: 'rangeHeading', type: 'text', localized: true },
            {
              name: 'rangeBikes',
              type: 'relationship',
              hasMany: true,
              relationTo: 'bikes',
              admin: {
                description:
                  'Hand-pick the models shown on the home page. Leave empty to show the featured models.',
              },
            },
          ],
        },
        {
          label: 'App banner',
          fields: [
            { name: 'appEyebrow', type: 'text', localized: true },
            { name: 'appHeading', type: 'text', localized: true },
            { name: 'appBody', type: 'textarea', localized: true },
            {
              name: 'appPoints',
              type: 'array',
              labels: { plural: 'Bullet points', singular: 'Bullet point' },
              maxRows: 6,
              fields: [{ name: 'text', type: 'text', localized: true, required: true }],
            },
            {
              name: 'appImage',
              type: 'upload',
              relationTo: 'media',
              label: 'App preview image',
              admin: {
                description: 'Shown on the right of the banner. Falls back to the built-in app mockup when empty.',
              },
            },
            { name: 'appStoreUrl', type: 'text', label: 'App Store URL' },
            {
              name: 'appStoreLabel',
              type: 'text',
              localized: true,
              label: 'App Store button text',
            },
            { name: 'playStoreUrl', type: 'text', label: 'Google Play URL' },
            {
              name: 'playStoreLabel',
              type: 'text',
              localized: true,
              label: 'Google Play button text',
            },
          ],
        },
        {
          label: 'Mission',
          fields: [
            { name: 'missionEyebrow', type: 'text', localized: true },
            { name: 'missionHeading', type: 'text', localized: true },
            { name: 'missionBody', type: 'textarea', localized: true },
            { name: 'missionImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Why us',
          fields: [
            { name: 'featuresEyebrow', type: 'text', localized: true },
            { name: 'featuresHeading', type: 'text', localized: true },
            {
              name: 'features',
              type: 'array',
              labels: { plural: 'Pillars', singular: 'Pillar' },
              maxRows: 8,
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: { description: 'A single emoji, e.g. 🔋' },
                },
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'body', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Closing CTA',
          fields: [
            { name: 'ctaHeading', type: 'text', localized: true },
            { name: 'ctaBody', type: 'textarea', localized: true },
            { name: 'ctaLabel', type: 'text', localized: true },
            {
              name: 'ctaUrl',
              type: 'text',
              admin: {
                description: 'Site-relative, e.g. /test-ride — the locale is added for you.',
              },
            },
          ],
        },
      ],
    },
  ],
}
