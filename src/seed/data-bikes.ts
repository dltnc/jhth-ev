/**
 * The catalogue. Specs, taglines, colour swatches and descriptions come from the
 * `plan/E-motorbike website design` prototype; the prices are Bangladesh-specific
 * BDT figures in the prototype's relative order (its ₹ INR numbers are not usable
 * as-is). `gallery` holds keys into the media map built by `./media`.
 */
export type SeedBike = {
  badge?: { bn: string; en: string }
  basePrice: number
  category: 'cargo' | 'commuter' | 'sport'
  colorSwatches: string[]
  description: { bn: string; en: string }
  featured: boolean
  gallery: string[]
  name: { bn: string; en: string }
  quickSpecs: {
    battery: string
    chargeTime: string
    motor: string
    range: string
    topSpeed: string
  }
  slug: string
  specs: { label: { bn: string; en: string }; value: { bn: string; en: string } }[]
  status?: 'available' | 'comingSoon'
  tagline: { bn: string; en: string }
  variants: { colorName: { bn: string; en: string }; hex: string; price: number; sku: string }[]
  vehicleType: 'ebike' | 'ecycle' | 'escooter'
}

export const seedBikes: SeedBike[] = [
  {
    slug: 'tc-max',
    gallery: ['bike-tc-max', 'bike-tc-max-detail'],
    category: 'sport' as const,
    vehicleType: 'ebike' as const,
    featured: true,
    badge: { en: 'Best Seller', bn: 'সেরা বিক্রিত' },
    basePrice: 248000,
    name: { en: 'TC Max', bn: 'টিসি ম্যাক্স' },
    tagline: { en: 'Retro Vibes. Modern Power.', bn: 'রেট্রো স্টাইল। আধুনিক শক্তি।' },
    description: {
      en: 'Café-racer style meets electric performance. The TC Max packs a 5.1kW motor into a carbon steel and aluminium frame, delivering 95 km range and a 95 kmph top speed with zero emissions.',
      bn: 'ক্যাফে-রেসার স্টাইলের সাথে ইলেকট্রিক পারফরম্যান্স। টিসি ম্যাক্সে রয়েছে ৫.১ কিলোওয়াট মোটর, কার্বন স্টিল ও অ্যালুমিনিয়াম ফ্রেম — ৯৫ কিমি রেঞ্জ এবং ৯৫ কিমি/ঘণ্টা সর্বোচ্চ গতি, শূন্য নির্গমনে।',
    },
    quickSpecs: {
      range: '95 km',
      topSpeed: '95 kmph',
      motor: '5.1 kW BLDC',
      battery: '72V / 45Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#8B0000'],
    variants: [
      {
        colorName: { en: 'Midnight Black', bn: 'মিডনাইট ব্ল্যাক' },
        price: 248000,
        sku: 'TCM-BLK',
        hex: '#1a1a1a',
      },
      {
        colorName: { en: 'Crimson Red', bn: 'ক্রিমসন রেড' },
        price: 252000,
        sku: 'TCM-RED',
        hex: '#8B0000',
      },
    ],
    specs: [
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: {
          en: 'Carbon steel + aluminium subframe',
          bn: 'কার্বন স্টিল + অ্যালুমিনিয়াম সাবফ্রেম',
        },
      },
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: {
          en: '72V BLDC, rated 3.9kW, max 5.1kW',
          bn: '৭২ভি বিএলডিসি, রেটেড ৩.৯ কিলোওয়াট, সর্বোচ্চ ৫.১ কিলোওয়াট',
        },
      },
      { label: { en: 'Torque', bn: 'টর্ক' }, value: { en: '45 Nm', bn: '৪৫ নিউটন-মিটার' } },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '72V / 45Ah polymer lithium', bn: '৭২ভি / ৪৫অ্যাম্প-ঘণ্টা পলিমার লিথিয়াম' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: 'Up to 95 km', bn: '৯৫ কিমি পর্যন্ত' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '95 kmph', bn: '৯৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Brakes', bn: 'ব্রেক' },
        value: {
          en: 'Hydraulic CBS, 240mm front / 180mm rear',
          bn: 'হাইড্রোলিক সিবিএস, সামনে ২৪০ মিমি / পিছনে ১৮০ মিমি',
        },
      },
      {
        label: { en: 'Tyres', bn: 'টায়ার' },
        value: { en: '90/80-17 (F) / 120/70-17 (R)', bn: '৯০/৮০-১৭ (সামনে) / ১২০/৭০-১৭ (পিছনে)' },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '101 kg', bn: '১০১ কেজি' } },
      {
        label: { en: 'Transmission', bn: 'ট্রান্সমিশন' },
        value: { en: 'Toothed Belt Drive', bn: 'টুথড বেল্ট ড্রাইভ' },
      },
      {
        label: { en: 'Display', bn: 'ডিসপ্লে' },
        value: { en: 'Hybrid Analog-Digital + App', bn: 'হাইব্রিড অ্যানালগ-ডিজিটাল + অ্যাপ' },
      },
    ],
  },
  {
    slug: 'cpx-pro',
    gallery: ['bike-cpx-pro', 'bike-cpx-pro-detail'],
    category: 'sport' as const,
    vehicleType: 'escooter' as const,
    featured: true,
    badge: { en: 'New Arrival', bn: 'নতুন এসেছে' },
    basePrice: 256000,
    name: { en: 'CPX Pro', bn: 'সিপিএক্স প্রো' },
    tagline: { en: 'Performance-Driven Premium.', bn: 'পারফরম্যান্স-চালিত প্রিমিয়াম।' },
    description: {
      en: 'A maxi-scooter built for uncompromising performance. 105 kmph top speed, reverse capability, and full app connectivity — the CPX Pro is the premium EV experience.',
      bn: 'আপসহীন পারফরম্যান্সের জন্য তৈরি একটি ম্যাক্সি-স্কুটার। ১০৫ কিমি/ঘণ্টা গতি, রিভার্স ক্ষমতা এবং পূর্ণ অ্যাপ কানেক্টিভিটি — সিপিএক্স প্রো হলো প্রিমিয়াম ইভি অভিজ্ঞতা।',
    },
    quickSpecs: {
      range: '100 km',
      topSpeed: '105 kmph',
      motor: '7.5 kW PMSM',
      battery: '72V / 45Ah',
      chargeTime: '3.5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#C0C0C0'],
    variants: [
      {
        colorName: { en: 'Jet Black', bn: 'জেট ব্ল্যাক' },
        price: 256000,
        sku: 'CPX-BLK',
        hex: '#1a1a1a',
      },
      { colorName: { en: 'Silver', bn: 'সিলভার' }, price: 256000, sku: 'CPX-SLV', hex: '#C0C0C0' },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '7.5kW PMSM', bn: '৭.৫ কিলোওয়াট পিএমএসএম' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '72V / 45Ah', bn: '৭২ভি / ৪৫অ্যাম্প-ঘণ্টা' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '3.5 hours', bn: '৩.৫ ঘণ্টা' },
      },
      {
        label: { en: 'Range', bn: 'রেঞ্জ' },
        value: { en: 'Up to 100 km', bn: '১০০ কিমি পর্যন্ত' },
      },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '105 kmph', bn: '১০৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Features', bn: 'ফিচার' },
        value: { en: 'Reverse, CBS Brakes, App', bn: 'রিভার্স, সিবিএস ব্রেক, অ্যাপ' },
      },
      {
        label: { en: 'Display', bn: 'ডিসপ্লে' },
        value: { en: 'Full-colour TFT', bn: 'ফুল-কালার টিএফটি' },
      },
      {
        label: { en: 'Storage', bn: 'স্টোরেজ' },
        value: { en: 'Under-seat + front', bn: 'সিটের নিচে + সামনে' },
      },
    ],
  },
  {
    slug: 'electrus-pro',
    gallery: ['bike-electrus-pro', 'bike-flare-x'],
    category: 'commuter' as const,
    vehicleType: 'ecycle' as const,
    featured: false,
    badge: undefined,
    basePrice: 86000,
    name: { en: 'Electrus Pro', bn: 'ইলেকট্রাস প্রো' },
    tagline: { en: 'Smarter Urban Cycling.', bn: 'স্মার্ট শহুরে সাইক্লিং।' },
    description: {
      en: 'The Electrus Pro is engineered for the smart commuter. Pedal-assist intelligence, lightweight aluminium frame, and long-range battery.',
      bn: 'ইলেকট্রাস প্রো তৈরি হয়েছে স্মার্ট কমিউটারদের জন্য। পেডল-অ্যাসিস্ট প্রযুক্তি, হালকা অ্যালুমিনিয়াম ফ্রেম এবং দীর্ঘ রেঞ্জের ব্যাটারি।',
    },
    quickSpecs: {
      range: '35-55 km',
      topSpeed: '25 kmph',
      motor: '250W',
      battery: '36V / 10Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#2e4057'],
    variants: [
      { colorName: { en: 'Black', bn: 'কালো' }, price: 86000, sku: 'ELP-BLK', hex: '#1a1a1a' },
      {
        colorName: { en: 'Steel Blue', bn: 'স্টিল ব্লু' },
        price: 86000,
        sku: 'ELP-BLU',
        hex: '#2e4057',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '250W brushless hub motor', bn: '২৫০ ওয়াট ব্রাশলেস হাব মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '36V / 10Ah Li-ion', bn: '৩৬ভি / ১০অ্যাম্প-ঘণ্টা লি-আয়ন' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: '35-55 km', bn: '৩৫-৫৫ কিমি' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: { en: 'Aluminium alloy', bn: 'অ্যালুমিনিয়াম অ্যালয়' },
      },
      {
        label: { en: 'Gears', bn: 'গিয়ার' },
        value: { en: '7-speed Shimano', bn: '৭-স্পিড শিমানো' },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '22 kg', bn: '২২ কেজি' } },
    ],
  },
  {
    slug: 'skypher-pro',
    gallery: ['bike-skypher-pro', 'bike-flare-x-pro'],
    category: 'commuter' as const,
    vehicleType: 'ecycle' as const,
    featured: true,
    badge: { en: 'Best Value', bn: 'সেরা ভ্যালু' },
    basePrice: 48000,
    name: { en: 'Skypher Pro', bn: 'স্কাইফার প্রো' },
    tagline: { en: 'Urban Agility Redefined.', bn: 'শহুরে দক্ষতার নতুন সংজ্ঞা।' },
    description: {
      en: 'Compact, nimble, and packed with smart features. The Skypher Pro makes zero-emission urban commuting accessible for everyone.',
      bn: 'কমপ্যাক্ট, কার্যকর এবং স্মার্ট ফিচারে ভরপুর। স্কাইফার প্রো শূন্য-নির্গমন শহুরে যাতায়াতকে সবার জন্য সহজ করে তোলে।',
    },
    quickSpecs: {
      range: '35-55 km',
      topSpeed: '25 kmph',
      motor: '250W',
      battery: '36V / 10Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#5c4033'],
    variants: [
      { colorName: { en: 'Black', bn: 'কালো' }, price: 48000, sku: 'SKP-BLK', hex: '#1a1a1a' },
      { colorName: { en: 'Brown', bn: 'বাদামি' }, price: 48000, sku: 'SKP-BRN', hex: '#5c4033' },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '250W brushless hub motor', bn: '২৫০ ওয়াট ব্রাশলেস হাব মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '36V / 10Ah Li-ion', bn: '৩৬ভি / ১০অ্যাম্প-ঘণ্টা লি-আয়ন' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: '35-55 km', bn: '৩৫-৫৫ কিমি' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: { en: 'High-tensile steel', bn: 'হাই-টেনসাইল স্টিল' },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '20 kg', bn: '২০ কেজি' } },
    ],
  },
  {
    slug: 'flare-x',
    gallery: ['bike-flare-x', 'bike-electrus-pro'],
    category: 'commuter' as const,
    vehicleType: 'ecycle' as const,
    featured: false,
    badge: undefined,
    basePrice: 58000,
    name: { en: 'Flare X', bn: 'ফ্লেয়ার এক্স' },
    tagline: { en: 'Light Up Your Ride.', bn: 'আপনার রাইড উজ্জ্বল করুন।' },
    description: {
      en: 'Bold styling meets everyday practicality. The Flare X delivers confident rides with extended range and premium build quality.',
      bn: 'সাহসী স্টাইলের সাথে দৈনন্দিন ব্যবহারোপযোগিতা। ফ্লেয়ার এক্স দেয় বর্ধিত রেঞ্জ এবং প্রিমিয়াম কোয়ালিটির নিশ্চিত রাইড।',
    },
    quickSpecs: {
      range: '40-50 km',
      topSpeed: '25 kmph',
      motor: '250W',
      battery: '36V / 12Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#8B4513'],
    variants: [
      { colorName: { en: 'Black', bn: 'কালো' }, price: 58000, sku: 'FLX-BLK', hex: '#1a1a1a' },
      { colorName: { en: 'Brown', bn: 'বাদামি' }, price: 58000, sku: 'FLX-BRN', hex: '#8B4513' },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '250W brushless hub motor', bn: '২৫০ ওয়াট ব্রাশলেস হাব মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '36V / 12Ah Li-ion', bn: '৩৬ভি / ১২অ্যাম্প-ঘণ্টা লি-আয়ন' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: '40-50 km', bn: '৪০-৫০ কিমি' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: { en: 'Aluminium alloy', bn: 'অ্যালুমিনিয়াম অ্যালয়' },
      },
    ],
  },
  {
    slug: 'flare-x-pro',
    gallery: ['bike-flare-x-pro', 'bike-skypher-pro'],
    category: 'commuter' as const,
    vehicleType: 'ecycle' as const,
    featured: false,
    badge: undefined,
    basePrice: 62000,
    name: { en: 'Flare X Pro', bn: 'ফ্লেয়ার এক্স প্রো' },
    tagline: { en: 'Pro Performance. Pure Electric.', bn: 'প্রো পারফরম্যান্স। পিওর ইলেকট্রিক।' },
    description: {
      en: 'Everything you love about the Flare X — with more torque, smarter pedal assist, and a premium ride feel throughout.',
      bn: 'ফ্লেয়ার এক্সের সব পছন্দের বৈশিষ্ট্য — সাথে বেশি টর্ক, স্মার্ট পেডল অ্যাসিস্ট এবং প্রিমিয়াম রাইড অভিজ্ঞতা।',
    },
    quickSpecs: {
      range: '40-50 km',
      topSpeed: '25 kmph',
      motor: '350W',
      battery: '36V / 12Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#355E3B'],
    variants: [
      { colorName: { en: 'Black', bn: 'কালো' }, price: 62000, sku: 'FLXP-BLK', hex: '#1a1a1a' },
      {
        colorName: { en: 'Hunter Green', bn: 'হান্টার গ্রিন' },
        price: 62000,
        sku: 'FLXP-GRN',
        hex: '#355E3B',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '350W brushless hub motor', bn: '৩৫০ ওয়াট ব্রাশলেস হাব মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '36V / 12Ah Li-ion', bn: '৩৬ভি / ১২অ্যাম্প-ঘণ্টা লি-আয়ন' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: '40-50 km', bn: '৪০-৫০ কিমি' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: { en: 'Aluminium alloy', bn: 'অ্যালুমিনিয়াম অ্যালয়' },
      },
      {
        label: { en: 'Assist Levels', bn: 'অ্যাসিস্ট লেভেল' },
        value: { en: '5-level PAS', bn: '৫-লেভেল পিএএস' },
      },
    ],
  },
  {
    slug: 'momentum',
    gallery: ['bike-momentum', 'bike-horizon'],
    category: 'commuter' as const,
    vehicleType: 'ecycle' as const,
    featured: false,
    badge: undefined,
    basePrice: 106000,
    name: { en: 'Momentum', bn: 'মোমেন্টাম' },
    tagline: { en: 'Unstoppable Momentum.', bn: 'থামানো অসম্ভব গতি।' },
    description: {
      en: "Built for riders who demand more. The Momentum's 500W motor tackles hills, long commutes, and everything in between.",
      bn: 'যারা বেশি চান তাদের জন্য তৈরি। মোমেন্টামের ৫০০ ওয়াট মোটর পাহাড়ি পথ, দীর্ঘ যাত্রা — সব আয়ত্ত করে।',
    },
    quickSpecs: {
      range: '40-50 km',
      topSpeed: '25 kmph',
      motor: '500W',
      battery: '48V / 12Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#1C3A5E'],
    variants: [
      { colorName: { en: 'Black', bn: 'কালো' }, price: 106000, sku: 'MTM-BLK', hex: '#1a1a1a' },
      {
        colorName: { en: 'Deep Blue', bn: 'গাঢ় নীল' },
        price: 106000,
        sku: 'MTM-BLU',
        hex: '#1C3A5E',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '500W mid-drive motor', bn: '৫০০ ওয়াট মিড-ড্রাই মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '48V / 12Ah Li-ion', bn: '৪৮ভি / ১২অ্যাম্প-ঘণ্টা লি-আয়ন' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: '40-50 km', bn: '৪০-৫০ কিমি' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      {
        label: { en: 'Suspension', bn: 'সাসপেনশন' },
        value: { en: 'Front fork hydraulic', bn: 'সামনের ফর্ক হাইড্রোলিক' },
      },
      {
        label: { en: 'Brakes', bn: 'ব্রেক' },
        value: { en: 'Hydraulic disc, front & rear', bn: 'হাইড্রোলিক ডিস্ক, সামনে ও পিছনে' },
      },
    ],
  },
  {
    slug: 'horizon',
    gallery: ['bike-horizon', 'bike-momentum'],
    category: 'commuter' as const,
    vehicleType: 'ecycle' as const,
    featured: false,
    badge: undefined,
    basePrice: 104000,
    name: { en: 'Horizon', bn: 'হরাইজন' },
    tagline: { en: 'Expand Your Horizon.', bn: 'আপনার দিগন্ত বিস্তৃত করুন।' },
    description: {
      en: 'For riders who see the road as a canvas. Premium suspension, dual disc brakes, and an elegant frame that refuses to compromise.',
      bn: 'যারা রাস্তাকে ক্যানভাস মনে করেন তাদের জন্য। প্রিমিয়াম সাসপেনশন, ডুয়াল ডিস্ক ব্রেক এবং অভিজাত ফ্রেম।',
    },
    quickSpecs: {
      range: '40-50 km',
      topSpeed: '25 kmph',
      motor: '500W',
      battery: '48V / 12Ah',
      chargeTime: '4-5 hrs',
    },
    colorSwatches: ['#1a1a1a', '#4A235A'],
    variants: [
      { colorName: { en: 'Black', bn: 'কালো' }, price: 104000, sku: 'HRZ-BLK', hex: '#1a1a1a' },
      {
        colorName: { en: 'Royal Purple', bn: 'রয়্যাল পার্পল' },
        price: 104000,
        sku: 'HRZ-PRP',
        hex: '#4A235A',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '500W mid-drive motor', bn: '৫০০ ওয়াট মিড-ড্রাইভ মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '48V / 12Ah Li-ion', bn: '৪৮ভি / ১২অ্যাম্প-ঘণ্টা লি-আয়ন' },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: '40-50 km', bn: '৪০-৫০ কিমি' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '4-5 hours', bn: '৪-৫ ঘণ্টা' },
      },
      {
        label: { en: 'Suspension', bn: 'সাসপেনশন' },
        value: { en: 'Full suspension', bn: 'ফুল সাসপেনশন' },
      },
      {
        label: { en: 'Brakes', bn: 'ব্রেক' },
        value: { en: 'Hydraulic disc, front & rear', bn: 'হাইড্রোলিক ডিস্ক, সামনে ও পিছনে' },
      },
      {
        label: { en: 'Gears', bn: 'গিয়ার' },
        value: { en: '21-speed Shimano', bn: '২১-স্পিড শিমানো' },
      },
    ],
  },
  {
    slug: 'cpx-city',
    gallery: ['bike-cpx-pro-detail', 'bike-cpx-pro'],
    category: 'commuter' as const,
    vehicleType: 'escooter' as const,
    featured: true,
    badge: { en: 'City Favourite', bn: 'শহরের প্রিয়' },
    basePrice: 178000,
    name: { en: 'CPX City', bn: 'সিপিএক্স সিটি' },
    tagline: { en: 'Every Errand, Electrified.', bn: 'প্রতিদিনের কাজ, ইলেকট্রিকে।' },
    description: {
      en: 'The step-through scooter built for Dhaka’s stop-start traffic. A low seat height, a flat floorboard and a removable 60V pack you can carry up to your flat and charge overnight.',
      bn: 'ঢাকার থামা-চলা যানজটের জন্যই তৈরি স্টেপ-থ্রু স্কুটার। নিচু সিট, সমান ফ্লোরবোর্ড আর খুলে নেওয়া যায় এমন ৬০ভি ব্যাটারি — ফ্ল্যাটে নিয়ে গিয়ে রাতেই চার্জ দিন।',
    },
    quickSpecs: {
      range: '85 km',
      topSpeed: '65 kmph',
      motor: '2.2 kW BLDC',
      battery: '60V / 32Ah',
      chargeTime: '4 hrs',
    },
    colorSwatches: ['#f2f2f2', '#2e4057'],
    variants: [
      {
        colorName: { en: 'Pearl White', bn: 'পার্ল হোয়াইট' },
        price: 178000,
        sku: 'CPXC-WHT',
        hex: '#f2f2f2',
      },
      {
        colorName: { en: 'Steel Blue', bn: 'স্টিল ব্লু' },
        price: 180000,
        sku: 'CPXC-BLU',
        hex: '#2e4057',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '2.2kW BLDC hub motor', bn: '২.২ কিলোওয়াট বিএলডিসি হাব মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: {
          en: '60V / 32Ah removable lithium',
          bn: '৬০ভি / ৩২অ্যাম্প-ঘণ্টা খোলা যায় এমন লিথিয়াম',
        },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: 'Up to 85 km', bn: '৮৫ কিমি পর্যন্ত' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '65 kmph', bn: '৬৫ কিমি/ঘণ্টা' },
      },
      { label: { en: 'Charge Time', bn: 'চার্জ টাইম' }, value: { en: '4 hours', bn: '৪ ঘণ্টা' } },
      {
        label: { en: 'Brakes', bn: 'ব্রেক' },
        value: {
          en: 'Front disc / rear drum with CBS',
          bn: 'সামনে ডিস্ক / পিছনে ড্রাম, সিবিএস সহ',
        },
      },
      {
        label: { en: 'Storage', bn: 'স্টোরেজ' },
        value: { en: '22 litre under-seat', bn: 'সিটের নিচে ২২ লিটার' },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '86 kg', bn: '৮৬ কেজি' } },
    ],
  },
  {
    slug: 'tc-wanderer',
    gallery: ['bike-tc-max-detail', 'bike-tc-max'],
    category: 'commuter' as const,
    vehicleType: 'ebike' as const,
    featured: false,
    badge: undefined,
    basePrice: 212000,
    name: { en: 'TC Wanderer', bn: 'টিসি ওয়ান্ডারার' },
    tagline: { en: 'Built for the Long Way Round.', bn: 'দূরের পথের জন্য তৈরি।' },
    description: {
      en: 'A softly sprung tourer with an upright riding position, a wide saddle and luggage mounts front and rear. Highway-legal, comfortable for three hours at a stretch and happy on broken tarmac.',
      bn: 'নরম সাসপেনশনের টুরিং বাইক — সোজা হয়ে বসার ভঙ্গি, চওড়া সিট এবং সামনে-পিছনে লাগেজ মাউন্ট। হাইওয়েতে বৈধ, একটানা তিন ঘণ্টা আরামদায়ক আর ভাঙা রাস্তাতেও স্বচ্ছন্দ।',
    },
    quickSpecs: {
      range: '110 km',
      topSpeed: '80 kmph',
      motor: '4.0 kW BLDC',
      battery: '72V / 50Ah',
      chargeTime: '5 hrs',
    },
    colorSwatches: ['#3d4f3a', '#1a1a1a'],
    variants: [
      {
        colorName: { en: 'Field Green', bn: 'ফিল্ড গ্রিন' },
        price: 212000,
        sku: 'TCW-GRN',
        hex: '#3d4f3a',
      },
      {
        colorName: { en: 'Midnight Black', bn: 'মিডনাইট ব্ল্যাক' },
        price: 212000,
        sku: 'TCW-BLK',
        hex: '#1a1a1a',
      },
    ],
    specs: [
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: { en: 'Tubular steel double cradle', bn: 'টিউবুলার স্টিল ডাবল ক্র্যাডল' },
      },
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: {
          en: '72V BLDC, rated 3.0kW, max 4.0kW',
          bn: '৭২ভি বিএলডিসি, রেটেড ৩.০ কিলোওয়াট, সর্বোচ্চ ৪.০ কিলোওয়াট',
        },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: { en: '72V / 50Ah polymer lithium', bn: '৭২ভি / ৫০অ্যাম্প-ঘণ্টা পলিমার লিথিয়াম' },
      },
      {
        label: { en: 'Range', bn: 'রেঞ্জ' },
        value: { en: 'Up to 110 km', bn: '১১০ কিমি পর্যন্ত' },
      },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '80 kmph', bn: '৮০ কিমি/ঘণ্টা' },
      },
      { label: { en: 'Charge Time', bn: 'চার্জ টাইম' }, value: { en: '5 hours', bn: '৫ ঘণ্টা' } },
      {
        label: { en: 'Suspension', bn: 'সাসপেনশন' },
        value: { en: 'Telescopic fork / twin gas shocks', bn: 'টেলিস্কোপিক ফর্ক / টুইন গ্যাস শক' },
      },
      {
        label: { en: 'Luggage', bn: 'লাগেজ' },
        value: { en: 'Rear rack + pannier mounts', bn: 'পিছনের র‍্যাক + প্যানিয়ার মাউন্ট' },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '118 kg', bn: '১১৮ কেজি' } },
    ],
  },
  {
    slug: 'rush-one',
    gallery: ['bike-tc-max', 'bike-cpx-pro'],
    category: 'sport' as const,
    vehicleType: 'ebike' as const,
    featured: true,
    badge: { en: 'Coming Soon', bn: 'শীঘ্রই আসছে' },
    basePrice: 395000,
    status: 'comingSoon' as const,
    name: { en: 'Rush One', bn: 'রাশ ওয়ান' },
    tagline: { en: 'The Flagship Arrives.', bn: 'ফ্ল্যাগশিপ আসছে।' },
    description: {
      en: 'Our first liquid-cooled motorcycle: 11 kW peak, a 96V architecture and fast charging to 80 per cent in under an hour. Bookings open ahead of the first deliveries in early 2027.',
      bn: 'আমাদের প্রথম লিকুইড-কুলড মোটরসাইকেল: সর্বোচ্চ ১১ কিলোওয়াট, ৯৬ভি আর্কিটেকচার এবং এক ঘণ্টারও কম সময়ে ৮০ শতাংশ ফাস্ট চার্জিং। ২০২৭ সালের শুরুতে প্রথম ডেলিভারির আগেই বুকিং শুরু।',
    },
    quickSpecs: {
      range: '140 km',
      topSpeed: '120 kmph',
      motor: '11 kW PMSM',
      battery: '96V / 45Ah',
      chargeTime: '1 hr (80%)',
    },
    colorSwatches: ['#0d0d0d', '#c8102e'],
    variants: [
      {
        colorName: { en: 'Carbon Black', bn: 'কার্বন ব্ল্যাক' },
        price: 395000,
        sku: 'RSH-BLK',
        hex: '#0d0d0d',
      },
      {
        colorName: { en: 'Signal Red', bn: 'সিগন্যাল রেড' },
        price: 402000,
        sku: 'RSH-RED',
        hex: '#c8102e',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: {
          en: 'Liquid-cooled PMSM, max 11kW',
          bn: 'লিকুইড-কুলড পিএমএসএম, সর্বোচ্চ ১১ কিলোওয়াট',
        },
      },
      { label: { en: 'Torque', bn: 'টর্ক' }, value: { en: '92 Nm', bn: '৯২ নিউটন-মিটার' } },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: {
          en: '96V / 45Ah NMC with liquid cooling',
          bn: '৯৬ভি / ৪৫অ্যাম্প-ঘণ্টা এনএমসি, লিকুইড কুলিং সহ',
        },
      },
      {
        label: { en: 'Range', bn: 'রেঞ্জ' },
        value: { en: 'Up to 140 km', bn: '১৪০ কিমি পর্যন্ত' },
      },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '120 kmph', bn: '১২০ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Fast Charge', bn: 'ফাস্ট চার্জ' },
        value: { en: '0-80% in 55 minutes', bn: '৫৫ মিনিটে ০-৮০%' },
      },
      {
        label: { en: 'Brakes', bn: 'ব্রেক' },
        value: {
          en: 'Dual-channel ABS, 300mm front disc',
          bn: 'ডুয়াল-চ্যানেল এবিএস, সামনে ৩০০ মিমি ডিস্ক',
        },
      },
      {
        label: { en: 'Ride Modes', bn: 'রাইড মোড' },
        value: { en: 'Eco / City / Sport / Track', bn: 'ইকো / সিটি / স্পোর্ট / ট্র্যাক' },
      },
      {
        label: { en: 'Availability', bn: 'প্রাপ্যতা' },
        value: { en: 'Deliveries from Q1 2027', bn: '২০২৭ সালের প্রথম প্রান্তিক থেকে ডেলিভারি' },
      },
    ],
  },
  {
    slug: 'haul-pro',
    gallery: ['bike-cpx-pro', 'bike-momentum'],
    category: 'cargo' as const,
    vehicleType: 'escooter' as const,
    featured: false,
    badge: { en: 'For Fleets', bn: 'ফ্লিটের জন্য' },
    basePrice: 232000,
    name: { en: 'Haul Pro', bn: 'হল প্রো' },
    tagline: { en: 'Deliveries, Done Cheaper.', bn: 'ডেলিভারি, আরও কম খরচে।' },
    description: {
      en: 'A delivery workhorse with a 120 kg payload, a reinforced rear rack sized for insulated boxes and dual swappable batteries so a rider never waits for a charge.',
      bn: '১২০ কেজি পেলোড বহনে সক্ষম ডেলিভারি ওয়ার্কহর্স — ইনসুলেটেড বক্সের মাপে মজবুত পিছনের র‍্যাক এবং দুটি বদলযোগ্য ব্যাটারি, ফলে চার্জের জন্য অপেক্ষা করতে হয় না।',
    },
    quickSpecs: {
      range: '120 km',
      topSpeed: '55 kmph',
      motor: '3.0 kW BLDC',
      battery: '2 × 60V / 30Ah',
      chargeTime: '3.5 hrs',
    },
    colorSwatches: ['#f5a623', '#4a4a4a'],
    variants: [
      {
        colorName: { en: 'Fleet Amber', bn: 'ফ্লিট অ্যাম্বার' },
        price: 232000,
        sku: 'HAUL-AMB',
        hex: '#f5a623',
      },
      {
        colorName: { en: 'Utility Grey', bn: 'ইউটিলিটি গ্রে' },
        price: 232000,
        sku: 'HAUL-GRY',
        hex: '#4a4a4a',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '3.0kW BLDC with hill-hold', bn: '৩.০ কিলোওয়াট বিএলডিসি, হিল-হোল্ড সহ' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: {
          en: 'Two swappable 60V / 30Ah packs',
          bn: 'দুটি বদলযোগ্য ৬০ভি / ৩০অ্যাম্প-ঘণ্টা প্যাক',
        },
      },
      {
        label: { en: 'Payload', bn: 'পেলোড' },
        value: { en: '120 kg including rider', bn: 'চালকসহ ১২০ কেজি' },
      },
      {
        label: { en: 'Range', bn: 'রেঞ্জ' },
        value: { en: 'Up to 120 km on both packs', bn: 'দুই প্যাকে ১২০ কিমি পর্যন্ত' },
      },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '55 kmph', bn: '৫৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Charge Time', bn: 'চার্জ টাইম' },
        value: { en: '3.5 hours per pack', bn: 'প্রতি প্যাকে ৩.৫ ঘণ্টা' },
      },
      {
        label: { en: 'Rear Rack', bn: 'পিছনের র‍্যাক' },
        value: { en: 'Steel, 45 × 40 cm platform', bn: 'স্টিল, ৪৫ × ৪০ সেমি প্ল্যাটফর্ম' },
      },
      {
        label: { en: 'Telematics', bn: 'টেলিমেটিক্স' },
        value: { en: 'Fleet GPS and trip logging', bn: 'ফ্লিট জিপিএস ও ট্রিপ লগিং' },
      },
    ],
  },
  {
    slug: 'porter-e',
    gallery: ['bike-momentum', 'bike-electrus-pro'],
    category: 'cargo' as const,
    vehicleType: 'ecycle' as const,
    featured: false,
    badge: undefined,
    basePrice: 124000,
    name: { en: 'Porter E', bn: 'পোর্টার ই' },
    tagline: { en: 'A Shop on Two Wheels.', bn: 'দুই চাকার দোকান।' },
    description: {
      en: 'A long-tail cargo cycle for last-mile work: 80 kg on the rear deck, a low step-over frame and pedal assist strong enough to pull a loaded crate up a flyover ramp.',
      bn: 'লাস্ট-মাইল কাজের জন্য লং-টেইল কার্গো সাইকেল: পিছনের ডেকে ৮০ কেজি, নিচু স্টেপ-ওভার ফ্রেম এবং বোঝাই ক্রেট নিয়ে ফ্লাইওভারের র‍্যাম্প ওঠার মতো শক্তিশালী প্যাডেল অ্যাসিস্ট।',
    },
    quickSpecs: {
      range: '60 km',
      topSpeed: '25 kmph',
      motor: '750W',
      battery: '48V / 20Ah',
      chargeTime: '6 hrs',
    },
    colorSwatches: ['#1a6b3a', '#4a4a4a'],
    variants: [
      {
        colorName: { en: 'Delivery Green', bn: 'ডেলিভারি গ্রিন' },
        price: 124000,
        sku: 'PRT-GRN',
        hex: '#1a6b3a',
      },
      {
        colorName: { en: 'Utility Grey', bn: 'ইউটিলিটি গ্রে' },
        price: 124000,
        sku: 'PRT-GRY',
        hex: '#4a4a4a',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '750W geared rear hub', bn: '৭৫০ ওয়াট গিয়ারড রিয়ার হাব' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: {
          en: '48V / 20Ah Li-ion, lockable',
          bn: '৪৮ভি / ২০অ্যাম্প-ঘণ্টা লি-আয়ন, তালাযুক্ত',
        },
      },
      {
        label: { en: 'Payload', bn: 'পেলোড' },
        value: { en: '80 kg on the rear deck', bn: 'পিছনের ডেকে ৮০ কেজি' },
      },
      {
        label: { en: 'Range', bn: 'রেঞ্জ' },
        value: { en: '60 km unladen, 40 km loaded', bn: 'খালি ৬০ কিমি, বোঝাই ৪০ কিমি' },
      },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '25 kmph', bn: '২৫ কিমি/ঘণ্টা' },
      },
      {
        label: { en: 'Frame', bn: 'ফ্রেম' },
        value: { en: 'Long-tail steel, low step-over', bn: 'লং-টেইল স্টিল, নিচু স্টেপ-ওভার' },
      },
      {
        label: { en: 'Brakes', bn: 'ব্রেক' },
        value: {
          en: 'Hydraulic disc, 180mm both ends',
          bn: 'হাইড্রোলিক ডিস্ক, দুই প্রান্তে ১৮০ মিমি',
        },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '34 kg', bn: '৩৪ কেজি' } },
    ],
  },
  {
    slug: 'glide-lite',
    gallery: ['bike-cpx-pro-detail', 'bike-skypher-pro'],
    category: 'commuter' as const,
    vehicleType: 'escooter' as const,
    featured: false,
    badge: { en: 'Budget Pick', bn: 'সাশ্রয়ী পছন্দ' },
    basePrice: 142000,
    name: { en: 'Glide Lite', bn: 'গ্লাইড লাইট' },
    tagline: { en: 'Your First Electric.', bn: 'আপনার প্রথম ইলেকট্রিক।' },
    description: {
      en: 'The easiest way off petrol. Light enough to wheel through a gate, cheap enough to run on a student budget, and rated for a 70 km day on a single charge.',
      bn: 'পেট্রোল ছাড়ার সবচেয়ে সহজ উপায়। গেট দিয়ে ঠেলে নেওয়ার মতো হালকা, শিক্ষার্থীর বাজেটে চালানোর মতো সাশ্রয়ী — এক চার্জে দিনে ৭০ কিমি।',
    },
    quickSpecs: {
      range: '70 km',
      topSpeed: '50 kmph',
      motor: '1.5 kW BLDC',
      battery: '60V / 24Ah',
      chargeTime: '4 hrs',
    },
    colorSwatches: ['#7fb069', '#f2f2f2'],
    variants: [
      { colorName: { en: 'Mint', bn: 'মিন্ট' }, price: 142000, sku: 'GLD-MNT', hex: '#7fb069' },
      {
        colorName: { en: 'Pearl White', bn: 'পার্ল হোয়াইট' },
        price: 142000,
        sku: 'GLD-WHT',
        hex: '#f2f2f2',
      },
    ],
    specs: [
      {
        label: { en: 'Motor', bn: 'মোটর' },
        value: { en: '1.5kW BLDC hub motor', bn: '১.৫ কিলোওয়াট বিএলডিসি হাব মোটর' },
      },
      {
        label: { en: 'Battery', bn: 'ব্যাটারি' },
        value: {
          en: '60V / 24Ah removable lithium',
          bn: '৬০ভি / ২৪অ্যাম্প-ঘণ্টা খোলা যায় এমন লিথিয়াম',
        },
      },
      { label: { en: 'Range', bn: 'রেঞ্জ' }, value: { en: 'Up to 70 km', bn: '৭০ কিমি পর্যন্ত' } },
      {
        label: { en: 'Top Speed', bn: 'সর্বোচ্চ গতি' },
        value: { en: '50 kmph', bn: '৫০ কিমি/ঘণ্টা' },
      },
      { label: { en: 'Charge Time', bn: 'চার্জ টাইম' }, value: { en: '4 hours', bn: '৪ ঘণ্টা' } },
      {
        label: { en: 'Running Cost', bn: 'চালানোর খরচ' },
        value: { en: 'About ৳0.35 per km', bn: 'প্রতি কিমিতে প্রায় ৩৫ পয়সা' },
      },
      { label: { en: 'Weight', bn: 'ওজন' }, value: { en: '72 kg', bn: '৭২ কেজি' } },
    ],
  },
]
