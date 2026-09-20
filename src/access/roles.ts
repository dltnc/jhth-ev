import type { Access } from 'payload'

export type Role = 'admin' | 'editor' | 'sales'

type UserLike = null | undefined | { roles?: (Role | string)[] | null }

/** True when the user holds at least one of the given roles. */
export const checkRole = (user: UserLike, ...roles: Role[]): boolean => {
  if (!user) return false
  return user.roles?.some((role) => roles.includes(role as Role)) ?? false
}

export const adminOnly: Access = ({ req }) => checkRole(req.user, 'admin')

export const adminOrEditor: Access = ({ req }) => checkRole(req.user, 'admin', 'editor')

export const adminOrSales: Access = ({ req }) => checkRole(req.user, 'admin', 'sales')

export const adminEditorOrSales: Access = ({ req }) =>
  checkRole(req.user, 'admin', 'editor', 'sales')

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

/**
 * Published documents are public; drafts are only visible to signed-in staff.
 * Used on every draft-enabled collection so unpublished content never leaks.
 */
export const publishedOrStaff: Access = ({ req }) => {
  if (checkRole(req.user, 'admin', 'editor')) return true

  return {
    _status: { equals: 'published' },
  }
}
