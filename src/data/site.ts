import type { Bi } from '../i18n/LangContext'
import { img } from './images'

/** Company details (placeholders for the demo). Social links are intentionally empty until approved. */
export const company = {
  phone: '+966 50 000 0000',
  whatsapp: '966500000000',
  email: 'info@armal.sa',
  address: { ar: 'طريق الملك فهد، حي العليا، الرياض', en: 'King Fahd Road, Al Olaya, Riyadh' } as Bi,
  socials: ['x', 'instagram', 'snapchat', 'tiktok', 'linkedin'] as const,
}

export type Mode = 'buy' | 'rent'
export type TypeId = 'villa' | 'apartment' | 'townhouse' | 'office' | 'land'

export const types: { id: TypeId; label: Bi; plural: Bi }[] = [
  { id: 'villa', label: { ar: 'فيلا', en: 'Villa' }, plural: { ar: 'فلل', en: 'Villas' } },
  { id: 'apartment', label: { ar: 'شقة', en: 'Apartment' }, plural: { ar: 'شقق', en: 'Apartments' } },
  { id: 'townhouse', label: { ar: 'تاون هاوس', en: 'Townhouse' }, plural: { ar: 'تاون هاوس', en: 'Townhouses' } },
  { id: 'office', label: { ar: 'مكتب', en: 'Office' }, plural: { ar: 'مكاتب', en: 'Offices' } },
  { id: 'land', label: { ar: 'أرض', en: 'Land' }, plural: { ar: 'أراضٍ', en: 'Land' } },
]

export const cities: { id: string; name: Bi; image: string }[] = [
  { id: 'riyadh', name: { ar: 'الرياض', en: 'Riyadh' }, image: img('tower-2') },
  { id: 'jeddah', name: { ar: 'جدة', en: 'Jeddah' }, image: img('villa-2') },
  { id: 'dammam', name: { ar: 'الدمام', en: 'Dammam' }, image: img('town-2') },
  { id: 'khobar', name: { ar: 'الخبر', en: 'Al Khobar' }, image: img('tower-3') },
]

export type Agent = { id: string; name: Bi; role: Bi; initials: string }
export const agents: Agent[] = [
  { id: 'a1', name: { ar: 'فهد العتيبي', en: 'Fahad Al-Otaibi' }, role: { ar: 'مستشار عقاري أول', en: 'Senior property advisor' }, initials: 'FA' },
  { id: 'a2', name: { ar: 'سارة القحطاني', en: 'Sarah Al-Qahtani' }, role: { ar: 'مستشارة تأجير', en: 'Leasing advisor' }, initials: 'SQ' },
  { id: 'a3', name: { ar: 'خالد الشهري', en: 'Khalid Al-Shehri' }, role: { ar: 'مستشار عقارات تجارية', en: 'Commercial advisor' }, initials: 'KS' },
]

export type Room = { id: string; name: Bi; x: number; y: number; w: number; h: number; image: string; size: number }
export type Property = {
  id: string
  title: Bi
  mode: Mode
  type: TypeId
  city: string
  district: Bi
  price: number
  beds: number
  baths: number
  area: number
  year: number
  images: string[]
  /** placeholder/photo names, used to pick room photos */
  photos?: string[]
  features: Bi[]
  description: Bi
  agent: string
  isNew?: boolean
  featured?: boolean
  added: number
}

const F = {
  pool: { ar: 'مسبح خاص', en: 'Private pool' },
  garden: { ar: 'حديقة', en: 'Garden' },
  maid: { ar: 'غرفة خادمة', en: 'Maid’s room' },
  driver: { ar: 'غرفة سائق', en: 'Driver’s room' },
  parking: { ar: 'موقف خاص', en: 'Private parking' },
  smart: { ar: 'نظام منزل ذكي', en: 'Smart home system' },
  ac: { ar: 'تكييف مركزي', en: 'Central A/C' },
  elevator: { ar: 'مصعد', en: 'Elevator' },
  gym: { ar: 'نادي رياضي', en: 'Gym' },
  security: { ar: 'حراسة 24 ساعة', en: '24h security' },
  majlis: { ar: 'مجلس رجال', en: 'Men’s majlis' },
  view: { ar: 'إطلالة مفتوحة', en: 'Open view' },
  furnished: { ar: 'مفروشة بالكامل', en: 'Fully furnished' },
  balcony: { ar: 'شرفة', en: 'Balcony' },
  reception: { ar: 'استقبال', en: 'Reception' },
  meeting: { ar: 'قاعات اجتماعات', en: 'Meeting rooms' },
  corner: { ar: 'زاوية على شارعين', en: 'Corner plot, two streets' },
  deed: { ar: 'صك إلكتروني', en: 'Electronic title deed' },
}

const d = (ar: string, en: string): Bi => ({ ar, en })

const raw: Property[] = [
  { id: 'AR-1021', title: d('فيلا حديثة بمسبح في الملقا', 'Modern villa with pool in Al Malqa'), mode: 'buy', type: 'villa', city: 'riyadh', district: d('الملقا', 'Al Malqa'), price: 4850000, beds: 5, baths: 6, area: 520, year: 2023, images: ['villa-1', 'living-1', 'kitchen-1', 'bed-1', 'bath-1'], features: [F.pool, F.majlis, F.maid, F.driver, F.smart, F.ac], description: d('فيلا مستقلة بتصميم معاصر على شارع هادئ، بمساحات معيشة مفتوحة ومسبح خاص وحديقة، وقريبة من المدارس الدولية وطريق الملك سلمان.', 'A detached villa with a contemporary design on a quiet street, with open living spaces, a private pool and garden, close to international schools and King Salman Road.'), agent: 'a1', featured: true, isNew: true, added: 20 },
  { id: 'AR-1034', title: d('شقة بإطلالة في برج العليا', 'View apartment in Al Olaya tower'), mode: 'buy', type: 'apartment', city: 'riyadh', district: d('العليا', 'Al Olaya'), price: 1650000, beds: 3, baths: 3, area: 185, year: 2022, images: ['tower-1', 'living-2', 'bed-2', 'kitchen-2'], features: [F.view, F.elevator, F.gym, F.security, F.parking, F.balcony], description: d('شقة في الطابق الثامن عشر بإطلالة مفتوحة على أفق الرياض، مع نادٍ رياضي وحراسة على مدار الساعة.', 'An 18th-floor apartment with open views over the Riyadh skyline, plus a gym and round-the-clock security.'), agent: 'a1', featured: true, added: 18 },
  { id: 'AR-1042', title: d('تاون هاوس عائلي في النرجس', 'Family townhouse in Al Narjis'), mode: 'buy', type: 'townhouse', city: 'riyadh', district: d('النرجس', 'Al Narjis'), price: 2350000, beds: 4, baths: 4, area: 310, year: 2024, images: ['town-1', 'living-3', 'bed-1', 'kitchen-1'], features: [F.garden, F.maid, F.parking, F.ac, F.smart], description: d('تاون هاوس جديد ضمن مجمع سكني مسوّر بحدائق مشتركة وممرات مشاة، مثالي للعائلات.', 'A brand-new townhouse in a gated community with shared gardens and walkways, ideal for families.'), agent: 'a2', isNew: true, added: 19 },
  { id: 'AR-1055', title: d('شقة مفروشة للإيجار في حطين', 'Furnished apartment for rent in Hittin'), mode: 'rent', type: 'apartment', city: 'riyadh', district: d('حطين', 'Hittin'), price: 85000, beds: 2, baths: 2, area: 140, year: 2021, images: ['tower-2', 'living-1', 'bed-2', 'bath-1'], features: [F.furnished, F.elevator, F.parking, F.ac, F.balcony], description: d('شقة مفروشة بالكامل جاهزة للسكن، قريبة من بوليفارد الرياض وطريق الملك فهد.', 'A fully furnished, move-in-ready apartment close to Riyadh Boulevard and King Fahd Road.'), agent: 'a2', featured: true, added: 17 },
  { id: 'AR-1063', title: d('مكتب إداري في طريق الملك فهد', 'Office floor on King Fahd Road'), mode: 'rent', type: 'office', city: 'riyadh', district: d('الورود', 'Al Wurud'), price: 320000, beds: 0, baths: 4, area: 420, year: 2020, images: ['office-1', 'office-2', 'living-2'], features: [F.reception, F.meeting, F.elevator, F.parking, F.security], description: d('دور مكتبي كامل بواجهة زجاجية على طريق الملك فهد، مع استقبال وقاعات اجتماعات ومواقف للموظفين.', 'A full office floor with a glass façade on King Fahd Road, with reception, meeting rooms and staff parking.'), agent: 'a3', featured: true, added: 15 },
  { id: 'AR-1071', title: d('أرض سكنية على شارعين في الياسمين', 'Corner residential plot in Al Yasmin'), mode: 'buy', type: 'land', city: 'riyadh', district: d('الياسمين', 'Al Yasmin'), price: 2900000, beds: 0, baths: 0, area: 900, year: 2026, images: ['land-1'], features: [F.corner, F.deed], description: d('أرض سكنية زاوية على شارعين بعرض 20 و15 متراً، جاهزة للبناء في حي مكتمل الخدمات.', 'A corner residential plot on 20m and 15m streets, ready to build in a fully serviced district.'), agent: 'a3', added: 12 },
  { id: 'AR-2014', title: d('فيلا قريبة من البحر في أبحر', 'Villa near the sea in Obhur'), mode: 'buy', type: 'villa', city: 'jeddah', district: d('أبحر الشمالية', 'North Obhur'), price: 5600000, beds: 6, baths: 7, area: 640, year: 2022, images: ['villa-2', 'living-3', 'kitchen-2', 'bed-1', 'bath-1'], features: [F.pool, F.garden, F.majlis, F.maid, F.driver, F.view], description: d('فيلا واسعة على بعد دقائق من الواجهة البحرية، بمسبح وحديقة ومجلس مستقل.', 'A spacious villa minutes from the waterfront, with a pool, garden and separate majlis.'), agent: 'a1', featured: true, added: 16 },
  { id: 'AR-2027', title: d('شقة للإيجار على الكورنيش', 'Corniche apartment for rent'), mode: 'rent', type: 'apartment', city: 'jeddah', district: d('الشاطئ', 'Al Shati'), price: 110000, beds: 3, baths: 3, area: 200, year: 2019, images: ['tower-3', 'living-2', 'bed-2', 'kitchen-1'], features: [F.view, F.balcony, F.elevator, F.security, F.parking], description: d('شقة بإطلالة على البحر الأحمر في برج على الكورنيش، بشرفة واسعة.', 'An apartment overlooking the Red Sea in a Corniche tower, with a wide balcony.'), agent: 'a2', added: 14 },
  { id: 'AR-2039', title: d('تاون هاوس للإيجار في الروضة', 'Townhouse for rent in Al Rawdah'), mode: 'rent', type: 'townhouse', city: 'jeddah', district: d('الروضة', 'Al Rawdah'), price: 140000, beds: 4, baths: 4, area: 280, year: 2020, images: ['town-2', 'living-1', 'bed-1'], features: [F.garden, F.parking, F.maid, F.ac], description: d('تاون هاوس بحديقة خاصة في حي هادئ وسط جدة.', 'A townhouse with a private garden in a quiet central Jeddah district.'), agent: 'a2', added: 9 },
  { id: 'AR-3011', title: d('فيلا دوبلكس في الشاطئ الغربي', 'Duplex villa in Al Shati Al Gharbi'), mode: 'buy', type: 'villa', city: 'dammam', district: d('الشاطئ الغربي', 'Al Shati Al Gharbi'), price: 3200000, beds: 5, baths: 5, area: 450, year: 2021, images: ['villa-3', 'living-2', 'kitchen-1', 'bed-2'], features: [F.majlis, F.maid, F.driver, F.parking, F.ac], description: d('فيلا دوبلكس بتشطيبات فاخرة قريبة من الواجهة البحرية في الدمام.', 'A duplex villa with premium finishes close to the Dammam waterfront.'), agent: 'a1', added: 11 },
  { id: 'AR-3022', title: d('شقة عائلية في الفيصلية', 'Family apartment in Al Faisaliyah'), mode: 'buy', type: 'apartment', city: 'dammam', district: d('الفيصلية', 'Al Faisaliyah'), price: 780000, beds: 3, baths: 2, area: 160, year: 2018, images: ['tower-1', 'living-3', 'bed-1'], features: [F.elevator, F.parking, F.ac], description: d('شقة عملية بسعر مناسب في حي مخدوم قريب من المدارس والأسواق.', 'A practical, well-priced apartment in a well-served district near schools and shops.'), agent: 'a2', added: 8 },
  { id: 'AR-3035', title: d('فيلا للإيجار في الفيحاء', 'Villa for rent in Al Fayha'), mode: 'rent', type: 'villa', city: 'dammam', district: d('الفيحاء', 'Al Fayha'), price: 165000, beds: 5, baths: 5, area: 420, year: 2017, images: ['villa-1', 'living-1', 'bed-2'], features: [F.garden, F.majlis, F.maid, F.parking], description: d('فيلا عائلية للإيجار السنوي بحديقة ومجلس كبير.', 'A family villa for yearly rent with a garden and large majlis.'), agent: 'a2', added: 7 },
  { id: 'AR-4018', title: d('شقة بإطلالة بحرية في الخبر', 'Sea-view apartment in Al Khobar'), mode: 'buy', type: 'apartment', city: 'khobar', district: d('الكورنيش', 'Corniche'), price: 1450000, beds: 3, baths: 3, area: 175, year: 2023, images: ['tower-3', 'living-2', 'kitchen-2', 'bath-1'], features: [F.view, F.gym, F.pool, F.security, F.elevator], description: d('شقة حديثة على كورنيش الخبر مع مسبح ونادٍ رياضي مشترك.', 'A modern apartment on the Khobar Corniche with a shared pool and gym.'), agent: 'a1', featured: true, isNew: true, added: 13 },
  { id: 'AR-4026', title: d('مكتب للإيجار في العقربية', 'Office for rent in Al Aqrabiyah'), mode: 'rent', type: 'office', city: 'khobar', district: d('العقربية', 'Al Aqrabiyah'), price: 185000, beds: 0, baths: 2, area: 240, year: 2019, images: ['office-2', 'office-1'], features: [F.reception, F.meeting, F.parking], description: d('مكتب جاهز بتقسيمات حديثة في موقع تجاري حيوي.', 'A ready-to-use office with modern partitions in a busy commercial location.'), agent: 'a3', added: 6 },
  { id: 'AR-4033', title: d('تاون هاوس في الراكة', 'Townhouse in Al Rakah'), mode: 'buy', type: 'townhouse', city: 'khobar', district: d('الراكة', 'Al Rakah'), price: 1950000, beds: 4, baths: 3, area: 260, year: 2022, images: ['town-1', 'living-1', 'bed-2', 'kitchen-1'], features: [F.garden, F.parking, F.ac, F.smart], description: d('تاون هاوس بتصميم عصري قريب من جامعة الملك فهد.', 'A contemporary townhouse close to King Fahd University.'), agent: 'a2', added: 10 },
  { id: 'AR-4041', title: d('شقة استوديو للإيجار في الثقبة', 'Studio for rent in Al Thuqbah'), mode: 'rent', type: 'apartment', city: 'khobar', district: d('الثقبة', 'Al Thuqbah'), price: 42000, beds: 1, baths: 1, area: 70, year: 2016, images: ['tower-2', 'bed-2', 'bath-1'], features: [F.furnished, F.ac, F.parking], description: d('استوديو مفروش مناسب للأفراد، قريب من الخدمات.', 'A furnished studio suited to individuals, close to amenities.'), agent: 'a2', added: 5 },
  { id: 'AR-1088', title: d('أرض تجارية في شمال الرياض', 'Commercial plot in north Riyadh'), mode: 'buy', type: 'land', city: 'riyadh', district: d('القيروان', 'Al Qirawan'), price: 4100000, beds: 0, baths: 0, area: 1500, year: 2026, images: ['land-1'], features: [F.corner, F.deed], description: d('أرض تجارية على طريق رئيسي مناسبة لمشروع تجزئة أو مكاتب.', 'A commercial plot on a main road, suited to a retail or office project.'), agent: 'a3', added: 4 },
  { id: 'AR-1094', title: d('فيلا للإيجار في الصحافة', 'Villa for rent in Al Sahafah'), mode: 'rent', type: 'villa', city: 'riyadh', district: d('الصحافة', 'Al Sahafah'), price: 240000, beds: 6, baths: 6, area: 560, year: 2020, images: ['villa-3', 'living-3', 'bed-1', 'kitchen-2'], features: [F.pool, F.garden, F.majlis, F.maid, F.driver], description: d('فيلا واسعة بمسبح للإيجار السنوي في شمال الرياض.', 'A spacious villa with a pool for yearly rent in north Riyadh.'), agent: 'a1', added: 3 },
]

export const properties: Property[] = raw.map((p) => ({ ...p, photos: p.images, images: p.images.map(img) }))

export const getProperty = (id?: string) => properties.find((p) => p.id === id)

/** Rooms on the illustrative floor plan (coordinates in a 400 × 300 drawing). */
export function planFor(p: Property): Room[] {
  const names = p.photos ?? []
  const pick = (i: number) => img(names[i % names.length])
  const find = (k: string, i: number) => { const n = names.find((x) => x.includes(k)); return n ? img(n) : pick(i) }
  if (p.type === 'land') return []
  if (p.type === 'office') return [
    { id: 'r', name: d('الاستقبال', 'Reception'), x: 10, y: 10, w: 150, h: 110, image: pick(0), size: 60 },
    { id: 'o', name: d('مساحة العمل', 'Open workspace'), x: 160, y: 10, w: 230, h: 180, image: pick(1), size: 220 },
    { id: 'm', name: d('قاعة الاجتماعات', 'Meeting room'), x: 10, y: 120, w: 150, h: 170, image: pick(2), size: 70 },
    { id: 'k', name: d('المطبخ', 'Pantry'), x: 160, y: 190, w: 110, h: 100, image: pick(0), size: 30 },
    { id: 'w', name: d('دورات المياه', 'Restrooms'), x: 270, y: 190, w: 120, h: 100, image: pick(1), size: 40 },
  ]
  const big = p.area > 300
  return [
    { id: 'l', name: d('الصالة', 'Living room'), x: 10, y: 10, w: 220, h: 150, image: find('living', 1), size: Math.round(p.area * 0.22) },
    { id: 'k', name: d('المطبخ', 'Kitchen'), x: 230, y: 10, w: 160, h: 110, image: find('kitchen', 2), size: Math.round(p.area * 0.1) },
    { id: 'b', name: d('غرفة النوم الرئيسية', 'Master bedroom'), x: 10, y: 160, w: 170, h: 130, image: find('bed', 3), size: Math.round(p.area * 0.14) },
    { id: 'w', name: d('الحمام', 'Bathroom'), x: 180, y: 160, w: 90, h: 130, image: find('bath', 0), size: Math.round(p.area * 0.05) },
    { id: big ? 'm' : 'b2', name: big ? d('المجلس', 'Majlis') : d('غرفة نوم', 'Bedroom'), x: 270, y: 120, w: 120, h: 170, image: big ? find('living', 1) : find('bed', 1), size: Math.round(p.area * 0.12) },
  ]
}
