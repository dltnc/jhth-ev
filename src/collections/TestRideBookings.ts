import type { CollectionConfig } from 'payload'
import { adminOrSales, anyone } from '../access/roles'

const leadReadAccess = {
  read: adminOrSales,
  update: adminOrSales,
  delete: adminOrSales,
  readVersions: adminOrSales,
}

export const TestRideBookings: CollectionConfig = {
  slug: 'test-ride-bookings',
  access: {
    ...leadReadAccess,
    create: anyone,
    admin: ({ req }) => Boolean(adminOrSales({ req })),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'model', 'dealer', 'preferredDate', 'status', 'createdAt'],
    group: 'Leads',
    description: 'Test ride requests submitted from the website.',
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
      name: 'dealer',
      type: 'relationship',
      relationTo: 'dealers',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'preferredDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Completed', value: 'completed' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
