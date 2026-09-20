import type { Homepage, SiteSetting, VehicleType } from '../payload-types'
import type { MediaMap } from './media'

/**
 * Global copy for both locales. The English half mirrors the defaults in
 * `src/i18n/dictionaries.ts`, so what an editor sees in the admin is what the
 * built-in fallback would have rendered; the Bangla half mirrors `bn.*`. Seeding
 * both means every line on the home, dealer and vehicle-type pages is editable
 * without touching code.
 */

/** slug → bike document id, filled in by the seed before these are called. */
export type BikeMap = Record<string, string>

type Bilingual<T> = { bn: T; en: T }

/** The home page shows a hand-picked six, in this order. */
const homeRangeBikes = ['tc-max', 'cpx-pro', 'cpx-city', 'electrus-pro', 'momentum', 'skypher-pro']

/** Skips anything that failed to seed rather than writing a broken relationship. */
const pickBikes = (bikes: BikeMap, slugs: string[]) =>
  slugs.flatMap((slug) => {
    const id = bikes[slug]
    return id ? [id] : []
  })

export const siteSettingsData = (media: MediaMap): Bilingual<Partial<SiteSetting>> => ({
  bn: {
    address: 'লেভেল ১, আমিন কোর্ট, ৬২-৬৩ মতিঝিল বাণিজ্যিক এলাকা, ঢাকা ১০০০',
    dealerPage: {
      benefits: [
        {
          body: 'আপনার পুরো সেলস ও সার্ভিস টিমের জন্য প্রোডাক্ট ও টেকনিক্যাল ট্রেনিং।',
          icon: '📚',
          title: 'ট্রেনিং ও সহায়তা',
        },
        {
          body: 'প্রতিযোগিতামূলক ডিলার মার্জিন এবং ত্রৈমাসিক পারফরম্যান্স ইনসেনটিভ।',
          icon: '💰',
          title: 'আকর্ষণীয় মার্জিন',
        },
        {
          body: 'কো-ব্র্যান্ডেড ক্যাম্পেইন, ডিজিটাল অ্যাসেট ও ইন-স্টোর ডিসপ্লে সামগ্রী।',
          icon: '📣',
          title: 'মার্কেটিং সহায়তা',
        },
        {
          body: 'ডেডিকেটেড ফিল্ড সাপোর্ট, পার্টস সরবরাহ ও ওয়ারেন্টি ব্যবস্থাপনা।',
          icon: '🔧',
          title: 'বিক্রয়োত্তর সেবা',
        },
      ],
      benefitsEyebrow: 'ডিলার সুবিধা',
      benefitsHeading: 'কেন আমাদের সঙ্গী হবেন?',
      body: 'আটটি বিভাগ জুড়ে আমাদের নেটওয়ার্কে যোগ দিন এবং বাংলাদেশের দ্রুত বর্ধনশীল ইলেকট্রিক মোবিলিটি ব্র্যান্ডের প্রতিনিধিত্ব করুন।',
      eyebrow: 'আমাদের সঙ্গী হন',
      heading: 'ভোল্টরাইড ডিলার হয়ে উঠুন',
      heroImage: media['dealer-network'] ?? null,
    },
    defaultMetaDescription:
      'ভোল্টরাইডের ই-সাইকেল, ই-স্কুটার ও ই-বাইক — ঢাকায় অ্যাসেম্বল, আটটি বিভাগেই সার্ভিস ও চার্জিং সুবিধা।',
    defaultMetaTitle: 'ভোল্টরাইড — বাংলাদেশের জন্য প্রিমিয়াম ই-বাইক',
    defaultOGImage: media['og-default'] ?? null,
    email: 'hello@voltride.com.bd',
    footerLinks: [
      { label: 'আমাদের সম্পর্কে', url: '/about' },
      { label: 'যোগাযোগ', url: '/contact' },
      { label: 'ওয়ারেন্টি ও সার্ভিস', url: '/warranty' },
      { label: 'গোপনীয়তা নীতি', url: '/privacy-policy' },
      { label: 'টেস্ট রাইড', url: '/test-ride' },
      { label: 'ফাইন্যান্সিং', url: '/financing' },
    ],
    navLinks: [
      { label: 'মডেল', url: '/models' },
      { label: 'প্রযুক্তি', url: '/technology' },
      { label: 'ডিলার', url: '/dealers' },
      { label: 'ফাইন্যান্সিং', url: '/financing' },
      { label: 'ব্লগ', url: '/blog' },
      { label: 'সাধারণ জিজ্ঞাসা', url: '/faq' },
    ],
    networkStats: { rating: 4.8, riders: 50000 },
    phone: '+880 1711 456120',
    siteName: 'VoltRide',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/voltridebd' },
      { platform: 'instagram', url: 'https://instagram.com/voltridebd' },
      { platform: 'youtube', url: 'https://youtube.com/@voltridebd' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/voltride-bd' },
    ],
    tagline: 'বাংলাদেশের জন্য প্রিমিয়াম ই-বাইক',
    whatsapp: '+8801711456120',
  },
  en: {
    address: 'Level 1, Amin Court, 62-63 Motijheel C/A, Dhaka 1000',
    dealerPage: {
      benefits: [
        {
          body: 'Product and technical training for your entire sales and service team.',
          icon: '📚',
          title: 'Training and support',
        },
        {
          body: 'Competitive dealer margins with quarterly performance incentives.',
          icon: '💰',
          title: 'Attractive margins',
        },
        {
          body: 'Co-branded campaigns, digital assets and in-store display material.',
          icon: '📣',
          title: 'Marketing support',
        },
        {
          body: 'Dedicated field support, parts supply and warranty handling.',
          icon: '🔧',
          title: 'After-sales assistance',
        },
      ],
      benefitsEyebrow: 'Dealer benefits',
      benefitsHeading: 'Why partner with us?',
      body: 'Join our growing network across all eight divisions and represent one of the fastest-growing electric mobility brands in Bangladesh.',
      eyebrow: 'Partner with us',
      heading: 'Become a VoltRide dealer',
      heroImage: media['dealer-network'] ?? null,
    },
    defaultMetaDescription:
      'VoltRide e-cycles, e-scooters and e-bikes — assembled in Dhaka, with sales, service and charging in all eight divisions.',
    defaultMetaTitle: 'VoltRide — premium e-bikes for Bangladesh',
    defaultOGImage: media['og-default'] ?? null,
    email: 'hello@voltride.com.bd',
    footerLinks: [
      { label: 'About', url: '/about' },
      { label: 'Contact', url: '/contact' },
      { label: 'Warranty and service', url: '/warranty' },
      { label: 'Privacy policy', url: '/privacy-policy' },
      { label: 'Test ride', url: '/test-ride' },
      { label: 'Financing', url: '/financing' },
    ],
    navLinks: [
      { label: 'Models', url: '/models' },
      { label: 'Technology', url: '/technology' },
      { label: 'Dealers', url: '/dealers' },
      { label: 'Financing', url: '/financing' },
      { label: 'Blog', url: '/blog' },
      { label: 'FAQ', url: '/faq' },
    ],
    networkStats: { rating: 4.8, riders: 50000 },
    phone: '+880 1711 456120',
    siteName: 'VoltRide',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/voltridebd' },
      { platform: 'instagram', url: 'https://instagram.com/voltridebd' },
      { platform: 'youtube', url: 'https://youtube.com/@voltridebd' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/voltride-bd' },
    ],
    tagline: 'Premium e-bikes for Bangladesh',
    whatsapp: '+8801711456120',
  },
})

export const homepageData = (media: MediaMap, bikes: BikeMap): Bilingual<Partial<Homepage>> => ({
  bn: {
    appBody:
      'ভোল্টরাইড অ্যাপ দিয়ে ব্যাটারির অবস্থা দেখুন, সার্ভিস বুক করুন আর নিকটস্থ শোরুম খুঁজুন — সবই ফোন থেকে।',
    appEyebrow: 'স্মার্ট মোবিলিটি',
    appHeading: 'ট্র্যাক করুন, বুক করুন, স্মার্টভাবে চালান',
    appPoints: [
      { text: 'রিয়েল-টাইম ব্যাটারি ও রেঞ্জ মনিটরিং' },
      { text: 'সার্ভিস বুকিং ও রাইড হিস্ট্রি' },
      { text: 'নিকটস্থ সার্ভিস সেন্টার খুঁজুন' },
      { text: 'ওভার-দ্য-এয়ার ফার্মওয়্যার আপডেট' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/voltride/id6470000000',
    ctaBody: 'নিকটতম শোরুমে বিনামূল্যে টেস্ট রাইড বুক করুন — জাতীয় পরিচয়পত্র সঙ্গে আনলেই হবে।',
    ctaHeading: 'আজই চালিয়ে দেখুন',
    ctaLabel: 'টেস্ট রাইড বুক করুন',
    ctaUrl: '/test-ride',
    features: [
      {
        body: 'পারফরম্যান্স-ফার্স্ট চ্যাসিস, ধারালো কনট্যুর আর প্রিমিয়াম উপকরণে তৈরি স্পোর্টি লাইন।',
        icon: '⚡',
        title: 'মসৃণ ও সাহসী ডিজাইন',
      },
      {
        body: 'আইপি-রেটেড ইলেকট্রনিকস, ক্ষয়-প্রতিরোধী হার্ডওয়্যার এবং বাংলাদেশের রাস্তার জন্য তৈরি ফ্রেম ওয়ারেন্টি।',
        icon: '🛡️',
        title: 'দীর্ঘস্থায়ী নির্মাণ',
      },
      {
        body: 'খুলে নেওয়া যায় এমন ব্যাটারি প্যাক। ঘরে নিয়ে যান, সাধারণ সকেটেই চার্জ দিন।',
        icon: '🔋',
        title: 'ডিটাচেবল ব্যাটারি',
      },
      {
        body: 'পরিবেশবান্ধব উপকরণ, শূন্য টেইলপাইপ নির্গমন এবং পরিচ্ছন্ন উৎপাদনের প্রতিশ্রুতি।',
        icon: '🌱',
        title: 'টেকসই নির্মাণ',
      },
    ],
    featuresEyebrow: 'কেন ভোল্টরাইড',
    featuresHeading: 'চারটি স্তম্ভ',
    missionBody:
      'ভোল্টরাইডের লক্ষ্য বাংলাদেশের চলাচল বদলে দেওয়া — একটি করে শূন্য-নির্গমন রাইডের মাধ্যমে। ঢাকায় অ্যাসেম্বলি আর দেশজুড়ে সার্ভিস নেটওয়ার্ক নিয়ে আমরা বিশ্বমানের ইঞ্জিনিয়ারিংয়ের সঙ্গে আমাদের রাস্তার উপযোগী টেকসইত্ব মিলিয়েছি।',
    missionEyebrow: 'আমাদের লক্ষ্য',
    missionHeading: 'বাংলাদেশের ইলেকট্রিক যাত্রার শক্তি',
    missionImage: media['mission-assembly'] ?? null,
    playStoreUrl: 'https://play.google.com/store/apps/details?id=bd.com.voltride.app',
    rangeBikes: pickBikes(bikes, homeRangeBikes),
    rangeEyebrow: 'আমাদের লাইনআপ',
    rangeHeading: 'আমাদের প্রোডাক্ট রেঞ্জ দেখুন',
    slides: [
      {
        badge: 'নতুন ২০২৬ লাইনআপ',
        bike: bikes['tc-max'] ?? null,
        image: media['hero-urban'] ?? null,
        subtitle: 'শূন্য নির্গমন। সর্বোচ্চ পারফরম্যান্স। বাংলাদেশের চলাচলের ভবিষ্যৎ এখানেই।',
        title: 'শহরের পথে\nএগিয়ে চলুন',
      },
      {
        badge: 'সম্পাদকের পছন্দ',
        bike: bikes['cpx-pro'] ?? null,
        image: media['hero-thrill'] ?? null,
        subtitle: 'আপস ছাড়াই টেকসই পারফরম্যান্স — যাঁরা বেশি চান, তাঁদের জন্যই তৈরি।',
        title: 'রোমাঞ্চের জন্য গড়া।\nপৃথিবীর জন্য ভাবা।',
      },
      {
        badge: 'বাংলাদেশে অ্যাসেম্বল',
        bike: bikes['electrus-pro'] ?? null,
        image: media['hero-charge'] ?? null,
        subtitle: 'সেরা রেঞ্জ। স্মার্ট চার্জিং। আরও দূরে যান, দুশ্চিন্তা কম।',
        title: 'চার্জ দিয়ে ছুটুন।\nকিছুই পিছনে ফেলবেন না।',
      },
    ],
    stats: [
      { label: 'ভেহিকল মডেল', value: '১৪' },
      { label: 'বিভাগে উপস্থিতি', value: '৮' },
      { label: 'ডিলারশিপ', value: '১৬' },
      { label: 'সন্তুষ্ট রাইডার', value: '৫০,০০০+' },
    ],
  },
  en: {
    appBody:
      'The VoltRide app lets you monitor your battery, book service appointments and locate the nearest showroom — all from your phone.',
    appEyebrow: 'Smart mobility',
    appHeading: 'Track, book and ride smarter',
    appPoints: [
      { text: 'Real-time battery and range monitoring' },
      { text: 'Service booking and ride history' },
      { text: 'Find your nearest service centre' },
      { text: 'Over-the-air firmware updates' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/voltride/id6470000000',
    ctaBody: 'Book a free test ride at your nearest showroom — just bring your National ID.',
    ctaHeading: 'Ride one today',
    ctaLabel: 'Book a test ride',
    ctaUrl: '/test-ride',
    features: [
      {
        body: 'Performance-first chassis with sharp contours and sporty lines, built from premium-grade materials.',
        icon: '⚡',
        title: 'Sleek and bold design',
      },
      {
        body: 'IP-rated electronics, corrosion-resistant hardware and a frame warranty engineered for Bangladeshi roads.',
        icon: '🛡️',
        title: 'Built to last',
      },
      {
        body: 'Removable battery packs. Unplug, carry them indoors and charge from any standard socket.',
        icon: '🔋',
        title: 'Detachable battery',
      },
      {
        body: 'Eco-conscious materials, zero tailpipe emissions and a life-cycle commitment to cleaner manufacturing.',
        icon: '🌱',
        title: 'Sustainable build',
      },
    ],
    featuresEyebrow: 'Why VoltRide',
    featuresHeading: 'Four pillars of excellence',
    missionBody:
      'VoltRide exists to change the way Bangladesh moves — one zero-emission ride at a time. With assembly in Dhaka and a nationwide service network, we pair world-class engineering with the durability our roads demand.',
    missionEyebrow: 'Our mission',
    missionHeading: 'Powering Bangladesh’s electric commute',
    missionImage: media['mission-assembly'] ?? null,
    playStoreUrl: 'https://play.google.com/store/apps/details?id=bd.com.voltride.app',
    rangeBikes: pickBikes(bikes, homeRangeBikes),
    rangeEyebrow: 'Our line-up',
    rangeHeading: 'Explore our product range',
    slides: [
      {
        badge: 'New 2026 line',
        bike: bikes['tc-max'] ?? null,
        image: media['hero-urban'] ?? null,
        subtitle:
          'Zero emissions. Maximum performance. The future of Bangladeshi mobility is here.',
        title: 'Fast-Forward\nYour Urban Ride',
      },
      {
        badge: 'Editor’s choice',
        bike: bikes['cpx-pro'] ?? null,
        image: media['hero-thrill'] ?? null,
        subtitle: 'Sustainable performance without compromise — built for riders who demand more.',
        title: 'Engineered for Thrill.\nDesigned for Earth.',
      },
      {
        badge: 'Assembled in Bangladesh',
        bike: bikes['electrus-pro'] ?? null,
        image: media['hero-charge'] ?? null,
        subtitle: 'Class-leading range. Smart charging. Ride further, worry less.',
        title: 'Charge Ahead.\nLeave Nothing Behind.',
      },
    ],
    stats: [
      { label: 'Vehicle models', value: '14' },
      { label: 'Divisions covered', value: '8' },
      { label: 'Dealerships', value: '16' },
      { label: 'Happy riders', value: '50,000+' },
    ],
  },
})

export const vehicleTypesData = (media: MediaMap): Bilingual<Partial<VehicleType>> => ({
  bn: {
    ebike: {
      body: 'আমাদের ই-বাইকে ক্লাসিক ক্যাফে-রেসার লুকের সঙ্গে আধুনিক ইলেকট্রিক ড্রাইভট্রেন। বেল্ট-ড্রাইভ ট্রান্সমিশন, রিজেনারেটিভ ব্রেকিং আর খুলে নেওয়ার মতো ব্যাটারি প্যাক — ঢাকার যানজট আর হাইওয়ে, দুটোতেই সমান স্বচ্ছন্দ।',
      heading: 'ই-বাইক',
      heroImage: media['type-ebike'] ?? null,
      subtitle: 'হাই-পারফরম্যান্স ইলেকট্রিক মোটরসাইকেল — ক্লাসিক গড়ন, আধুনিক ইলেকট্রিক শক্তি।',
    },
    ecycle: {
      body: 'ই-সাইকেল রেঞ্জ তৈরি হয়েছে বাংলাদেশের প্রতিদিনের যাত্রীদের জন্য। প্যাডেল অ্যাসিস্ট, খুলে নেওয়ার মতো ব্যাটারি আর সহজে সার্ভিসযোগ্য যন্ত্রাংশ — বিল্ড কোয়ালিটিতে ছাড় না দিয়েই শূন্য-নিঃসরণের রাইড।',
      heading: 'ই-সাইকেল',
      heroImage: media['type-ecycle'] ?? null,
      subtitle:
        'বাংলাদেশের রাস্তার জন্য তৈরি প্যাডেল-অ্যাসিস্ট ইলেকট্রিক সাইকেল — হালকা, দীর্ঘ রেঞ্জ ও সাশ্রয়ী।',
    },
    escooter: {
      body: 'স্টেপ-থ্রু আরামের সঙ্গে সত্যিকারের রেঞ্জ। বড় ক্যাপাসিটির খোলা যায় এমন ব্যাটারি, অ্যাপ কানেক্টিভিটি আর নিচু সিট হাইট — প্রতিদিনের যাত্রা ইলেকট্রিকে বদলানোর সবচেয়ে সহজ উপায়।',
      heading: 'ই-স্কুটার',
      heroImage: media['type-escooter'] ?? null,
      subtitle: 'শহরের যাত্রা ও দূরপাল্লা — দুটোর জন্যই তৈরি প্রিমিয়াম ইলেকট্রিক স্কুটার।',
    },
    featureStrip: [
      { icon: '🔋', title: 'খুলে নেওয়ার মতো ব্যাটারি' },
      { icon: '🛡️', title: 'আইপি-রেটেড ইলেকট্রনিকস' },
      { icon: '🔧', title: 'আটটি বিভাগেই সার্ভিস' },
      { icon: '🌱', title: 'শূন্য টেইলপাইপ নির্গমন' },
    ],
    // Left blank on purpose: prices are hidden on the frontend, so a pricing
    // footnote has nothing to footnote. Fill it in when prices are switched on.
    priceNote: '',
  },
  en: {
    ebike: {
      body: 'Our e-bikes pair café-racer proportions with a modern electric drivetrain. Belt-drive transmission, regenerative braking and removable battery packs make them equally at home in Dhaka traffic and on the highway out of town.',
      heading: 'E-Bike',
      heroImage: media['type-ebike'] ?? null,
      subtitle:
        'High-performance electric motorcycles — classic proportions, modern electric power.',
    },
    ecycle: {
      body: 'The e-cycle range is built for the everyday Bangladeshi commuter. Pedal assist, removable batteries and service-friendly components deliver a practical, zero-emission ride without giving up on build quality.',
      heading: 'E-Cycle',
      heroImage: media['type-ecycle'] ?? null,
      subtitle:
        'Pedal-assist electric cycles built for Bangladeshi roads — light, long-range and affordable.',
    },
    escooter: {
      body: 'Step-through comfort with real range. Large-capacity removable batteries, app connectivity and a low seat height make these scooters the easiest way to switch a daily commute to electric.',
      heading: 'E-Scooter',
      heroImage: media['type-escooter'] ?? null,
      subtitle: 'Premium electric scooters engineered for city commutes and longer runs alike.',
    },
    featureStrip: [
      { icon: '🔋', title: 'Removable batteries' },
      { icon: '🛡️', title: 'IP-rated electronics' },
      { icon: '🔧', title: 'Service in every division' },
      { icon: '🌱', title: 'Zero tailpipe emissions' },
    ],
    priceNote: '',
  },
})
