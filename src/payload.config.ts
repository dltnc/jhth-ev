import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Bikes } from './collections/Bikes'
import { Categories } from './collections/Categories'
import { Dealers } from './collections/Dealers'
import { FAQs } from './collections/FAQs'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Reservations } from './collections/Reservations'
import { TestRideBookings } from './collections/TestRideBookings'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'
import { VehicleTypes } from './globals/VehicleTypes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 834, height: 1112 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
    meta: {
      titleSuffix: 'JHTH EV',
    },
  },
  collections: [
    Bikes,
    Categories,
    Pages,
    Posts,
    FAQs,
    Testimonials,
    Dealers,
    TestRideBookings,
    Reservations,
    Media,
    Users,
  ],
  globals: [SiteSettings, Homepage, VehicleTypes],
  // Bilingual site, per PRD §5.9 / §6.6. `fallback` means an empty Bangla
  // field renders the English value instead of a blank space.
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'bn', label: 'বাংলা' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  // Lock the API to this deployment's own origin rather than allowing `*`.
  cors: [serverURL],
  csrf: [serverURL],
  sharp,
  plugins: [
    /**
     * Media lives in Cloudflare R2 in production — Vercel's filesystem is ephemeral, so anything
     * written to disk would vanish on the next deploy. R2 exposes an S3-compatible API, so this
     * goes through the S3 adapter (payloadcms.com/docs/upload/storage-adapters#s3-r2); the
     * dedicated @payloadcms/storage-r2 package is for Cloudflare Workers only. Full setup:
     * docs/deployment.md.
     *
     * Without R2 env vars (local dev) the plugin disables itself and uploads stay on local disk.
     */
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          /**
           * Media read access is public (src/collections/Media.ts), so there is nothing for
           * Payload's file-proxy access control to protect — serve files straight from the R2
           * domain instead of streaming every image through a serverless function.
           */
          disablePayloadAccessControl: true,
          // Every object key starts with this "directory": provatalo/<file>.
          prefix: 'provatalo',
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename
            return `${process.env.R2_PUBLIC_URL}/${key}`
          },
        },
      },
      // Safe to coalesce: `enabled` above is false whenever this is missing, so the empty
      // string is never handed to the S3 client.
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto', // R2 rejects real AWS regions
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true, // R2 uses path-style bucket addressing
      },
    }),
  ],
})
