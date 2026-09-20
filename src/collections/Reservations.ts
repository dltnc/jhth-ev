import type { CollectionConfig } from 'payload'
import { adminOrSales, anyone } from '../access/roles'

const leadReadAccess = {
  read: adminOrSales,
  update: adminOrSales,
  delete: adminOrSales,
  readVersions: adminOrSales,
}

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  access: {
    ...leadReadAccess,
    create: anyone,
    admin: ({ req }) => Boolean(adminOrSales({ req })),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'model', 'status', 'createdAt'],
    group: 'Leads',
    description: 'Reserve / pre-order interest submitted from the website (no live payment in Phase 1).',
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'BD mobile number, e.g. +880 1XXXXXXXXX',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'bikes',
      required: true,
    },
    {
      name: 'variant',
      type: 'text',
      label: 'Variant / color of interest',
      localized: true,
    },
    {
      name: 'depositInterest',
      type: 'checkbox',
      label: 'Interested in paying a deposit',
      defaultValue: false,
    },
    {
      name: 'depositPaid',
      type: 'checkbox',
      label: 'Deposit paid (Phase 2)',
      defaultValue: false,
      access: {
        create: () => false,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Converted', value: 'converted' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
