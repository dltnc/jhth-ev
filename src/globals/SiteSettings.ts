import type { GlobalConfig } from 'payload'
import { adminOrEditor } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
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
          label: 'Brand & Contact',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'VoltRide',
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp number (click-to-chat)',
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'address',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              labels: { singular: 'Nav link', plural: 'Nav links' },
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
              ],
            },
            {
              name: 'footerLinks',
              type: 'array',
              labels: { singular: 'Footer link', plural: 'Footer links' },
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
              ],
            },
            {
              name: 'socialLinks',
              type: 'array',
              labels: { singular: 'Social link', plural: 'Social links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: ['facebook', 'instagram', 'youtube', 'linkedin', 'tiktok', 'x'],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Dealer network',
          fields: [
            {
              name: 'dealerPage',
              type: 'group',
              label: 'Partner page copy',
              admin: {
                description:
                  'The /dealers page. Any field left empty falls back to the built-in translation.',
              },
              fields: [
                { name: 'eyebrow', type: 'text', localized: true },
                { name: 'heading', type: 'text', localized: true },
                { name: 'body', type: 'textarea', localized: true },
                { name: 'heroImage', type: 'upload', relationTo: 'media' },
                {
                  name: 'benefitsEyebrow',
                  type: 'text',
                  localized: true,
                },
                { name: 'benefitsHeading', type: 'text', localized: true },
                {
                  name: 'benefits',
                  type: 'array',
                  labels: { plural: 'Benefits', singular: 'Benefit' },
                  maxRows: 8,
                  fields: [
                    {
                      name: 'icon',
                      type: 'text',
                      admin: { description: 'A single emoji, e.g. 💰' },
                    },
                    { name: 'title', type: 'text', localized: true, required: true },
                    { name: 'body', type: 'textarea', localized: true },
                  ],
                },
              ],
            },
            {
              name: 'networkStats',
              type: 'group',
              label: 'Headline numbers',
              admin: {
                description:
                  'Shown in the green band on the dealer page. Centre and division counts are calculated from the Dealers collection.',
              },
              fields: [
                {
                  name: 'riders',
                  type: 'number',
                  admin: { description: 'Happy riders, e.g. 50000. Rendered as “50,000+”.' },
                  min: 0,
                },
                {
                  name: 'rating',
                  type: 'number',
                  admin: { description: 'Average rating out of 5, e.g. 4.8.' },
                  max: 5,
                  min: 0,
                },
              ],
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'defaultOGImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
