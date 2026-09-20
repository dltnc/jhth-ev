import type { CollectionConfig, TextField } from 'payload'
import { slugField } from 'payload'
import { adminOrEditor, publishedOrStaff } from '../access/roles'
import { previewUrl } from '../lib/preview'

export const Bikes: CollectionConfig = {
  slug: 'bikes',
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
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'vehicleType', 'basePrice', 'status', 'featured'],
    group: 'Catalog',
    livePreview: {
      url: ({ data, locale }) =>
        previewUrl(`/${locale?.code ?? 'en'}/models/${String(data.slug ?? '')}`),
    },
    preview: (doc, { locale }) =>
      previewUrl(`/${locale ?? 'en'}/models/${String(doc.slug ?? '')}`),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
            },
            slugField({
              useAsSlug: 'name',
              localized: true,
              overrides: (field) => {
                const slug = field.fields.find(
                  (f) => 'name' in f && f.name === 'slug',
                ) as TextField
                slug.admin = {
                  ...slug.admin,
                  description: 'Used in the URL, e.g. /models/velocity-x1',
                }
                return field
              },
            }),
            {
              name: 'tagline',
              type: 'text',
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Commuter', value: 'commuter' },
                { label: 'Sport', value: 'sport' },
                { label: 'Cargo', value: 'cargo' },
              ],
            },
            {
              name: 'vehicleType',
              type: 'select',
              required: true,
              options: [
                { label: 'E-Bike (motorcycle)', value: 'ebike' },
                { label: 'E-Scooter', value: 'escooter' },
                { label: 'E-Cycle (pedal assist)', value: 'ecycle' },
              ],
              defaultValue: 'ebike',
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'available',
              options: [
                { label: 'Available', value: 'available' },
                { label: 'Coming Soon', value: 'comingSoon' },
              ],
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Featured on homepage',
              defaultValue: false,
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Promo badge (e.g. Best Seller)',
              localized: true,
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Images' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional product video',
              },
            },
            {
              name: 'colorSwatches',
              type: 'array',
              labels: { singular: 'Color swatch', plural: 'Color swatches' },
              admin: {
                description: 'Paint color hex codes shown in the variant selector',
              },
              fields: [
                {
                  name: 'hex',
                  type: 'text',
                  required: true,
                  validate: (value: unknown) =>
                    typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
                      ? true
                      : 'Must be a valid hex color, e.g. #1a1a1a',
                },
              ],
            },
          ],
        },
        {
          label: 'Specs',
          fields: [
            {
              name: 'specs',
              type: 'array',
              required: true,
              labels: { singular: 'Spec', plural: 'Specs' },
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
            {
              name: 'range',
              type: 'text',
              label: 'Range per charge (quick spec, e.g. 95 km)',
            },
            {
              name: 'topSpeed',
              type: 'text',
              label: 'Top speed (quick spec, e.g. 95 kmph)',
            },
            {
              name: 'motor',
              type: 'text',
              label: 'Motor (quick spec, e.g. 5.1 kW BLDC)',
            },
            {
              name: 'battery',
              type: 'text',
              label: 'Battery (quick spec, e.g. 72V / 45Ah)',
            },
            {
              name: 'chargeTime',
              type: 'text',
              label: 'Charge time (quick spec, e.g. 4-5 hrs)',
            },
          ],
        },
        {
          label: 'Pricing & Variants',
          fields: [
            {
              name: 'basePrice',
              type: 'number',
              required: true,
              admin: {
                description: 'Starting price in BDT (৳)',
              },
            },
            {
              name: 'emiEligible',
              type: 'checkbox',
              label: 'Eligible for EMI / financing',
              defaultValue: true,
            },
            {
              name: 'variants',
              type: 'array',
              labels: { singular: 'Variant', plural: 'Variants' },
              fields: [
                {
                  name: 'colorName',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Price in BDT (৳)',
                  },
                },
                {
                  name: 'sku',
                  type: 'text',
                  unique: true,
                },
                {
                  name: 'inStock',
                  type: 'select',
                  required: true,
                  defaultValue: 'inStock',
                  options: [
                    { label: 'In Stock', value: 'inStock' },
                    { label: 'Pre-Order', value: 'preOrder' },
                    { label: 'Sold Out', value: 'soldOut' },
                  ],
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'specSheet',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Downloadable PDF spec sheet',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
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
        },
      ],
    },
  ],
}
