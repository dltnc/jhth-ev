import type { Payload } from 'payload'

/**
 * Demo photography, downloaded at seed time. Every frame is an Unsplash photo —
 * the same set the `plan/E-motorbike website design` prototype uses — so it is
 * licensed for demos only. Replace these with licensed product shots before
 * going to production.
 */

/** slug → media document id, so later seed steps can attach images. */
export type MediaMap = Record<string, string>

type MediaSource = {
  alt: { bn: string; en: string }
  caption?: { bn: string; en: string }
  key: string
  name: string
  url: string
}

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`

export const mediaSources: MediaSource[] = [
  {
    alt: {
      bn: 'সন্ধ্যার শহরের রাস্তায় দাঁড়িয়ে থাকা ক্যাফে-রেসার স্টাইলের ইলেকট্রিক মোটরসাইকেল',
      en: 'Café-racer style electric motorcycle parked on a city street at dusk',
    },
    key: 'bike-tc-max',
    name: 'tc-max-hero.jpg',
    url: unsplash('1504160820508-da86e9dc8a28', 1600, 900),
  },
  {
    alt: {
      bn: 'টিসি ম্যাক্সের ট্যাংক ও হ্যান্ডেলবারের নিকট-দৃশ্য',
      en: 'Close-up of the TC Max fuel-tank shroud and handlebars',
    },
    key: 'bike-tc-max-detail',
    name: 'tc-max-detail.jpg',
    url: unsplash('1623993308369-017255b87e2c', 1600, 900),
  },
  {
    alt: {
      bn: 'খোলা রাস্তায় প্রিমিয়াম ম্যাক্সি ইলেকট্রিক স্কুটার',
      en: 'Premium maxi electric scooter on an open road',
    },
    key: 'bike-cpx-pro',
    name: 'cpx-pro-hero.jpg',
    url: unsplash('1536006222476-a83275cfa5b8', 1600, 900),
  },
  {
    alt: {
      bn: 'শহরের ফুটপাতে পার্ক করা ইলেকট্রিক স্কুটার',
      en: 'Electric scooter parked on a city pavement',
    },
    key: 'bike-cpx-pro-detail',
    name: 'cpx-pro-detail.jpg',
    url: unsplash('1611956292173-c2445aa61709', 1600, 900),
  },
  {
    alt: {
      bn: 'শহুরে যাত্রার জন্য প্যাডেল-অ্যাসিস্ট ইলেকট্রিক সাইকেল',
      en: 'Pedal-assist electric city bicycle ready for a commute',
    },
    key: 'bike-electrus-pro',
    name: 'electrus-pro.jpg',
    url: unsplash('1672860356563-d1ce9b67bfb6', 1600, 900),
  },
  {
    alt: {
      bn: 'কমপ্যাক্ট ইলেকট্রিক সাইকেল, পাশ থেকে তোলা ছবি',
      en: 'Compact electric bicycle photographed from the side',
    },
    key: 'bike-skypher-pro',
    name: 'skypher-pro.jpg',
    url: unsplash('1564605776084-c13421c561b4', 1600, 900),
  },
  {
    alt: {
      bn: 'সরু গলিতে দাঁড়ানো ইলেকট্রিক সাইকেল',
      en: 'Electric bicycle standing in a narrow lane',
    },
    key: 'bike-flare-x',
    name: 'flare-x.jpg',
    url: unsplash('1624243519828-52a0f2c88af3', 1600, 900),
  },
  {
    alt: {
      bn: 'ডিস্ক ব্রেক ও ব্যাটারি প্যাক সহ ইলেকট্রিক সাইকেল',
      en: 'Electric bicycle with disc brakes and a frame-mounted battery pack',
    },
    key: 'bike-flare-x-pro',
    name: 'flare-x-pro.jpg',
    url: unsplash('1622598473264-81a98f1c7be5', 1600, 900),
  },
  {
    alt: {
      bn: 'মিড-ড্রাইভ মোটরসহ শক্তিশালী ইলেকট্রিক সাইকেল',
      en: 'Rugged electric bicycle with a mid-drive motor',
    },
    key: 'bike-momentum',
    name: 'momentum.jpg',
    url: unsplash('1636013607379-bff5b3cbeb01', 1600, 900),
  },
  {
    alt: {
      bn: 'ফুল সাসপেনশনের ইলেকট্রিক সাইকেল, দিগন্তের দিকে মুখ করা',
      en: 'Full-suspension electric bicycle facing an open horizon',
    },
    key: 'bike-horizon',
    name: 'horizon.jpg',
    url: unsplash('1626145790046-a282bc666b69', 1600, 900),
  },
  {
    alt: {
      bn: 'শহরের পথে ইলেকট্রিক মোটরসাইকেল — হোম পেজের প্রথম স্লাইড',
      en: 'Electric motorcycle on a city street — home page hero slide',
    },
    key: 'hero-urban',
    name: 'hero-urban-ride.jpg',
    url: unsplash('1504160820508-da86e9dc8a28', 1920, 1000),
  },
  {
    alt: {
      bn: 'ইলেকট্রিক মোটরসাইকেলের বিস্তারিত শট — হোম পেজের দ্বিতীয় স্লাইড',
      en: 'Detail shot of an electric motorcycle — home page hero slide',
    },
    key: 'hero-thrill',
    name: 'hero-engineered-for-thrill.jpg',
    url: unsplash('1623993308369-017255b87e2c', 1920, 1000),
  },
  {
    alt: {
      bn: 'খোলা রাস্তায় ইলেকট্রিক স্কুটার — হোম পেজের তৃতীয় স্লাইড',
      en: 'Electric scooter on an open road — home page hero slide',
    },
    key: 'hero-charge',
    name: 'hero-charge-ahead.jpg',
    url: unsplash('1536006222476-a83275cfa5b8', 1920, 1000),
  },
  {
    alt: {
      bn: 'ঢাকার অ্যাসেম্বলি লাইনে ইলেকট্রিক যানবাহন তৈরি হচ্ছে',
      en: 'Electric vehicles being assembled on a production line',
    },
    caption: {
      bn: 'আমাদের ঢাকার অ্যাসেম্বলি লাইন।',
      en: 'Our assembly line in Dhaka.',
    },
    key: 'mission-assembly',
    name: 'mission-assembly-dhaka.jpg',
    url: unsplash('1635822279175-67270a5bffcb', 1600, 1000),
  },
  {
    alt: {
      bn: 'ভোল্টরাইড ডিলার শোরুমের সামনের দৃশ্য',
      en: 'Frontage of a VoltRide dealer showroom',
    },
    key: 'dealer-network',
    name: 'dealer-network.jpg',
    url: unsplash('1611956292173-c2445aa61709', 1600, 800),
  },
  {
    alt: {
      bn: 'ই-সাইকেল রেঞ্জের হেডার ছবি',
      en: 'Header image for the e-cycle range',
    },
    key: 'type-ecycle',
    name: 'type-e-cycles.jpg',
    url: unsplash('1672860356563-d1ce9b67bfb6', 1600, 800),
  },
  {
    alt: {
      bn: 'ই-স্কুটার রেঞ্জের হেডার ছবি',
      en: 'Header image for the e-scooter range',
    },
    key: 'type-escooter',
    name: 'type-e-scooters.jpg',
    url: unsplash('1536006222476-a83275cfa5b8', 1600, 800),
  },
  {
    alt: {
      bn: 'ই-বাইক রেঞ্জের হেডার ছবি',
      en: 'Header image for the e-bike range',
    },
    key: 'type-ebike',
    name: 'type-e-bikes.jpg',
    url: unsplash('1623993308369-017255b87e2c', 1600, 800),
  },
  {
    alt: {
      bn: 'ভোল্টরাইড কর্মশালায় টেকনিশিয়ানদের কাজ',
      en: 'Technicians at work inside a VoltRide workshop',
    },
    key: 'page-about-hero',
    name: 'about-hero.jpg',
    url: unsplash('1635822279175-67270a5bffcb', 1600, 800),
  },
  {
    alt: {
      bn: 'শোরুমে সাজানো ইলেকট্রিক সাইকেলের সারি',
      en: 'A row of electric bicycles arranged in a showroom',
    },
    caption: { bn: 'শোরুম, রাজশাহী।', en: 'Showroom floor, Rajshahi.' },
    key: 'page-gallery-1',
    name: 'showroom-gallery-1.jpg',
    url: unsplash('1626145790046-a282bc666b69', 1200, 800),
  },
  {
    alt: {
      bn: 'গ্রাহককে ইলেকট্রিক সাইকেল দেখানো হচ্ছে',
      en: 'A customer being shown an electric bicycle',
    },
    caption: { bn: 'টেস্ট রাইড, খুলনা।', en: 'Test ride bay, Khulna.' },
    key: 'page-gallery-2',
    name: 'showroom-gallery-2.jpg',
    url: unsplash('1564605776084-c13421c561b4', 1200, 800),
  },
  {
    alt: {
      bn: 'সার্ভিস সেন্টারে ইলেকট্রিক সাইকেলের রক্ষণাবেক্ষণ',
      en: 'Servicing an electric bicycle at a service centre',
    },
    caption: { bn: 'সার্ভিস সেন্টার, চট্টগ্রাম।', en: 'Service centre, Chattogram.' },
    key: 'page-gallery-3',
    name: 'showroom-gallery-3.jpg',
    url: unsplash('1636013607379-bff5b3cbeb01', 1200, 800),
  },
  {
    alt: {
      bn: 'ইলেকট্রিক সাইকেলের ব্যাটারি প্যাক খোলা হচ্ছে',
      en: 'Removable battery pack being lifted out of an electric bicycle',
    },
    key: 'post-battery-care',
    name: 'blog-battery-care.jpg',
    url: unsplash('1622598473264-81a98f1c7be5', 1200, 630),
  },
  {
    alt: {
      bn: 'ঢাকার ব্যস্ত রাস্তায় ইলেকট্রিক সাইকেল আরোহী',
      en: 'Rider on an electric bicycle in busy city traffic',
    },
    key: 'post-dhaka-commute',
    name: 'blog-dhaka-commute.jpg',
    url: unsplash('1624243519828-52a0f2c88af3', 1200, 630),
  },
  {
    alt: {
      bn: 'নতুন ভোল্টরাইড সার্ভিস সেন্টারের উদ্বোধন',
      en: 'A newly opened VoltRide service centre',
    },
    key: 'post-service-network',
    name: 'blog-service-network.jpg',
    url: unsplash('1611956292173-c2445aa61709', 1200, 630),
  },
  {
    alt: {
      bn: 'শোরুমে ইএমআই নিয়ে আলোচনা করছেন ক্রেতা',
      en: 'A buyer discussing instalment options in a showroom',
    },
    key: 'post-emi-guide',
    name: 'blog-emi-guide.jpg',
    url: unsplash('1626145790046-a282bc666b69', 1200, 630),
  },
  {
    alt: {
      bn: 'বাড়ির সকেটে ইলেকট্রিক সাইকেলের ব্যাটারি চার্জ হচ্ছে',
      en: 'An electric bicycle battery charging from a household socket',
    },
    key: 'post-charging-tips',
    name: 'blog-charging-tips.jpg',
    url: unsplash('1672860356563-d1ce9b67bfb6', 1200, 630),
  },
  {
    alt: {
      bn: 'দীর্ঘ যাত্রার পথে ভোল্টরাইড রাইডার',
      en: 'A VoltRide rider on a long-distance route',
    },
    key: 'post-rider-story',
    name: 'blog-rider-story.jpg',
    url: unsplash('1564605776084-c13421c561b4', 1200, 630),
  },
  {
    alt: {
      bn: '২০২৬ লাইনআপ উন্মোচনের মঞ্চে ভোল্টরাইড',
      en: 'VoltRide unveiling its 2026 line-up',
    },
    key: 'post-launch-2026',
    name: 'blog-launch-2026.jpg',
    url: unsplash('1504160820508-da86e9dc8a28', 1200, 630),
  },
  {
    alt: {
      bn: 'ভোল্টরাইড ব্র্যান্ডের শেয়ারিং ছবি',
      en: 'VoltRide social sharing image',
    },
    key: 'og-default',
    name: 'og-default.jpg',
    url: unsplash('1623993308369-017255b87e2c', 1200, 630),
  },
]

const extensions: Record<string, string> = {
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

/** Unsplash honours `Accept`, so the served type may not match the `.jpg` stem. */
const fileName = (name: string, mimetype: string) =>
  `${name.replace(/\.[^.]+$/, '')}.${extensions[mimetype] ?? 'jpg'}`

const download = async (url: string) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(45_000) })
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`)

  const buffer = Buffer.from(await response.arrayBuffer())
  if (buffer.byteLength === 0) throw new Error('empty response body')

  const mimetype = response.headers.get('content-type')?.split(';')[0]?.trim() || 'image/jpeg'

  return { buffer, mimetype }
}

/**
 * Uploads every source above. A single failed download only costs that one
 * image: the rest of the seed carries on with whatever made it into the map.
 */
export const seedMedia = async (payload: Payload): Promise<MediaMap> => {
  const map: MediaMap = {}
  let failed = 0

  for (const source of mediaSources) {
    try {
      const { buffer, mimetype } = await download(source.url)

      const created = await payload.create({
        collection: 'media',
        data: { alt: source.alt.en, caption: source.caption?.en },
        file: {
          data: buffer,
          mimetype,
          name: fileName(source.name, mimetype),
          size: buffer.byteLength,
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'media',
        data: { alt: source.alt.bn, caption: source.caption?.bn },
        id: created.id,
        locale: 'bn',
      })

      map[source.key] = created.id
      console.log(`  media ${source.key}`)
    } catch (error) {
      failed += 1
      console.warn(`  media ${source.key} failed:`, error instanceof Error ? error.message : error)
    }
  }

  console.log(`  media: ${Object.keys(map).length} uploaded, ${failed} failed`)

  return map
}
