import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Single entry point for the Local API. `getPayload` memoises the instance
 * internally, so calling this per request is cheap.
 */
export const getPayloadClient = async () => getPayload({ config: configPromise })
