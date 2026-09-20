import type { Page } from '../payload-types'
import type { MediaMap } from './media'

import { headingNode, listNode, paragraphNode, quoteNode, richText } from './richText'

export const seedUsers = [
  {
    name: 'Super Admin',
    email: 'admin@voltride.com.bd',
    password: 'admin1234',
    roles: ['admin' as const],
  },
  {
    name: 'Marketing Editor',
    email: 'editor@voltride.com.bd',
    password: 'editor1234',
    roles: ['editor' as const],
  },
  {
    name: 'Sales Viewer',
    email: 'sales@voltride.com.bd',
    password: 'sales1234',
    roles: ['sales' as const],
  },
]

export const seedCategories = [
  { title: { en: 'Tech', bn: 'প্রযুক্তি' }, slug: 'tech' },
  { title: { en: 'Sustainability', bn: 'স্থায়িত্ব' }, slug: 'sustainability' },
  { title: { en: 'Rider Stories', bn: 'রাইডারের গল্প' }, slug: 'rider-stories' },
  { title: { en: 'Company News', bn: 'কোম্পানির সংবাদ' }, slug: 'company-news' },
  { title: { en: 'Buying Guides', bn: 'কেনার গাইড' }, slug: 'buying-guides' },
  { title: { en: 'Product Updates', bn: 'প্রোডাক্ট আপডেট' }, slug: 'product-updates' },
]

/**
 * The Testimonials collection has no city or role field, so where the rider is
 * from is written into the quote itself.
 */
export const seedTestimonials = [
  {
    bike: 'tc-max',
    name: 'Tanvir Ahmed',
    quote: {
      bn: 'ঢাকার মিরপুর থেকে মতিঝিল প্রতিদিন যাই। টিসি ম্যাক্স কেনার পর মাসে জ্বালানি খরচ প্রায় চার হাজার টাকা কমেছে, আর যানজটে গরম হয়ে বসে থাকতে হয় না।',
      en: 'I ride Mirpur to Motijheel every day. Since the TC Max my monthly fuel bill is about ৳4,000 lower, and I am not sitting in traffic on top of a hot engine any more.',
    },
    rating: 5,
  },
  {
    bike: 'cpx-pro',
    name: 'Farhana Rahman',
    quote: {
      bn: 'গুলশানের শোরুম থেকে সিপিএক্স প্রো নিয়েছি। রিভার্স মোড আর অ্যাপে ব্যাটারি দেখার সুবিধাটা প্রতিদিন কাজে লাগে।',
      en: 'I picked up my CPX Pro from the Gulshan showroom. The reverse mode and being able to check the battery in the app are things I actually use every day.',
    },
    rating: 5,
  },
  {
    bike: 'skypher-pro',
    name: 'Sabbir Hossain',
    quote: {
      bn: 'চট্টগ্রামে বিশ্ববিদ্যালয়ে পড়ি। স্কাইফার প্রো আমার বাজেটে ছিল, আর হোস্টেলের ঘরেই ব্যাটারি চার্জ দিতে পারি।',
      en: 'I am a student in Chattogram. The Skypher Pro was inside my budget and I can charge the battery in my hostel room.',
    },
    rating: 4,
  },
  {
    bike: 'momentum',
    name: 'Nusrat Jahan',
    quote: {
      bn: 'সিলেটের ঢালু রাস্তায় মোমেন্টামের ৫০০ ওয়াট মোটর সত্যিই কাজে দেয়। এক বছরে একবারও সার্ভিসে সমস্যা হয়নি।',
      en: 'On Sylhet’s slopes the Momentum’s 500W motor genuinely earns its keep. A full year in and I have not had one service problem.',
    },
    rating: 5,
  },
  {
    bike: 'electrus-pro',
    name: 'Imran Kabir',
    quote: {
      bn: 'খুলনা শোরুমের টিম টেস্ট রাইডের সময় সব খুলে বুঝিয়ে দিয়েছে। ইলেকট্রাস প্রো নিয়ে অফিস যাওয়া এখন অনেক সহজ।',
      en: 'The team at the Khulna showroom talked me through everything on the test ride. Commuting on the Electrus Pro is far easier than it was.',
    },
    rating: 5,
  },
  {
    bike: 'horizon',
    name: 'Rezaul Karim',
    quote: {
      bn: 'রাজশাহী থেকে পদ্মার পাড় পর্যন্ত সপ্তাহে দুইবার যাই। হরাইজনের ফুল সাসপেনশনে ভাঙা রাস্তাও সমস্যা নয়।',
      en: 'I ride out to the riverside from Rajshahi twice a week. With the Horizon’s full suspension the broken stretches stop mattering.',
    },
    rating: 4,
  },
  {
    bike: 'flare-x',
    name: 'Mehjabin Chowdhury',
    quote: {
      bn: 'বরিশালে বাজার করতে যাওয়ার জন্য ফ্লেয়ার এক্স নিয়েছি। হালকা, চালাতে আরাম আর চার্জ দিতে খরচ প্রায় নেই।',
      en: 'I bought the Flare X for market runs in Barishal. It is light, comfortable, and charging it costs almost nothing.',
    },
    rating: 5,
  },
  {
    bike: 'haul-pro',
    name: 'Shahin Alam',
    quote: {
      bn: 'আমার ডেলিভারি ব্যবসায় ছয়টি হল প্রো চলছে। দুইটি ব্যাটারি বদলে নেওয়া যায়, তাই রাইডারদের অপেক্ষা করতে হয় না।',
      en: 'I run six Haul Pros in my delivery business. Because the two packs swap out, my riders never sit waiting for a charger.',
    },
    rating: 5,
  },
  {
    bike: 'cpx-city',
    name: 'Ayesha Siddika',
    quote: {
      bn: 'ময়মনসিংহে সিপিএক্স সিটি চালাই। নিচু সিট আর সমান ফ্লোরবোর্ডের কারণে শাড়ি পরেও চালাতে অসুবিধা হয় না।',
      en: 'I ride a CPX City in Mymensingh. The low seat and flat floorboard mean riding in a saree is no trouble at all.',
    },
    rating: 5,
  },
  {
    bike: 'glide-lite',
    name: 'Rakibul Islam',
    quote: {
      bn: 'রংপুরে গ্লাইড লাইট আমার প্রথম ইলেকট্রিক বাহন। প্রতি কিলোমিটারে খরচ এতটাই কম যে হিসাব করে অবাক হয়েছি।',
      en: 'The Glide Lite in Rangpur is my first electric vehicle. The cost per kilometre is so low that working it out surprised me.',
    },
    rating: 4,
  },
]

export const seedFaqs = [
  {
    answer: {
      bn: 'ভোল্টরাইড একটি বাংলাদেশি ইলেকট্রিক যানবাহন ব্র্যান্ড। আমাদের ই-সাইকেল, ই-স্কুটার ও ই-বাইক ঢাকার কারখানায় অ্যাসেম্বল হয় এবং আটটি বিভাগেই আমাদের বিক্রয় ও সার্ভিস নেটওয়ার্ক রয়েছে।',
      en: 'VoltRide is a Bangladeshi electric vehicle brand. Our e-cycles, e-scooters and e-bikes are assembled at our plant in Dhaka, and we run sales and service points in all eight divisions.',
    },
    category: 'general' as const,
    order: 1,
    question: { bn: 'ভোল্টরাইড কী?', en: 'What is VoltRide?' },
  },
  {
    answer: {
      bn: '২৫ কিমি/ঘণ্টা গতির প্যাডেল-অ্যাসিস্ট ই-সাইকেলের জন্য লাইসেন্স বা রেজিস্ট্রেশন লাগে না। ই-স্কুটার ও ই-বাইকের জন্য বিআরটিএ রেজিস্ট্রেশন ও বৈধ ড্রাইভিং লাইসেন্স প্রয়োজন — কাগজপত্রের কাজে শোরুম সহায়তা করে।',
      en: 'Pedal-assist e-cycles limited to 25 kmph need no licence or registration. E-scooters and e-bikes require BRTA registration and a valid driving licence — the showroom helps you with the paperwork.',
    },
    category: 'general' as const,
    order: 2,
    question: {
      bn: 'ভোল্টরাইড চালাতে লাইসেন্স লাগে কি?',
      en: 'Do I need a licence to ride a VoltRide?',
    },
  },
  {
    answer: {
      bn: 'হ্যাঁ। সব মডেলের ইলেকট্রনিকস আইপি-রেটেড এবং কানেক্টরগুলো সিল করা, তাই বর্ষায় স্বাভাবিকভাবে চালানো যায়। তবে হাঁটুর সমান জমা পানিতে গাড়ি নামাবেন না।',
      en: 'Yes. The electronics on every model are IP-rated and the connectors are sealed, so riding through monsoon rain is fine. Do not ride into standing water deeper than knee height.',
    },
    category: 'general' as const,
    order: 3,
    question: { bn: 'বৃষ্টিতে চালানো যাবে?', en: 'Can I ride in the rain?' },
  },
  {
    answer: {
      bn: 'শোরুম বা /test-ride পাতা থেকে টেস্ট রাইড বুক করুন। আমাদের টিম ফোনে সময় নিশ্চিত করবে; সঙ্গে জাতীয় পরিচয়পত্র আর মোটরসাইকেলের ক্ষেত্রে ড্রাইভিং লাইসেন্স নিয়ে আসবেন।',
      en: 'Book a test ride from the /test-ride page or at any showroom. Our team confirms the slot by phone; bring your National ID and, for motorcycles, your driving licence.',
    },
    category: 'general' as const,
    order: 4,
    question: { bn: 'টেস্ট রাইড কীভাবে বুক করব?', en: 'How do I book a test ride?' },
  },
  {
    answer: {
      bn: 'ব্যাটারির ধরন অনুযায়ী ৩.৫ থেকে ৬ ঘণ্টা। ই-সাইকেলের ৩৬ভি প্যাক প্রায় ৪-৫ ঘণ্টায় পূর্ণ হয়, আর ই-বাইকের ৭২ভি প্যাক ৪-৫ ঘণ্টা নেয়। রাশ ওয়ানে ফাস্ট চার্জিংয়ে ৫৫ মিনিটে ৮০ শতাংশ।',
      en: 'Between 3.5 and 6 hours depending on the pack. A 36V e-cycle battery fills in about 4-5 hours and a 72V e-bike pack takes 4-5 hours. On the Rush One, fast charging reaches 80 per cent in 55 minutes.',
    },
    category: 'battery' as const,
    order: 1,
    question: { bn: 'ব্যাটারি চার্জ হতে কত সময় লাগে?', en: 'How long does a full charge take?' },
  },
  {
    answer: {
      bn: 'হ্যাঁ। সব মডেলের ব্যাটারি প্যাক খুলে নেওয়া যায়, তাই বাসা বা অফিসের সাধারণ ২২০ভি সকেট থেকেই চার্জ দিতে পারবেন। প্যাকের সঙ্গেই বহনযোগ্য চার্জার দেওয়া হয়।',
      en: 'Yes. The battery pack lifts out of every model, so you can charge from an ordinary 220V socket at home or at the office. A portable charger is supplied with the pack.',
    },
    category: 'battery' as const,
    order: 2,
    question: {
      bn: 'ব্যাটারি খুলে ঘরে নিয়ে চার্জ দেওয়া যাবে?',
      en: 'Can I remove the battery and charge it indoors?',
    },
  },
  {
    answer: {
      bn: 'ব্যাটারি ৮০ শতাংশ ক্ষমতা ধরে রাখা অবস্থায় ১,০০০-১,২০০ ফুল সাইকেল রেটেড, যা স্বাভাবিক ব্যবহারে ৪-৬ বছর। ২০-৮০ শতাংশের মধ্যে চার্জ রাখলে আয়ু আরও বাড়ে।',
      en: 'The packs are rated for 1,000-1,200 full cycles while retaining 80 per cent capacity, which is four to six years of normal use. Keeping the charge between 20 and 80 per cent extends that further.',
    },
    category: 'battery' as const,
    order: 3,
    question: { bn: 'ব্যাটারি কত দিন টিকবে?', en: 'How long will the battery last?' },
  },
  {
    answer: {
      bn: 'প্রতি কিলোওয়াট-ঘণ্টায় দেশের গড় বিদ্যুৎ দরে ই-সাইকেলে প্রতি কিলোমিটারে খরচ প্রায় ১৫ পয়সা, ই-স্কুটারে প্রায় ৩৫ পয়সা। একটি ই-বাইক পূর্ণ চার্জে প্রায় ৪০-৫০ টাকা।',
      en: 'At the national average tariff an e-cycle costs about ৳0.15 per kilometre and an e-scooter about ৳0.35. A full charge on an e-bike works out at roughly ৳40-50.',
    },
    category: 'battery' as const,
    order: 4,
    question: { bn: 'চার্জ দিতে কত খরচ হয়?', en: 'What does a charge cost?' },
  },
  {
    answer: {
      bn: 'ফ্রেমে লাইফটাইম ওয়ারেন্টি, ব্যাটারি ও মোটরে ৩ বছর অথবা ৩০,০০০ কিলোমিটার (যেটি আগে আসে), এবং কন্ট্রোলার ও চার্জারে ২ বছর। ওয়ারেন্টি কার্ড ও ক্রয় রসিদ সংরক্ষণ করুন।',
      en: 'Lifetime warranty on the frame, three years or 30,000 km (whichever comes first) on the battery and motor, and two years on the controller and charger. Keep your warranty card and purchase receipt.',
    },
    category: 'warranty' as const,
    order: 1,
    question: { bn: 'ওয়ারেন্টি কী কী কভার করে?', en: 'What does the warranty cover?' },
  },
  {
    answer: {
      bn: 'প্রথম তিন মাসের সার্ভিস প্যাকেজ দামের মধ্যেই আছে। এরপর প্রতি ৩,০০০ কিলোমিটার বা ছয় মাসে একবার সার্ভিস করানোর পরামর্শ দিই — যেটি আগে আসে।',
      en: 'The first three-month service package is included in the price. After that we recommend a service every 3,000 km or six months, whichever comes first.',
    },
    category: 'warranty' as const,
    order: 2,
    question: { bn: 'কত দিন পর সার্ভিস করাতে হবে?', en: 'How often does it need servicing?' },
  },
  {
    answer: {
      bn: 'দেশের ভেতরে ১৬টি ভোল্টরাইড সেন্টারের যেকোনোটিতে যন্ত্রাংশ পাওয়া যায়। যা মজুদে নেই তা ঢাকার কেন্দ্রীয় গুদাম থেকে সাধারণত ৪৮-৭২ ঘণ্টায় পৌঁছে যায়।',
      en: 'Parts are stocked at all 16 VoltRide centres. Anything not on the shelf comes from the central warehouse in Dhaka, usually within 48 to 72 hours.',
    },
    category: 'warranty' as const,
    order: 3,
    question: { bn: 'যন্ত্রাংশ পেতে কত সময় লাগে?', en: 'How quickly can I get spare parts?' },
  },
  {
    answer: {
      bn: 'নিজে ব্যাটারি বা কন্ট্রোলার খুললে, অনুমোদনহীন যন্ত্রাংশ লাগালে, অথবা দুর্ঘটনা ও পানিতে ডুবে যাওয়ার ক্ষতিতে ওয়ারেন্টি বাতিল হয়। স্বাভাবিক ক্ষয় যেমন টায়ার, ব্রেক প্যাড ও বাল্ব ওয়ারেন্টির বাইরে।',
      en: 'Opening the battery or controller yourself, fitting unapproved parts, or damage from a collision or submersion voids the warranty. Wear items such as tyres, brake pads and bulbs are not covered.',
    },
    category: 'warranty' as const,
    order: 4,
    question: { bn: 'কোন কারণে ওয়ারেন্টি বাতিল হয়?', en: 'What voids the warranty?' },
  },
  {
    answer: {
      bn: 'আমাদের পার্টনার ব্যাংক ও এনবিএফআই-এর মাধ্যমে ৬ থেকে ৩৬ মাসের ইএমআই পাওয়া যায়। /financing পাতার ক্যালকুলেটরে আনুমানিক কিস্তি দেখতে পারবেন; চূড়ান্ত হার ঋণদাতা নির্ধারণ করে।',
      en: 'Instalments run from 6 to 36 months through our partner banks and NBFIs. The calculator on /financing gives you an indicative monthly figure; the lender sets the final rate.',
    },
    category: 'buying' as const,
    order: 1,
    question: { bn: 'ইএমআই সুবিধা আছে?', en: 'Is EMI available?' },
  },
  {
    answer: {
      bn: 'রিজার্ভ করতে কোনো টাকা লাগে না। /reserve পাতা থেকে মডেল ও রং বেছে নিন, আমাদের বিশেষজ্ঞ ফোন করে ডেলিভারির সময় জানাবেন। চাইলে বুকিং ডিপোজিট দিয়ে অগ্রাধিকার নিতে পারেন।',
      en: 'Reserving costs nothing. Pick a model and colour on /reserve and a product specialist calls you back with a delivery window. You can add a booking deposit if you want priority.',
    },
    category: 'buying' as const,
    order: 2,
    question: { bn: 'রিজার্ভ করতে টাকা দিতে হবে?', en: 'Does reserving require a payment?' },
  },
  {
    answer: {
      bn: 'জাতীয় পরিচয়পত্রের কপি, দুই কপি পাসপোর্ট সাইজ ছবি এবং ঠিকানার প্রমাণ। ইএমআই নিলে ঋণদাতা আয়ের প্রমাণ ও ব্যাংক স্টেটমেন্টও চাইবে।',
      en: 'A copy of your National ID, two passport-size photographs and a proof of address. For EMI the lender also asks for proof of income and bank statements.',
    },
    category: 'buying' as const,
    order: 3,
    question: { bn: 'কিনতে কী কী কাগজ লাগে?', en: 'What documents do I need to buy?' },
  },
  {
    answer: {
      bn: 'ওয়েবসাইটে দেওয়া সব দাম এক্স-শোরুম, ঢাকা। রেজিস্ট্রেশন ফি, বীমা এবং ঢাকার বাইরে পরিবহন খরচ আলাদা — শোরুম আপনাকে চূড়ান্ত অন-রোড হিসাব দেবে।',
      en: 'Every price on the site is ex-showroom, Dhaka. Registration, insurance and transport outside Dhaka are extra — the showroom gives you a final on-road figure.',
    },
    category: 'buying' as const,
    order: 4,
    question: { bn: 'দামের মধ্যে কী কী ধরা নেই?', en: 'What is not included in the price?' },
  },
  {
    answer: {
      bn: 'হেলমেট বাধ্যতামূলক এবং ই-স্কুটার বা ই-বাইকে দুইজনের বেশি নয়। রাতে হেডলাইট ও টেললাইট চালু রাখুন, আর ব্যস্ত রাস্তায় ইকো মোডে চালালে ব্রেকিং দূরত্ব কমে।',
      en: 'A helmet is mandatory and never carry more than one pillion on an e-scooter or e-bike. Keep the headlight and tail light on after dark, and Eco mode shortens your braking distance in heavy traffic.',
    },
    category: 'riding' as const,
    order: 1,
    question: { bn: 'নিরাপদে চালানোর মূল নিয়ম কী?', en: 'What are the basic safety rules?' },
  },
  {
    answer: {
      bn: 'প্রকাশিত রেঞ্জ ৭০ কেজি চালক, সমতল রাস্তা ও মাঝারি গতিতে মাপা। ভারী বোঝা, ঘন ঘন থামা-চলা এবং শীতাতপ ছাড়া গরম দুপুরে রেঞ্জ ১০-২০ শতাংশ কমতে পারে।',
      en: 'Published range assumes a 70 kg rider, flat roads and moderate speed. Heavy loads, constant stop-start traffic and midday heat can each cut it by 10 to 20 per cent.',
    },
    category: 'riding' as const,
    order: 2,
    question: {
      bn: 'বাস্তবে রেঞ্জ কম হয় কেন?',
      en: 'Why is my real-world range lower than advertised?',
    },
  },
  {
    answer: {
      bn: 'ই-সাইকেল স্বাভাবিক ভেজা রাস্তায় চলবে, তবে জমা পানিতে নামানো ঠিক নয়। ২০ সেন্টিমিটারের বেশি পানি হলে ঘুরে যান — মোটর ও কন্ট্রোলার ডুবে গেলে ওয়ারেন্টি প্রযোজ্য হবে না।',
      en: 'The bikes handle wet roads fine but standing water is a different matter. Turn back if it is deeper than 20 cm — a submerged motor or controller is not a warranty claim.',
    },
    category: 'riding' as const,
    order: 3,
    question: {
      bn: 'জলাবদ্ধ রাস্তায় চালানো যাবে?',
      en: 'Can I ride through waterlogged streets?',
    },
  },
  {
    answer: {
      bn: 'হ্যাঁ। সিপিএক্স প্রো, সিপিএক্স সিটি, হল প্রো ও রাশ ওয়ানে জিপিএস ট্র্যাকিং ও জিও-ফেন্সিং অ্যালার্ট আছে, যা ভোল্টরাইড অ্যাপ থেকে চালু করা যায়।',
      en: 'Yes. The CPX Pro, CPX City, Haul Pro and Rush One ship with GPS tracking and geo-fencing alerts you can switch on from the VoltRide app.',
    },
    category: 'riding' as const,
    order: 4,
    question: { bn: 'চুরি হলে খুঁজে পাওয়ার ব্যবস্থা আছে?', en: 'Is there anti-theft tracking?' },
  },
]

export const seedPosts = [
  {
    authorEmail: 'admin@voltride.com.bd',
    category: 'product-updates',
    content: {
      bn: richText(
        headingNode('লাইনআপে নতুন কী'),
        paragraphNode(
          'এই বছর আমরা চারটি নতুন মডেল যোগ করেছি এবং পুরো রেঞ্জকে তিনটি পরিষ্কার পরিবারে সাজিয়েছি — ই-সাইকেল, ই-স্কুটার ও ই-বাইক। উদ্দেশ্য সহজ: প্রতিটি বাজেট আর প্রতিটি ব্যবহারের জন্য একটি নির্দিষ্ট উত্তর।',
        ),
        listNode([
          'সিপিএক্স সিটি — শহরের দৈনন্দিন যাত্রার জন্য স্টেপ-থ্রু স্কুটার',
          'টিসি ওয়ান্ডারার — দূরপাল্লার আরামদায়ক টুরার',
          'হল প্রো ও পোর্টার ই — ডেলিভারি ও কার্গোর জন্য',
          'রাশ ওয়ান — আমাদের প্রথম লিকুইড-কুলড ফ্ল্যাগশিপ, ২০২৭ সালে আসছে',
        ]),
        paragraphNode(
          'পুরনো মডেলগুলো বাদ যাচ্ছে না। টিসি ম্যাক্স, স্কাইফার প্রো ও ফ্লেয়ার এক্স সিরিজ আগের দামেই থাকছে, শুধু ব্যাটারি ম্যানেজমেন্ট সফটওয়্যার হালনাগাদ হয়েছে।',
        ),
        paragraphNode(
          'নতুন মডেলগুলো আপাতত ঢাকা, চট্টগ্রাম ও খুলনার শোরুমে টেস্ট রাইডের জন্য প্রস্তুত। বাকি বিভাগে পৌঁছাবে আগামী দুই মাসে।',
        ),
      ),
      en: richText(
        headingNode('What is new in the line-up'),
        paragraphNode(
          'We added four models this year and reorganised the whole range into three clear families — e-cycles, e-scooters and e-bikes. The aim is simple: one obvious answer for every budget and every use case.',
        ),
        listNode([
          'CPX City — a step-through scooter for daily city runs',
          'TC Wanderer — a comfortable long-distance tourer',
          'Haul Pro and Porter E — for delivery and cargo work',
          'Rush One — our first liquid-cooled flagship, arriving in 2027',
        ]),
        paragraphNode(
          'Nothing is being retired. The TC Max, Skypher Pro and the Flare X series stay at the same prices, with an updated battery management build.',
        ),
        paragraphNode(
          'The new models are ready for test rides in Dhaka, Chattogram and Khulna for now. They reach the remaining divisions over the next two months.',
        ),
      ),
    },
    cover: 'post-launch-2026',
    excerpt: {
      bn: 'চারটি নতুন মডেল, তিনটি পরিষ্কার পরিবার এবং ২০২৭ সালের জন্য একটি ফ্ল্যাগশিপ — ২০২৬ লাইনআপের পূর্ণ বিবরণ।',
      en: 'Four new models, three clear families and a flagship pencilled in for 2027 — the full 2026 line-up explained.',
    },
    publishDate: '2026-08-04',
    slug: 'voltride-2026-lineup',
    tags: ['line-up', 'launch'],
    title: {
      bn: 'ভোল্টরাইড ২০২৬ লাইনআপ: চারটি নতুন মডেল',
      en: 'The VoltRide 2026 line-up: four new models',
    },
  },
  {
    authorEmail: 'editor@voltride.com.bd',
    category: 'buying-guides',
    content: {
      bn: richText(
        headingNode('বাসায় চার্জ দেওয়ার আগে যা দেখে নেবেন'),
        paragraphNode(
          'ভোল্টরাইডের সব ব্যাটারি প্যাক খুলে নেওয়া যায়, তাই বাসার সাধারণ ২২০ভি সকেট থেকেই চার্জ দেওয়া যায়। তবু কয়েকটি বিষয় আগে ঠিক করে নিলে ব্যাটারি অনেক বেশি দিন টিকবে।',
        ),
        listNode([
          'আর্থিং আছে এমন সকেট ব্যবহার করুন; মাল্টিপ্লাগ বা এক্সটেনশন কর্ডে চার্জ দেবেন না।',
          'রাইড শেষে ব্যাটারি অন্তত ২০ মিনিট ঠান্ডা হতে দিন, তারপর চার্জারে লাগান।',
          'বাতাস চলাচল করে এমন শুকনো জায়গায় চার্জ দিন — বন্ধ আলমারি বা বিছানার নিচে নয়।',
          'দৈনন্দিন ব্যবহারে ২০ থেকে ৮০ শতাংশের মধ্যে রাখুন; পূর্ণ ১০০ শতাংশ শুধু লম্বা যাত্রার আগে।',
          'সঙ্গে দেওয়া চার্জারই ব্যবহার করুন, তৃতীয় পক্ষের ফাস্ট চার্জার নয়।',
        ]),
        paragraphNode(
          'দুই সপ্তাহের বেশি গাড়ি না চালালে ব্যাটারি ৫০-৬০ শতাংশ চার্জে রেখে দিন এবং মাসে একবার চার্জ দিয়ে নিন। একেবারে খালি অবস্থায় ফেলে রাখলে সেলের স্থায়ী ক্ষতি হয়।',
        ),
        quoteNode(
          'ওয়ারেন্টি দাবির যে অভিযোগগুলো আমরা পাই, তার বড় অংশই ভুল চার্জিং অভ্যাস থেকে — যন্ত্রের ত্রুটি থেকে নয়।',
        ),
      ),
      en: richText(
        headingNode('Before you charge at home'),
        paragraphNode(
          'Every VoltRide battery pack lifts out, so an ordinary 220V household socket is all you need. A few habits set up on day one, though, will add years to the pack.',
        ),
        listNode([
          'Use an earthed wall socket — not a multi-plug or an extension lead.',
          'Let the pack cool for at least twenty minutes after a ride before plugging it in.',
          'Charge somewhere dry with air moving around it, not inside a closed cupboard or under a bed.',
          'For daily use keep it between 20 and 80 per cent; charge to a full 100 only before a long trip.',
          'Use the supplied charger, never a third-party fast charger.',
        ]),
        paragraphNode(
          'If the bike will sit for more than a fortnight, leave the pack at 50-60 per cent and top it up once a month. Storing it flat is what does permanent damage to the cells.',
        ),
        quoteNode(
          'Most of the battery complaints that reach us come from charging habits, not from faulty hardware.',
        ),
      ),
    },
    cover: 'post-charging-tips',
    excerpt: {
      bn: 'সকেট থেকে শুরু করে দীর্ঘদিন ফেলে রাখার নিয়ম — বাসায় ব্যাটারি চার্জ দেওয়ার পাঁচটি অভ্যাস যা প্যাকের আয়ু বাড়ায়।',
      en: 'From which socket to use to how to store a pack for a month — five charging habits that add years to your battery.',
    },
    publishDate: '2026-07-07',
    slug: 'charging-at-home-checklist',
    tags: ['battery', 'charging', 'maintenance'],
    title: {
      bn: 'বাসায় চার্জ দেওয়ার চেকলিস্ট',
      en: 'The home charging checklist',
    },
  },
  {
    authorEmail: 'sales@voltride.com.bd',
    category: 'buying-guides',
    content: {
      bn: richText(
        headingNode('ইএমআই আসলে কীভাবে কাজ করে'),
        paragraphNode(
          'প্রথমবার ইলেকট্রিক গাড়ি কিনতে আসা ক্রেতাদের সবচেয়ে বড় প্রশ্ন দাম নয়, বরং মাসে কত টাকা গুনতে হবে। আমাদের পার্টনার ব্যাংক ও এনবিএফআই ৬ থেকে ৩৬ মাসের কিস্তি দেয়, ডাউন পেমেন্ট সাধারণত দামের ২০ থেকে ৩০ শতাংশ।',
        ),
        paragraphNode(
          'একটি উদাহরণ ধরা যাক। ১,৪২,০০০ টাকার গ্লাইড লাইটে ৩০ শতাংশ ডাউন পেমেন্ট দিলে বাকি থাকে ৯৯,৪০০ টাকা। ২৪ মাসে ভাগ করলে সুদসহ মাসিক কিস্তি দাঁড়ায় প্রায় ৪,৭০০ থেকে ৫,১০০ টাকা — ঋণদাতার হারের ওপর নির্ভর করে।',
        ),
        listNode([
          'জাতীয় পরিচয়পত্র ও দুই কপি পাসপোর্ট সাইজ ছবি',
          'সাম্প্রতিক ঠিকানার প্রমাণ — বিদ্যুৎ বা গ্যাস বিল চলবে',
          'বেতনের সনদ বা ব্যবসার আয়ের প্রমাণ',
          'শেষ ছয় মাসের ব্যাংক স্টেটমেন্ট',
        ]),
        paragraphNode(
          'অনুমোদন সাধারণত দুই থেকে পাঁচ কর্মদিবসে হয়। ফাইল প্রস্তুত থাকলে শোরুম থেকেই সব জমা দিতে পারেন — আলাদা করে ব্যাংকে যেতে হয় না। /financing পাতার ক্যালকুলেটরে আনুমানিক হিসাব আগেই দেখে নিতে পারেন, তবে চূড়ান্ত হার ঋণদাতা নির্ধারণ করে।',
        ),
      ),
      en: richText(
        headingNode('How EMI actually works'),
        paragraphNode(
          'For most first-time electric buyers the real question is not the sticker price but the monthly figure. Our partner banks and NBFIs offer 6 to 36 month terms, with a down payment that is usually 20 to 30 per cent of the price.',
        ),
        paragraphNode(
          'Take an example. On a ৳142,000 Glide Lite, a 30 per cent down payment leaves ৳99,400 financed. Spread over 24 months with interest, that lands between roughly ৳4,700 and ৳5,100 a month depending on the lender’s rate.',
        ),
        listNode([
          'National ID and two passport-size photographs',
          'Recent proof of address — an electricity or gas bill is fine',
          'Salary certificate, or proof of business income',
          'Bank statements for the last six months',
        ]),
        paragraphNode(
          'Approval normally takes two to five working days. If your file is ready you can submit everything at the showroom rather than making a separate trip to the bank. The calculator on /financing gives an indicative figure up front, but the lender sets the final rate.',
        ),
      ),
    },
    cover: 'post-emi-guide',
    excerpt: {
      bn: 'ডাউন পেমেন্ট, কাগজপত্র আর একটি বাস্তব হিসাব — প্রথমবার ইএমআইতে ইলেকট্রিক গাড়ি কিনতে যা জানা দরকার।',
      en: 'Down payments, paperwork and one worked example — what to know before financing your first electric ride.',
    },
    publishDate: '2026-06-09',
    slug: 'emi-guide-first-time-buyers',
    tags: ['emi', 'financing', 'buying'],
    title: {
      bn: 'প্রথম ক্রেতার জন্য ইএমআই গাইড',
      en: 'An EMI guide for first-time buyers',
    },
  },
  {
    authorEmail: 'admin@voltride.com.bd',
    category: 'company-news',
    content: {
      bn: richText(
        headingNode('আটটি বিভাগেই সার্ভিস'),
        paragraphNode(
          'ময়মনসিংহের গাঙ্গিনার পাড়ে নতুন সেন্টার খোলার পর ভোল্টরাইড এখন দেশের আটটি বিভাগেই উপস্থিত। মোট ১৬টি কেন্দ্রের মধ্যে ১৩টিতে পূর্ণ সার্ভিস বে আছে এবং সাতটিতে চার্জিং পয়েন্ট।',
        ),
        paragraphNode(
          'নেটওয়ার্ক বাড়ানোর কারণ শুধু বিক্রি নয়। ইলেকট্রিক গাড়ির সবচেয়ে বড় দুশ্চিন্তা হলো — নষ্ট হলে কোথায় নিয়ে যাব। আমরা চাই যেকোনো গ্রাহক যেন সর্বোচ্চ ৭০ কিলোমিটারের মধ্যে একটি অনুমোদিত সেন্টার পান।',
        ),
        listNode([
          'ঢাকা বিভাগে পাঁচটি — মতিঝিল, গুলশান, ধানমন্ডি, উত্তরা ও নারায়ণগঞ্জ',
          'চট্টগ্রাম বিভাগে তিনটি — আগ্রাবাদ, কুমিল্লা ও কক্সবাজার',
          'খুলনা ও রাজশাহীতে দুইটি করে',
          'সিলেট, বরিশাল, রংপুর ও ময়মনসিংহে একটি করে',
        ]),
        paragraphNode(
          'যন্ত্রাংশের মজুদ ঢাকার কেন্দ্রীয় গুদাম থেকে নিয়ন্ত্রিত হয়। শেলফে না থাকলে সাধারণত ৪৮ থেকে ৭২ ঘণ্টার মধ্যে যেকোনো সেন্টারে পৌঁছে যায়।',
        ),
      ),
      en: richText(
        headingNode('Service in all eight divisions'),
        paragraphNode(
          'With the new centre on Ganginar Par in Mymensingh, VoltRide now has a presence in all eight divisions. Thirteen of the sixteen centres have a full service bay and seven have charging points.',
        ),
        paragraphNode(
          'Growing the network is not really about selling more bikes. The single biggest worry about going electric is where you take it when something breaks. We want every owner to be within about 70 km of an authorised centre.',
        ),
        listNode([
          'Five in Dhaka division — Motijheel, Gulshan, Dhanmondi, Uttara and Narayanganj',
          'Three in Chattogram division — Agrabad, Cumilla and Cox’s Bazar',
          'Two each in Khulna and Rajshahi',
          'One each in Sylhet, Barishal, Rangpur and Mymensingh',
        ]),
        paragraphNode(
          'Parts stock is managed from the central warehouse in Dhaka. Anything not on a centre’s shelf usually reaches it within 48 to 72 hours.',
        ),
      ),
    },
    cover: 'post-service-network',
    excerpt: {
      bn: 'ময়মনসিংহে নতুন কেন্দ্র খোলার মধ্য দিয়ে ভোল্টরাইড সার্ভিস নেটওয়ার্ক এখন ১৬টি কেন্দ্রে, আটটি বিভাগেই।',
      en: 'With the Mymensingh opening the VoltRide service network reaches 16 centres, covering every division.',
    },
    publishDate: '2026-05-19',
    slug: 'service-network-eight-divisions',
    tags: ['network', 'service', 'company'],
    title: {
      bn: 'সার্ভিস নেটওয়ার্ক পৌঁছাল ১৬টি কেন্দ্রে',
      en: 'Our service network reaches 16 centres',
    },
  },
  {
    authorEmail: 'editor@voltride.com.bd',
    category: 'sustainability',
    content: {
      bn: richText(
        headingNode('ঢাকায় যাতায়াতের প্রকৃত খরচ'),
        paragraphNode(
          'মিরপুর থেকে মতিঝিল যাওয়া-আসা প্রায় ২৮ কিলোমিটার। মাসে ২২ কর্মদিবস ধরলে দাঁড়ায় ৬১৬ কিলোমিটার। এই একই দূরত্ব তিনভাবে পার হলে খরচ কেমন হয়, সেটাই হিসাব করে দেখেছি।',
        ),
        listNode([
          'সিএনজি অটোরিকশা: প্রতিদিন গড়ে ৩৮০ টাকা, মাসে প্রায় ৮,৩৬০ টাকা',
          '১১০ সিসি পেট্রোল মোটরসাইকেল: প্রতি লিটারে ৪০ কিমি ধরে মাসে প্রায় ১,১৯২ টাকা জ্বালানি, সঙ্গে সার্ভিসিং',
          'ভোল্টরাইড ই-স্কুটার: প্রতি কিলোমিটারে ৩৫ পয়সা হিসেবে মাসে প্রায় ২১৬ টাকা বিদ্যুৎ',
        ]),
        paragraphNode(
          'পেট্রোল মোটরসাইকেলের সঙ্গে তুলনা করলেও ইলেকট্রিকে মাসে হাজার টাকার কাছাকাছি সঞ্চয় হয়, আর ইঞ্জিন অয়েল, ফিল্টার বা স্পার্ক প্লাগের খরচ একেবারেই নেই। ব্রেক প্যাড আর টায়ার ছাড়া নিয়মিত বদলানোর মতো কিছু থাকে না।',
        ),
        paragraphNode(
          'সঙ্গে যোগ করুন যানজটে বসে থাকা অবস্থায় ইলেকট্রিক মোটর কোনো বিদ্যুৎ খরচ করে না — যেখানে পেট্রোল ইঞ্জিন আইডল অবস্থায়ও জ্বালানি পোড়ায় এবং ধোঁয়া ছাড়ে। ঢাকার ট্রাফিকে এই পার্থক্যটাই সবচেয়ে বড়।',
        ),
      ),
      en: richText(
        headingNode('What a Dhaka commute really costs'),
        paragraphNode(
          'Mirpur to Motijheel and back is about 28 km. Over 22 working days that is 616 km a month. We worked out what covering exactly that distance costs three different ways.',
        ),
        listNode([
          'CNG auto-rickshaw: around ৳380 a day, so roughly ৳8,360 a month',
          '110cc petrol motorcycle: at 40 km per litre, about ৳1,192 in fuel a month, plus servicing',
          'VoltRide e-scooter: at ৳0.35 per kilometre, about ৳216 of electricity a month',
        ]),
        paragraphNode(
          'Even measured against a petrol motorcycle the saving is close to a thousand taka a month, and there is no engine oil, filter or spark plug bill at all. Beyond brake pads and tyres there is very little that needs regular replacing.',
        ),
        paragraphNode(
          'Add to that the fact that an electric motor draws nothing while you sit in traffic, where a petrol engine burns fuel and emits at idle. In Dhaka traffic that is the difference that matters most.',
        ),
      ),
    },
    cover: 'post-dhaka-commute',
    excerpt: {
      bn: 'মিরপুর থেকে মতিঝিল — সিএনজি, পেট্রোল মোটরসাইকেল আর ই-স্কুটারে মাসিক খরচের সরাসরি তুলনা।',
      en: 'Mirpur to Motijheel, priced three ways: CNG, a petrol motorcycle and an e-scooter.',
    },
    publishDate: '2026-04-28',
    slug: 'dhaka-commute-cost-breakdown',
    tags: ['cost', 'commuting', 'sustainability'],
    title: {
      bn: 'ঢাকায় যাতায়াতে মাসে কত খরচ',
      en: 'The monthly cost of a Dhaka commute',
    },
  },
  {
    authorEmail: 'editor@voltride.com.bd',
    category: 'tech',
    content: {
      bn: richText(
        headingNode('বর্ষায় ব্যাটারির যত্ন'),
        paragraphNode(
          'বাংলাদেশের বর্ষা ব্যাটারির জন্য দুইভাবে কঠিন — একদিকে টানা আর্দ্রতা, অন্যদিকে জমা পানি। ভোল্টরাইডের সব প্যাক ও কানেক্টর আইপি-রেটেড, তাই বৃষ্টিতে চালানো নিয়ে দুশ্চিন্তার কিছু নেই। কিন্তু কিছু নিয়ম মানতে হবে।',
        ),
        paragraphNode(
          'সবচেয়ে জরুরি নিয়মটি হলো: ভেজা হাতে বা ভেজা প্যাক নিয়ে চার্জারে সংযোগ দেবেন না। রাইড শেষে প্যাকের কানেক্টর শুকনো কাপড়ে মুছে নিন, তারপর অন্তত আধা ঘণ্টা ঘরের তাপমাত্রায় রেখে চার্জ দিন।',
        ),
        listNode([
          'কানেক্টরে হালকা ডাই-ইলেকট্রিক গ্রিজ দিলে ক্ষয় ঠেকানো যায় — মাসে একবারই যথেষ্ট।',
          'জমা পানি ২০ সেন্টিমিটারের বেশি হলে ঘুরে যান; মোটর ডুবে গেলে ওয়ারেন্টি প্রযোজ্য নয়।',
          'পানিতে চলার পর ব্রেক ডিস্ক শুকিয়ে নিতে কয়েকবার আলতো ব্রেক করুন।',
          'গাড়ি ভেজা অবস্থায় কভার দিয়ে ঢেকে রাখবেন না — ভেতরে জলীয় বাষ্প জমে।',
        ]),
        paragraphNode(
          'আর্দ্রতার আরেকটি প্রভাব কম আলোচিত: ঠান্ডা ভেজা সকালে ব্যাটারির অভ্যন্তরীণ রেজিস্ট্যান্স বাড়ে, তাই প্রথম কয়েক কিলোমিটারে রেঞ্জ কিছুটা কম দেখাতে পারে। প্যাক গরম হলে হিসাব আবার স্বাভাবিক হয়ে যায়।',
        ),
      ),
      en: richText(
        headingNode('Battery care through the monsoon'),
        paragraphNode(
          'A Bangladeshi monsoon is hard on batteries in two different ways — sustained humidity and standing water. Every VoltRide pack and connector is IP-rated, so riding in rain is not something to worry about. A few rules still apply.',
        ),
        paragraphNode(
          'The one that matters most: never connect a charger with wet hands or a wet pack. Wipe the pack connectors with a dry cloth after a ride, then let it sit at room temperature for half an hour before charging.',
        ),
        listNode([
          'A thin smear of dielectric grease on the connectors keeps corrosion away — once a month is plenty.',
          'Turn back if standing water is deeper than 20 cm; a submerged motor is not a warranty claim.',
          'After riding through water, brake gently a few times to dry the discs.',
          'Do not throw a cover over a wet bike — it just traps the moisture underneath.',
        ]),
        paragraphNode(
          'One humidity effect gets less attention: on a cold wet morning the pack’s internal resistance rises, so the first few kilometres can show a lower range estimate. It settles once the pack warms up.',
        ),
      ),
    },
    cover: 'post-battery-care',
    excerpt: {
      bn: 'আর্দ্রতা, জমা পানি আর ভেজা কানেক্টর — বর্ষায় ব্যাটারি ভালো রাখার ব্যবহারিক নিয়মগুলো।',
      en: 'Humidity, standing water and wet connectors — the practical rules for keeping a pack healthy in the rains.',
    },
    publishDate: '2026-04-02',
    slug: 'battery-care-monsoon',
    tags: ['battery', 'monsoon', 'maintenance'],
    title: {
      bn: 'বর্ষাকালে ব্যাটারির যত্ন কীভাবে নেবেন',
      en: 'How to look after your battery in the monsoon',
    },
  },
  {
    authorEmail: 'editor@voltride.com.bd',
    category: 'rider-stories',
    content: {
      bn: richText(
        headingNode('এক বছর, বারো হাজার কিলোমিটার'),
        paragraphNode(
          'তানভীর আহমেদ মিরপুরে থাকেন, চাকরি করেন মতিঝিলে। গত বছর মার্চে তিনি তাঁর ১৫০ সিসি পেট্রোল মোটরসাইকেল বিক্রি করে টিসি ম্যাক্স কিনেছিলেন। এক বছর পর তাঁর ওডোমিটারে ১২,৪০০ কিলোমিটার।',
        ),
        quoteNode(
          'প্রথম মাসে হিসাব রাখছিলাম কত বাঁচছে। এখন আর রাখি না, কারণ পার্থক্যটা এত বড় যে হিসাব করার দরকার হয় না।',
        ),
        paragraphNode(
          'তাঁর মতে সবচেয়ে বড় পরিবর্তন খরচে নয়, বরং যানজটে। গরম ইঞ্জিনের ওপর বসে সিগন্যালে দাঁড়িয়ে থাকা আর ঠান্ডা গাড়িতে দাঁড়িয়ে থাকা — দুইটা সম্পূর্ণ আলাদা অভিজ্ঞতা।',
        ),
        paragraphNode(
          'এক বছরে তাঁর খরচ হয়েছে দুইবার নিয়মিত সার্ভিস, একসেট ব্রেক প্যাড এবং পেছনের একটি টায়ার। ব্যাটারি এখনো ৯৪ শতাংশ ক্ষমতা ধরে রেখেছে — অ্যাপেই দেখা যায়।',
        ),
        paragraphNode(
          'তাঁর একটি অভিযোগও আছে: লম্বা যাত্রায় এখনো পথে চার্জিং পয়েন্ট কম। ঢাকার ভেতরে কোনো সমস্যা নেই, কিন্তু গ্রামের বাড়ি যেতে হলে এখনো পরিকল্পনা করে বের হতে হয়।',
        ),
      ),
      en: richText(
        headingNode('One year, twelve thousand kilometres'),
        paragraphNode(
          'Tanvir Ahmed lives in Mirpur and works in Motijheel. Last March he sold his 150cc petrol motorcycle and bought a TC Max. A year on, his odometer reads 12,400 km.',
        ),
        quoteNode(
          'For the first month I kept track of what I was saving. I stopped, because the gap is big enough that you do not need to do the arithmetic.',
        ),
        paragraphNode(
          'The biggest change, he says, is not the money but the traffic. Waiting at a signal on top of a hot engine and waiting on a cool bike are two completely different experiences.',
        ),
        paragraphNode(
          'Across the year his outlay has been two scheduled services, one set of brake pads and one rear tyre. The battery still holds 94 per cent of its capacity — the app shows it.',
        ),
        paragraphNode(
          'He has one complaint: there are still too few charging points on longer routes. Inside Dhaka it is a non-issue, but going to his village home still takes planning.',
        ),
      ),
    },
    cover: 'post-rider-story',
    excerpt: {
      bn: 'পেট্রোল মোটরসাইকেল বিক্রি করে টিসি ম্যাক্স — তানভীর আহমেদের এক বছরের হিসাব, ভালো ও মন্দ দুইটাই।',
      en: 'He sold a petrol motorcycle for a TC Max. Tanvir Ahmed’s first year, the good and the bad.',
    },
    publishDate: '2026-03-12',
    slug: 'tc-max-first-year',
    tags: ['rider-story', 'tc-max', 'ownership'],
    title: {
      bn: 'টিসি ম্যাক্সে তানভীরের প্রথম বছর',
      en: 'Tanvir’s first year on a TC Max',
    },
  },
]

type PageBlocks = NonNullable<Page['blocks']>

export type SeedPage = {
  blocks: { bn: PageBlocks; en: PageBlocks }
  metaDescription: { bn: string; en: string }
  metaImage: string
  metaTitle: { bn: string; en: string }
  slug: string
  title: { bn: string; en: string }
}

/** A failed image download must not break a page, so absent keys drop out. */
const galleryImages = (media: MediaMap, rows: { caption: string; key: string }[]) =>
  rows.flatMap((row) => {
    const image = media[row.key]
    return image ? [{ caption: row.caption, image }] : []
  })

/**
 * `blocks` is itself localized, so every locale carries its own array — there is
 * no row-id matching to preserve here, unlike the localized arrays on bikes.
 * Slugs stay clear of the file-system routes listed in the sitemap.
 */
export const seedPages = (media: MediaMap): SeedPage[] => [
  {
    blocks: {
      bn: [
        {
          backgroundImage: media['page-about-hero'] ?? null,
          blockType: 'hero',
          cta: { label: 'রেঞ্জ দেখুন', url: '/models' },
          heading: 'বাংলাদেশে তৈরি ইলেকট্রিক মোবিলিটি',
          subheading: 'ঢাকায় অ্যাসেম্বল, আটটি বিভাগে সার্ভিস, আর এদেশের রাস্তার জন্যই পরীক্ষিত।',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'ভোল্টরাইড শুরু হয়েছিল ২০২১ সালে একটি সাধারণ প্রশ্ন থেকে: বাংলাদেশের রাস্তা, বিদ্যুৎ আর বাজেটের জন্য যদি একেবারে গোড়া থেকে একটি ইলেকট্রিক গাড়ি বানানো হয়, সেটা দেখতে কেমন হবে?',
            ),
            paragraphNode(
              'আমদানি করা মডেল ব্যাজ বদলে বিক্রি করার বদলে আমরা ঢাকার কারখানায় অ্যাসেম্বলি লাইন গড়েছি। ফ্রেম, ব্যাটারি প্যাক ও কন্ট্রোলার এখানেই একত্র হয় এবং প্রতিটি ইউনিট রাস্তায় নামার আগে পরীক্ষা করা হয়।',
            ),
            headingNode('আমরা কীভাবে কাজ করি'),
            paragraphNode(
              'প্রতিটি নতুন মডেল অন্তত ২০,০০০ কিলোমিটার দেশের ভেতরে চালানো হয় — ঢাকার যানজট, সিলেটের ঢাল, বর্ষার জমা পানি আর গ্রামের ভাঙা রাস্তা সব মিলিয়ে। যা এখানে টেকে না, তা আমরা বিক্রি করি না।',
            ),
          ),
        },
        {
          blockType: 'featureGrid',
          features: [
            {
              description: 'সব প্যাক খুলে নেওয়া যায় এবং বাসার ২২০ভি সকেটেই চার্জ হয়।',
              icon: 'battery',
              title: 'খুলে নেওয়ার মতো ব্যাটারি',
            },
            {
              description: 'দেশজুড়ে ১৬টি কেন্দ্র, ১৩টিতে পূর্ণ সার্ভিস বে।',
              icon: 'service',
              title: 'আটটি বিভাগেই সার্ভিস',
            },
            {
              description: 'ফ্রেমে লাইফটাইম, ব্যাটারি ও মোটরে তিন বছরের ওয়ারেন্টি।',
              icon: 'warranty',
              title: 'স্পষ্ট ওয়ারেন্টি',
            },
            {
              description: 'ই-সাইকেলে প্রতি কিলোমিটারে খরচ প্রায় ১৫ পয়সা।',
              icon: 'cost',
              title: 'চালানোর খরচ কম',
            },
          ],
          heading: 'আমরা যা ঘিরে গাড়ি বানাই',
        },
        {
          blockType: 'gallery',
          images: galleryImages(media, [
            { caption: 'শোরুম, রাজশাহী।', key: 'page-gallery-1' },
            { caption: 'টেস্ট রাইড বে, খুলনা।', key: 'page-gallery-2' },
            { caption: 'সার্ভিস সেন্টার, চট্টগ্রাম।', key: 'page-gallery-3' },
          ]),
        },
        { blockType: 'testimonialsSection', heading: 'রাইডাররা যা বলছেন' },
        {
          blockType: 'cta',
          buttons: [
            { label: 'টেস্ট রাইড বুক করুন', style: 'primary', url: '/test-ride' },
            { label: 'শোরুম খুঁজুন', style: 'secondary', url: '/dealers' },
          ],
          heading: 'একবার চালিয়ে দেখুন',
          text: 'নিকটতম শোরুমে বিনামূল্যে টেস্ট রাইড বুক করুন। জাতীয় পরিচয়পত্র সঙ্গে আনলেই হবে।',
        },
      ],
      en: [
        {
          backgroundImage: media['page-about-hero'] ?? null,
          blockType: 'hero',
          cta: { label: 'See the range', url: '/models' },
          heading: 'Electric mobility, built in Bangladesh',
          subheading:
            'Assembled in Dhaka, serviced in all eight divisions, tested on the roads you ride.',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'VoltRide started in 2021 with a plain question: what would an electric vehicle look like if it were designed from scratch for Bangladeshi roads, Bangladeshi electricity and Bangladeshi budgets?',
            ),
            paragraphNode(
              'Rather than rebadge imported models we built an assembly line at our plant in Dhaka. Frames, battery packs and controllers come together here, and every unit is tested before it leaves.',
            ),
            headingNode('How we work'),
            paragraphNode(
              'Each new model covers at least 20,000 km in-country before launch — Dhaka traffic, Sylhet gradients, monsoon standing water and broken rural surfaces. If it does not survive that, we do not sell it.',
            ),
          ),
        },
        {
          blockType: 'featureGrid',
          features: [
            {
              description: 'Every pack lifts out and charges from an ordinary 220V socket at home.',
              icon: 'battery',
              title: 'Removable batteries',
            },
            {
              description: 'Sixteen centres nationwide, thirteen with a full service bay.',
              icon: 'service',
              title: 'Service in every division',
            },
            {
              description: 'Lifetime on the frame, three years on the battery and motor.',
              icon: 'warranty',
              title: 'A warranty in plain words',
            },
            {
              description: 'An e-cycle costs about ৳0.15 per kilometre to run.',
              icon: 'cost',
              title: 'Low running costs',
            },
          ],
          heading: 'What we build around',
        },
        {
          blockType: 'gallery',
          images: galleryImages(media, [
            { caption: 'Showroom floor, Rajshahi.', key: 'page-gallery-1' },
            { caption: 'Test ride bay, Khulna.', key: 'page-gallery-2' },
            { caption: 'Service centre, Chattogram.', key: 'page-gallery-3' },
          ]),
        },
        { blockType: 'testimonialsSection', heading: 'What riders tell us' },
        {
          blockType: 'cta',
          buttons: [
            { label: 'Book a test ride', style: 'primary', url: '/test-ride' },
            { label: 'Find a showroom', style: 'secondary', url: '/dealers' },
          ],
          heading: 'Ride one first',
          text: 'Book a free test ride at your nearest showroom. Bring your National ID and that is it.',
        },
      ],
    },
    metaDescription: {
      bn: 'ভোল্টরাইড কারা, ঢাকায় কী তৈরি হয় এবং কেন আমরা প্রতিটি মডেল দেশের রাস্তায় পরীক্ষা করি।',
      en: 'Who VoltRide is, what we build in Dhaka and why every model is tested on Bangladeshi roads.',
    },
    metaImage: media['og-default'],
    metaTitle: { bn: 'আমাদের সম্পর্কে — ভোল্টরাইড', en: 'About VoltRide' },
    slug: 'about',
    title: { bn: 'আমাদের সম্পর্কে', en: 'About VoltRide' },
  },
  {
    blocks: {
      bn: [
        {
          blockType: 'hero',
          heading: 'যোগাযোগ করুন',
          subheading:
            'বিক্রয়, সার্ভিস কিংবা ওয়ারেন্টি — যে বিষয়েই হোক, আমাদের টিম কর্মদিবসে সাড়া দেয়।',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'দ্রুত উত্তর পেতে ফোন বা হোয়াটসঅ্যাপই সবচেয়ে ভালো। ইমেইলে লিখলে সাধারণত এক কর্মদিবসের মধ্যে উত্তর পাবেন। অভিযোগ বা ওয়ারেন্টি দাবির ক্ষেত্রে সঙ্গে চেসিস নম্বর ও ক্রয় রসিদের ছবি দিলে কাজ অনেক দ্রুত হয়।',
            ),
            paragraphNode(
              'টেস্ট রাইড বা রিজার্ভেশনের জন্য আলাদা ফর্ম আছে — /test-ride এবং /reserve পাতা ব্যবহার করলে আপনার অনুরোধ সরাসরি নিকটতম শোরুমে পৌঁছায়।',
            ),
          ),
        },
        {
          blockType: 'specTable',
          heading: 'যোগাযোগের তথ্য',
          rows: [
            {
              label: 'প্রধান কার্যালয়',
              value: 'লেভেল ১, আমিন কোর্ট, ৬২-৬৩ মতিঝিল বাণিজ্যিক এলাকা, ঢাকা ১০০০',
            },
            { label: 'বিক্রয় হটলাইন', value: '+৮৮০ ১৭১১ ৪৫৬১২০' },
            { label: 'সার্ভিস হটলাইন', value: '+৮৮০ ১৭১১ ৪৫৬১২৫' },
            { label: 'হোয়াটসঅ্যাপ', value: '+৮৮০ ১৭১১ ৪৫৬১২০' },
            { label: 'ইমেইল', value: 'hello@voltride.com.bd' },
            { label: 'খোলা থাকে', value: 'শনি-বৃহস্পতি সকাল ৯:০০ - রাত ৮:০০, শুক্রবার বন্ধ' },
          ],
        },
        {
          blockType: 'cta',
          buttons: [
            { label: 'শোরুম খুঁজুন', style: 'primary', url: '/dealers' },
            { label: 'সাধারণ প্রশ্ন', style: 'secondary', url: '/faq' },
          ],
          heading: 'কাছের শোরুমে যান',
          text: 'আটটি বিভাগে ১৬টি কেন্দ্র — মানচিত্র থেকে আপনার নিকটতমটি বেছে নিন।',
        },
      ],
      en: [
        {
          blockType: 'hero',
          heading: 'Contact us',
          subheading: 'Sales, service or a warranty question — our team replies on working days.',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'Phone or WhatsApp is the fastest route to an answer. Email usually gets a reply within one working day. For a complaint or a warranty claim, send the chassis number and a photo of your purchase receipt with the first message and it moves much faster.',
            ),
            paragraphNode(
              'Test rides and reservations have their own forms — using /test-ride and /reserve sends your request straight to the nearest showroom.',
            ),
          ),
        },
        {
          blockType: 'specTable',
          heading: 'How to reach us',
          rows: [
            { label: 'Head office', value: 'Level 1, Amin Court, 62-63 Motijheel C/A, Dhaka 1000' },
            { label: 'Sales hotline', value: '+880 1711 456120' },
            { label: 'Service hotline', value: '+880 1711 456125' },
            { label: 'WhatsApp', value: '+880 1711 456120' },
            { label: 'Email', value: 'hello@voltride.com.bd' },
            { label: 'Open', value: 'Sat-Thu 9:00 AM - 8:00 PM, closed Friday' },
          ],
        },
        {
          blockType: 'cta',
          buttons: [
            { label: 'Find a showroom', style: 'primary', url: '/dealers' },
            { label: 'Read the FAQs', style: 'secondary', url: '/faq' },
          ],
          heading: 'Or visit a showroom',
          text: 'Sixteen centres across eight divisions — pick the closest one on the map.',
        },
      ],
    },
    metaDescription: {
      bn: 'ভোল্টরাইডের ফোন, হোয়াটসঅ্যাপ, ইমেইল ও প্রধান কার্যালয়ের ঠিকানা এবং খোলার সময়।',
      en: 'VoltRide phone, WhatsApp, email and head-office address, with opening hours.',
    },
    metaImage: media['og-default'],
    metaTitle: { bn: 'যোগাযোগ — ভোল্টরাইড', en: 'Contact VoltRide' },
    slug: 'contact',
    title: { bn: 'যোগাযোগ', en: 'Contact us' },
  },
  {
    blocks: {
      bn: [
        {
          blockType: 'hero',
          heading: 'ওয়ারেন্টি ও সার্ভিস',
          subheading: 'কী কভার হয়, কতদিন, আর কী কী কারণে ওয়ারেন্টি বাতিল হয় — সব এক জায়গায়।',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'প্রতিটি ভোল্টরাইডের সঙ্গে ওয়ারেন্টি কার্ড দেওয়া হয়। দাবি করার সময় কার্ড, ক্রয় রসিদ ও চেসিস নম্বর — এই তিনটি লাগবে, তাই এগুলো সংরক্ষণ করুন।',
            ),
            headingNode('যা কভার হয় না'),
            listNode([
              'স্বাভাবিক ক্ষয়: টায়ার, ব্রেক প্যাড, ব্রেক ডিস্ক, বাল্ব ও কেবল',
              'দুর্ঘটনা, পড়ে যাওয়া বা পানিতে ডুবে যাওয়ার ক্ষতি',
              'অনুমোদনহীন যন্ত্রাংশ, কন্ট্রোলার বা মোটরে পরিবর্তন',
              'নিজে ব্যাটারি প্যাক বা কন্ট্রোলার খোলা',
              'নির্ধারিত সার্ভিস না করানো',
            ]),
            paragraphNode(
              'প্রথম তিন মাসের সার্ভিস প্যাকেজ দামের মধ্যেই ধরা আছে। এরপর প্রতি ৩,০০০ কিলোমিটার বা ছয় মাসে একবার — যেটি আগে আসে — সার্ভিস করানোর পরামর্শ দিই। সার্ভিস রেকর্ড ওয়ারেন্টি দাবির সময় কাজে লাগে।',
            ),
          ),
        },
        {
          blockType: 'specTable',
          heading: 'ওয়ারেন্টির মেয়াদ',
          rows: [
            { label: 'ফ্রেম', value: 'লাইফটাইম (প্রথম ক্রেতার জন্য)' },
            { label: 'ব্যাটারি প্যাক', value: '৩ বছর বা ৩০,০০০ কিমি' },
            { label: 'মোটর', value: '৩ বছর বা ৩০,০০০ কিমি' },
            { label: 'কন্ট্রোলার', value: '২ বছর' },
            { label: 'চার্জার', value: '২ বছর' },
            { label: 'ডিসপ্লে ও ওয়্যারিং', value: '১ বছর' },
          ],
        },
        {
          blockType: 'faqSection',
          category: 'warranty',
          heading: 'ওয়ারেন্টি নিয়ে সাধারণ প্রশ্ন',
        },
        {
          blockType: 'cta',
          buttons: [
            { label: 'সার্ভিস সেন্টার খুঁজুন', style: 'primary', url: '/dealers' },
            { label: 'যোগাযোগ করুন', style: 'secondary', url: '/contact' },
          ],
          heading: 'সার্ভিস দরকার?',
          text: 'নিকটতম সার্ভিস বে খুঁজে নিন, অথবা সার্ভিস হটলাইনে ফোন করুন।',
        },
      ],
      en: [
        {
          blockType: 'hero',
          heading: 'Warranty and service',
          subheading: 'What is covered, for how long, and what voids it — all in one place.',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'Every VoltRide ships with a warranty card. A claim needs three things — the card, your purchase receipt and the chassis number — so keep them together.',
            ),
            headingNode('What is not covered'),
            listNode([
              'Wear items: tyres, brake pads, brake discs, bulbs and cables',
              'Damage from a collision, a drop or submersion',
              'Unapproved parts, or modifications to the controller or motor',
              'Opening the battery pack or controller yourself',
              'Skipping the scheduled services',
            ]),
            paragraphNode(
              'The first three-month service package is included in the price. After that we recommend a service every 3,000 km or six months, whichever comes first. A complete service record makes any later claim straightforward.',
            ),
          ),
        },
        {
          blockType: 'specTable',
          heading: 'Cover at a glance',
          rows: [
            { label: 'Frame', value: 'Lifetime, first owner' },
            { label: 'Battery pack', value: '3 years or 30,000 km' },
            { label: 'Motor', value: '3 years or 30,000 km' },
            { label: 'Controller', value: '2 years' },
            { label: 'Charger', value: '2 years' },
            { label: 'Display and wiring', value: '1 year' },
          ],
        },
        { blockType: 'faqSection', category: 'warranty', heading: 'Warranty questions' },
        {
          blockType: 'cta',
          buttons: [
            { label: 'Find a service centre', style: 'primary', url: '/dealers' },
            { label: 'Contact us', style: 'secondary', url: '/contact' },
          ],
          heading: 'Need a service?',
          text: 'Find your nearest service bay, or call the service hotline.',
        },
      ],
    },
    metaDescription: {
      bn: 'ভোল্টরাইডের ওয়ারেন্টির মেয়াদ, সার্ভিসের সময়সূচি এবং কোন কারণে ওয়ারেন্টি বাতিল হয়।',
      en: 'VoltRide warranty terms, the service schedule and exactly what voids your cover.',
    },
    metaImage: media['og-default'],
    metaTitle: { bn: 'ওয়ারেন্টি ও সার্ভিস — ভোল্টরাইড', en: 'Warranty and service — VoltRide' },
    slug: 'warranty',
    title: { bn: 'ওয়ারেন্টি ও সার্ভিস', en: 'Warranty and service' },
  },
  // Demo policy copy only — have counsel review before this goes live.
  {
    blocks: {
      bn: [
        {
          blockType: 'hero',
          heading: 'গোপনীয়তা নীতি',
          subheading: 'সর্বশেষ হালনাগাদ: ১ জুলাই ২০২৬',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'ভোল্টরাইড শুধু ততটুকু তথ্য নেয় যা আপনার অনুরোধ পূরণ করতে দরকার — টেস্ট রাইড বুকিং, রিজার্ভেশন, ওয়ারেন্টি নিবন্ধন কিংবা সার্ভিসের ইতিহাস।',
            ),
            headingNode('আমরা কী সংগ্রহ করি'),
            listNode([
              'নাম, ফোন নম্বর, ইমেইল ও শহর — ফর্ম পূরণের সময় আপনি যা দেন',
              'আপনার পছন্দের মডেল, রং ও শোরুম',
              'ওয়ারেন্টি নিবন্ধনের সময় চেসিস নম্বর ও ক্রয়ের তারিখ',
              'ওয়েবসাইট ব্যবহারের সাধারণ পরিসংখ্যান, যা কোনো ব্যক্তিকে চিহ্নিত করে না',
            ]),
            headingNode('আমরা কী করি না'),
            paragraphNode(
              'আমরা আপনার তথ্য বিক্রি করি না এবং বিজ্ঞাপনী প্ল্যাটফর্মে ভাড়া দিই না। শুধু যে শোরুম আপনার অনুরোধ পূরণ করবে এবং ইএমআই নিলে আপনার নির্বাচিত ঋণদাতা — তারাই তথ্য পায়।',
            ),
            headingNode('আপনার অধিকার'),
            paragraphNode(
              'যেকোনো সময় privacy@voltride.com.bd-এ লিখে আপনার তথ্য দেখতে, সংশোধন করতে বা মুছে ফেলতে বলতে পারেন। ওয়ারেন্টি ও বিক্রয়ের রেকর্ড আইনগত কারণে সংরক্ষণ করতে হয়, বাকি তথ্য ৩০ দিনের মধ্যে মুছে ফেলা হয়।',
            ),
            paragraphNode(
              'বিপণনের বার্তা পেতে না চাইলে যেকোনো এসএমএস বা ইমেইলের উত্তরে জানালেই যথেষ্ট; সার্ভিস ও ওয়ারেন্টি সংক্রান্ত জরুরি বার্তা তবু পাঠানো হবে।',
            ),
          ),
        },
      ],
      en: [
        {
          blockType: 'hero',
          heading: 'Privacy policy',
          subheading: 'Last updated: 1 July 2026',
        },
        {
          blockType: 'richText',
          content: richText(
            paragraphNode(
              'VoltRide collects only what it needs to act on your request — a test ride booking, a reservation, a warranty registration or a service history.',
            ),
            headingNode('What we collect'),
            listNode([
              'Name, phone number, email and city, as you enter them on a form',
              'The model, colour and showroom you are interested in',
              'Chassis number and purchase date, when you register a warranty',
              'Aggregate site usage statistics that do not identify anyone',
            ]),
            headingNode('What we do not do'),
            paragraphNode(
              'We do not sell your details and we do not rent them to advertising platforms. They go to the showroom handling your request and, if you apply for EMI, to the lender you choose.',
            ),
            headingNode('Your rights'),
            paragraphNode(
              'Write to privacy@voltride.com.bd at any time to see, correct or delete what we hold. Warranty and sales records have to be retained for legal reasons; everything else is deleted within 30 days.',
            ),
            paragraphNode(
              'To stop marketing messages, reply to any SMS or email and say so. Service and warranty notices will still reach you.',
            ),
          ),
        },
      ],
    },
    metaDescription: {
      bn: 'ভোল্টরাইড কী তথ্য নেয়, কেন নেয়, কার সঙ্গে ভাগ করে এবং আপনি কীভাবে তা মুছে ফেলতে পারেন।',
      en: 'What VoltRide collects, why, who it is shared with and how to have it deleted.',
    },
    metaImage: media['og-default'],
    metaTitle: { bn: 'গোপনীয়তা নীতি — ভোল্টরাইড', en: 'Privacy policy — VoltRide' },
    slug: 'privacy-policy',
    title: { bn: 'গোপনীয়তা নীতি', en: 'Privacy policy' },
  },
]
