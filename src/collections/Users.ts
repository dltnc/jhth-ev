import type { CollectionConfig } from 'payload'
import { adminOnly, checkRole } from '../access/roles'

/**
 * Role-based CMS users, per PRD §5.10:
 * - admin  — Super Admin, full access
 * - editor — Marketing Editor, content only
 * - sales  — Sales/Leads Viewer, lead collections only
 */
export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Anyone signed in can read the user list (needed for author relationships),
    // but only admins may create, change roles, or delete accounts.
    admin: ({ req }) => Boolean(req.user),
    create: adminOnly,
    delete: adminOnly,
    read: ({ req }) => {
      if (!req.user) return false
      if (checkRole(req.user, 'admin')) return true
      // Everyone else can only read their own record.
      return { id: { equals: req.user.id } }
    },
    unlock: adminOnly,
    update: ({ req }) => {
      if (!req.user) return false
      if (checkRole(req.user, 'admin')) return true
      return { id: { equals: req.user.id } }
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Settings',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      // Roles live in the JWT so access control needs no extra DB lookup.
      saveToJWT: true,
      access: {
        // Only admins may grant or change roles — otherwise an editor could
        // promote themselves by PATCHing their own record.
        create: ({ req }) => checkRole(req.user, 'admin'),
        update: ({ req }) => checkRole(req.user, 'admin'),
      },
      options: [
        { label: 'Super Admin', value: 'admin' },
        { label: 'Marketing Editor', value: 'editor' },
        { label: 'Sales / Leads Viewer', value: 'sales' },
      ],
    },
  ],
}
