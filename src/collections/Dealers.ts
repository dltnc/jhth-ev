import type { CollectionConfig } from 'payload'
import { adminOrEditor, anyone } from '../access/roles'

export const Dealers: CollectionConfig = {
  slug: 'dealers',
  access: {
    read: anyone,
    create: adminOrEditor,
    update: adminOrEditor,
    delete: adminOrEditor,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'division', 'district', 'phone', 'servicesOffered'],
    group: 'Network',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'division',
      type: 'select',
      required: true,
      options: [
        { label: 'Dhaka', value: 'dhaka' },
        { label: 'Chattogram', value: 'chattogram' },
        { label: 'Khulna', value: 'khulna' },
        { label: 'Rajshahi', value: 'rajshahi' },
        { label: 'Sylhet', value: 'sylhet' },
        { label: 'Barishal', value: 'barishal' },
        { label: 'Rangpur', value: 'rangpur' },
        { label: 'Mymensingh', value: 'mymensingh' },
      ],
    },
    {
      name: 'district',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'point',
      label: 'Map coordinates (lat/lng)',
      admin: {
        description: 'Stored as [longitude, latitude]',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Opening hours (e.g. 9:00 AM - 8:00 PM)',
      localized: true,
    },
    {
      name: 'servicesOffered',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['sales'],
      options: [
        { label: 'Sales', value: 'sales' },
        { label: 'Service', value: 'service' },
        { label: 'Charging Point', value: 'charging' },
      ],
    },
  ],
}
