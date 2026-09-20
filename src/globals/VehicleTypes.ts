import type { Field, GlobalConfig } from 'payload'

import { adminOrEditor } from '../access/roles'

/** One landing page per vehicle family, matching the `Bikes.vehicleType` options. */
const familyFields = (label: string): Field[] => [
  {
    name: 'heading',
    type: 'text',
    localized: true,
    admin: { description: `Page title. Defaults to “${label}”.` },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    localized: true,
    admin: { description: 'One line under the title, over the hero photo.' },
  },
  {
    name: 'body',
    type: 'textarea',
    localized: true,
    admin: { description: 'Intro paragraph in the white band below the hero.' },
  },
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Leave empty to borrow the first model’s hero photo.' },
  },
]

/**
 * Copy and artwork for `/models/type/e-bikes`, `/e-scooters` and `/e-cycles`.
 * Empty fields fall back to the translated defaults in the dictionaries.
 */
export const VehicleTypes: GlobalConfig = {
  slug: 'vehicle-types',
  access: {
    read: () => true,
    update: adminOrEditor,
  },
  admin: {
    group: 'Settings',
  },
  label: 'Vehicle type pages',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'E-Cycles',
          fields: [{ name: 'ecycle', type: 'group', fields: familyFields('E-Cycle') }],
        },
        {
          label: 'E-Scooters',
          fields: [{ name: 'escooter', type: 'group', fields: familyFields('E-Scooter') }],
        },
        {
          label: 'E-Bikes',
          fields: [{ name: 'ebike', type: 'group', fields: familyFields('E-Bike') }],
        },
        {
          label: 'Shared',
          fields: [
            {
              name: 'featureStrip',
              type: 'array',
              admin: {
                description:
                  'Green strip shown at the foot of all three pages. Leave empty to reuse the home page pillars.',
              },
              labels: { plural: 'Badges', singular: 'Badge' },
              maxRows: 6,
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'A single emoji, e.g. 🔋' } },
                { name: 'title', type: 'text', localized: true, required: true },
              ],
            },
            {
              name: 'priceNote',
              type: 'text',
              localized: true,
              admin: { description: 'Small print beside the model count, e.g. ex-showroom city.' },
            },
          ],
        },
      ],
    },
  ],
}
