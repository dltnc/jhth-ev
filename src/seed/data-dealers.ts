/**
 * The dealer network: 16 showrooms spanning all eight divisions. `location` is a
 * Payload `point`, which stores `[longitude, latitude]` — the reverse of how the
 * field label reads.
 */
export type SeedDealer = {
  address: { bn: string; en: string }
  district: string
  division:
    | 'barishal'
    | 'chattogram'
    | 'dhaka'
    | 'khulna'
    | 'mymensingh'
    | 'rajshahi'
    | 'rangpur'
    | 'sylhet'
  hours: { bn: string; en: string }
  lat: number
  lng: number
  name: string
  phone: string
  services: ('charging' | 'sales' | 'service')[]
}

const weekday = {
  bn: 'শনি-বৃহস্পতি সকাল ৯:০০ - রাত ৮:০০, শুক্রবার বন্ধ',
  en: 'Sat-Thu 9:00 AM - 8:00 PM, closed Friday',
}

const late = {
  bn: 'প্রতিদিন সকাল ১০:০০ - রাত ৯:০০',
  en: 'Daily 10:00 AM - 9:00 PM',
}

const early = {
  bn: 'শনি-বৃহস্পতি সকাল ৮:৩০ - সন্ধ্যা ৭:০০, শুক্রবার বন্ধ',
  en: 'Sat-Thu 8:30 AM - 7:00 PM, closed Friday',
}

export const seedDealers: SeedDealer[] = [
  {
    name: 'VoltRide Dhaka Central',
    address: {
      bn: 'লেভেল ১, আমিন কোর্ট, ৬২-৬৩ মতিঝিল বাণিজ্যিক এলাকা, ঢাকা ১০০০',
      en: 'Level 1, Amin Court, 62-63 Motijheel C/A, Dhaka 1000',
    },
    district: 'Dhaka',
    division: 'dhaka',
    hours: weekday,
    lat: 23.7275,
    lng: 90.4177,
    phone: '+880 1711 456120',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Gulshan',
    address: {
      bn: 'বাড়ি ৪২, রোড ১১, গুলশান ১, ঢাকা ১২১২',
      en: 'House 42, Road 11, Gulshan 1, Dhaka 1212',
    },
    district: 'Dhaka',
    division: 'dhaka',
    hours: late,
    lat: 23.7806,
    lng: 90.4152,
    phone: '+880 1711 456121',
    services: ['sales', 'charging'],
  },
  {
    name: 'VoltRide Dhanmondi',
    address: {
      bn: '১৫/এ মিরপুর রোড, ধানমন্ডি ২৭, ঢাকা ১২০৯',
      en: '15/A Mirpur Road, Dhanmondi 27, Dhaka 1209',
    },
    district: 'Dhaka',
    division: 'dhaka',
    hours: weekday,
    lat: 23.7509,
    lng: 90.3737,
    phone: '+880 1711 456122',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Uttara',
    address: {
      bn: 'প্লট ৭, সোনারগাঁও জনপথ রোড, সেক্টর ৯, উত্তরা, ঢাকা ১২৩০',
      en: 'Plot 7, Sonargaon Janapath Road, Sector 9, Uttara, Dhaka 1230',
    },
    district: 'Dhaka',
    division: 'dhaka',
    hours: weekday,
    lat: 23.8687,
    lng: 90.3993,
    phone: '+880 1711 456123',
    services: ['sales', 'service'],
  },
  {
    name: 'VoltRide Narayanganj',
    address: {
      bn: '১১২ বঙ্গবন্ধু রোড, চাষাঢ়া, নারায়ণগঞ্জ ১৪০০',
      en: '112 Bangabandhu Road, Chashara, Narayanganj 1400',
    },
    district: 'Narayanganj',
    division: 'dhaka',
    hours: early,
    lat: 23.6238,
    lng: 90.5,
    phone: '+880 1711 456124',
    services: ['sales', 'service'],
  },
  {
    name: 'VoltRide Chattogram Agrabad',
    address: {
      bn: 'আইয়ুব ট্রেড সেন্টার, ১২৬৯/বি শেখ মুজিব রোড, আগ্রাবাদ, চট্টগ্রাম ৪১০০',
      en: 'Ayub Trade Centre, 1269/B Sheikh Mujib Road, Agrabad, Chattogram 4100',
    },
    district: 'Chattogram',
    division: 'chattogram',
    hours: weekday,
    lat: 22.3286,
    lng: 91.8123,
    phone: '+880 1712 330451',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Cumilla',
    address: {
      bn: '৪৮ কান্দিরপাড়, ঝাউতলা রোড, কুমিল্লা ৩৫০০',
      en: '48 Kandirpar, Jhawtala Road, Cumilla 3500',
    },
    district: 'Cumilla',
    division: 'chattogram',
    hours: early,
    lat: 23.4607,
    lng: 91.1809,
    phone: '+880 1712 330452',
    services: ['sales', 'service'],
  },
  {
    name: "VoltRide Cox's Bazar",
    address: {
      bn: 'কলাতলী রোড, হোটেল-মোটেল জোন, কক্সবাজার ৪৭০০',
      en: "Kalatoli Road, Hotel Motel Zone, Cox's Bazar 4700",
    },
    district: "Cox's Bazar",
    division: 'chattogram',
    hours: late,
    lat: 21.4272,
    lng: 92.0058,
    phone: '+880 1712 330453',
    services: ['sales', 'charging'],
  },
  {
    name: 'VoltRide Khulna',
    address: {
      bn: '৯ কেডিএ অ্যাভিনিউ, শিববাড়ি মোড়, খুলনা ৯১০০',
      en: '9 KDA Avenue, Shibbari More, Khulna 9100',
    },
    district: 'Khulna',
    division: 'khulna',
    hours: weekday,
    lat: 22.8098,
    lng: 89.5645,
    phone: '+880 1713 771290',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Jashore',
    address: {
      bn: 'এম কে রোড, চৌরাস্তা, যশোর ৭৪০০',
      en: 'MK Road, Chowrasta, Jashore 7400',
    },
    district: 'Jashore',
    division: 'khulna',
    hours: early,
    lat: 23.1667,
    lng: 89.2081,
    phone: '+880 1713 771291',
    services: ['sales', 'service'],
  },
  {
    name: 'VoltRide Rajshahi',
    address: {
      bn: '২২১ গ্রেটার রোড, সাহেব বাজার জিরো পয়েন্ট, রাজশাহী ৬১০০',
      en: '221 Greater Road, Shaheb Bazar Zero Point, Rajshahi 6100',
    },
    district: 'Rajshahi',
    division: 'rajshahi',
    hours: weekday,
    lat: 24.3667,
    lng: 88.6042,
    phone: '+880 1714 220870',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Bogura',
    address: {
      bn: '৭৩ শেরপুর রোড, সাতমাথা, বগুড়া ৫৮০০',
      en: '73 Sherpur Road, Satmatha, Bogura 5800',
    },
    district: 'Bogura',
    division: 'rajshahi',
    hours: early,
    lat: 24.8465,
    lng: 89.3773,
    phone: '+880 1714 220871',
    services: ['sales', 'service'],
  },
  {
    name: 'VoltRide Sylhet',
    address: {
      bn: 'কানিজ প্লাজা, জিন্দাবাজার রোড, সিলেট ৩১০০',
      en: 'Kaniz Plaza, Zindabazar Road, Sylhet 3100',
    },
    district: 'Sylhet',
    division: 'sylhet',
    hours: weekday,
    lat: 24.8949,
    lng: 91.8687,
    phone: '+880 1715 664310',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Barishal',
    address: {
      bn: '৩১ সদর রোড, বিবির পুকুর পাড়, বরিশাল ৮২০০',
      en: '31 Sadar Road, Bibir Pukur Par, Barishal 8200',
    },
    district: 'Barishal',
    division: 'barishal',
    hours: early,
    lat: 22.701,
    lng: 90.3535,
    phone: '+880 1716 553180',
    services: ['sales', 'service'],
  },
  {
    name: 'VoltRide Rangpur',
    address: {
      bn: 'স্টেশন রোড, জাহাজ কোম্পানি মোড়, রংপুর ৫৪০০',
      en: 'Station Road, Jahaj Company More, Rangpur 5400',
    },
    district: 'Rangpur',
    division: 'rangpur',
    hours: weekday,
    lat: 25.7439,
    lng: 89.2752,
    phone: '+880 1717 442960',
    services: ['sales', 'service', 'charging'],
  },
  {
    name: 'VoltRide Mymensingh',
    address: {
      bn: '১৮ ছোট বাজার, গাঙ্গিনার পাড়, ময়মনসিংহ ২২০০',
      en: '18 Choto Bazar, Ganginar Par, Mymensingh 2200',
    },
    district: 'Mymensingh',
    division: 'mymensingh',
    hours: early,
    lat: 24.7539,
    lng: 90.4073,
    phone: '+880 1718 331740',
    services: ['sales', 'service'],
  },
]
