export const locales = ["en", "id", "zh", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;
export type Category = "whole" | "ground" | "innovative";
export const localized = (en: string, id: string, zh: string, ar: string): Localized => ({ en, id, zh, ar });
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const company = {
  name: "PT. Sari Bhuwana Nusajaya",
  brand: "Aranaspice",
  origin: "https://www.saribhuwana.com",
  email: "pt.saribhuwana@gmail.com",
  phone: "+62 812-3381-141",
  phoneSecondary: "+62 813-3654-2475",
  whatsapp: "628123381141",
  address: "Taman Pinang Indah Blok GV/25, Sidoarjo Regency, East Java, Indonesia",
  pdf: "/downloads/aranaspice-company-profile-2026.pdf",
};

export const categories: Record<Category, Localized> = {
  whole: localized("Whole Spices", "Rempah Utuh", "整粒香料", "التوابل الكاملة"),
  ground: localized("Ground Spices", "Rempah Bubuk", "香料粉", "التوابل المطحونة"),
  innovative: localized("Innovative Products", "Produk Inovatif", "创新产品", "المنتجات المبتكرة"),
};
export const specLabels = {
  form: localized("Product form", "Bentuk produk", "产品形态", "شكل المنتج"),
  packing: localized("Packaging", "Kemasan", "包装", "التعبئة"),
  shelf: localized("Shelf life", "Masa simpan", "保质期", "مدة الصلاحية"),
  capacity: localized("Documented production capacity", "Kapasitas produksi dalam dokumen", "资料所载产能", "الطاقة الإنتاجية المذكورة في الوثيقة"),
  moisture: localized("Moisture", "Kadar air", "水分", "الرطوبة"),
  color: localized("Colour", "Warna", "颜色", "اللون"),
  curcumin: localized("Curcumin content", "Kandungan kurkumin", "姜黄素含量", "محتوى الكركمين"),
  foreign: localized("Foreign matter", "Benda asing", "杂质", "المواد الغريبة"),
  grade: localized("Quality / grade", "Mutu / grade", "品质／等级", "الجودة / الدرجة"),
  loading: localized("Container loading", "Muatan kontainer", "集装箱装载量", "حمولة الحاوية"),
  ingredients: localized("Ingredients", "Komposisi", "配料", "المكونات"),
};
export type Spec = { label: keyof typeof specLabels; value: Localized };
export type Product = { slug: string; category: Category; name: Localized; description: Localized; specs: Spec[]; source: string };
const retailPacking = localized("90 g / tube · 15 sachets × 6 g", "90 g / tabung · 15 sachet × 6 g", "每罐90克 · 15袋 × 6克", "90 غ / عبوة · 15 كيسًا × 6 غ");
const shelf = localized("18 months", "18 bulan", "18个月", "18 شهرًا");
const capacity = localized("10 tons / month", "10 ton / bulan", "10吨／月", "10 أطنان / شهر");
const groundSpecs: Spec[] = [{ label: "packing", value: retailPacking }, { label: "shelf", value: shelf }, { label: "capacity", value: capacity }];
const gingerSpecs: Spec[] = [...groundSpecs.slice(0, 2), { label: "capacity", value: localized("10 tons / month in the Ginger & Red Ginger entry; allocation to confirm", "10 ton / bulan pada entri Ginger & Red Ginger; alokasi perlu dikonfirmasi", "姜粉及红姜粉条目记载10吨／月；各产品分配需确认", "10 أطنان / شهر في بند الزنجبيل والزنجبيل الأحمر؛ يُرجى تأكيد التوزيع") }];

export const products: Product[] = [
  { slug: "dried-sliced-turmeric", category: "whole", name: localized("Dried Sliced Turmeric", "Irisan Kunyit Kering", "干姜黄片", "شرائح الكركم المجففة"), description: localized("Bright yellow dried turmeric slices, available for buyers sourcing Indonesian whole spices. Discuss your intended application and destination requirements with our team.", "Irisan kunyit kering berwarna kuning cerah untuk kebutuhan rempah Indonesia. Diskusikan penggunaan dan persyaratan negara tujuan bersama tim kami.", "色泽鲜黄的印尼干姜黄片，适合整料香料采购。请与我们沟通用途及目的地要求。", "شرائح كركم إندونيسية مجففة بلون أصفر زاهٍ. ناقشوا الاستخدام المقصود ومتطلبات بلد الوجهة مع فريقنا."), specs: [
    { label: "color", value: localized("Bright yellow", "Kuning cerah", "鲜黄色", "أصفر زاهٍ") },
    { label: "moisture", value: localized("10–13%", "10–13%", "10–13%", "10–13%") },
    { label: "curcumin", value: localized("4–5%", "4–5%", "4–5%", "4–5%") },
    { label: "foreign", value: localized("Approximately 2%", "Sekitar 2%", "约2%", "حوالي 2%") },
    { label: "packing", value: localized("PP bag · 40 kg net", "Karung PP · berat bersih 40 kg", "PP袋 · 净重40千克", "كيس بولي بروبيلين · الوزن الصافي 40 كغ") },
    { label: "capacity", value: localized("600 MT / year", "600 MT / tahun", "600公吨／年", "600 طن متري / سنة") },
  ], source: "Brief; Compro p.11 (ambiguous loading omitted)" },
  { slug: "dried-sliced-ginger", category: "whole", name: localized("Dried Sliced Ginger", "Irisan Jahe Kering", "干姜片", "شرائح الزنجبيل المجففة"), description: localized("Dried ginger in sliced form from our Indonesian spice range. Contact us to confirm the available specification, packing and volume for your market.", "Jahe dalam bentuk irisan kering dari rangkaian rempah Indonesia kami. Hubungi kami untuk spesifikasi, kemasan, dan volume sesuai pasar Anda.", "印尼香料系列的干姜片。请联系我们确认可供规格、包装及适合您市场的采购量。", "زنجبيل مجفف على هيئة شرائح من مجموعتنا الإندونيسية. تواصلوا لتأكيد المواصفات والتعبئة والكمية المناسبة لسوقكم."), specs: [], source: "Brief; Whole Spices/White Ginger.png" },
  { slug: "dried-sliced-galangal", category: "whole", name: localized("Dried Sliced Galangal", "Irisan Lengkuas Kering", "干南姜片", "شرائح الخولنجان المجففة"), description: localized("Sliced, dried galangal in the Aranaspice whole-spice collection. Our team can help confirm product requirements and availability for your inquiry.", "Lengkuas iris kering dalam koleksi rempah utuh Aranaspice. Tim kami membantu mengonfirmasi kebutuhan produk dan ketersediaan untuk inquiry Anda.", "Aranaspice整料香料系列的干南姜片。我们的团队可协助确认产品要求及供货情况。", "خولنجان مجفف ومقطع ضمن مجموعة التوابل الكاملة من Aranaspice. يساعدكم فريقنا في تأكيد متطلبات المنتج وتوافره."), specs: [], source: "Brief; Whole Spices/Dried Galangal.png" },
  { slug: "dried-sliced-curcuma", category: "whole", name: localized("Dried Sliced Curcuma", "Irisan Temulawak Kering", "干爪哇姜黄片", "شرائح كركم جاوة المجففة"), description: localized("Dried sliced curcuma (temulawak), part of our Indonesian herbal and spice selection. Request the current specification and a quotation for your requirements.", "Temulawak dalam bentuk irisan kering, bagian dari pilihan herbal dan rempah Indonesia kami. Minta spesifikasi terkini dan penawaran sesuai kebutuhan Anda.", "干爪哇姜黄切片（temulawak），属于我们的印尼草本及香料系列。请索取当前规格及报价。", "شرائح كركم جاوة المجففة (تيمولاواك)، ضمن تشكيلتنا من الأعشاب والتوابل الإندونيسية. اطلبوا المواصفات الحالية وعرض السعر."), specs: [], source: "Brief; Whole Spices/Dried Curcuma.png" },
  { slug: "mace", category: "whole", name: localized("Mace", "Bunga Pala", "肉豆蔻衣", "قشرة جوزة الطيب"), description: localized("Indonesian mace, hand-picked and sorted, with grades available for discussion. Confirm grade and packing against your buyer specification.", "Bunga pala Indonesia yang dipilih dan disortir secara manual, dengan grade yang dapat didiskusikan. Konfirmasikan grade dan kemasan sesuai spesifikasi buyer.", "人工挑选分级的印尼肉豆蔻衣。请根据采购要求确认等级及包装。", "قشرة جوزة الطيب الإندونيسية المنتقاة والمفرزة يدويًا. يُرجى تأكيد الدرجة والتعبئة وفق مواصفات المشتري."), specs: [
    { label: "grade", value: localized("Hand Picked Sorted (HPS), all grades", "Hand Picked Sorted (HPS), semua grade", "人工挑选分级（HPS），各等级", "منتقاة ومفرزة يدويًا (HPS)، جميع الدرجات") },
    { label: "moisture", value: localized("12–14%", "12–14%", "12–14%", "12–14%") },
    { label: "foreign", value: localized("Below 2%", "Di bawah 2%", "低于2%", "أقل من 2%") },
    { label: "packing", value: localized("Carton box / PP bag", "Karton / karung PP", "纸箱／PP袋", "صندوق كرتون / كيس بولي بروبيلين") },
    { label: "loading", value: localized("20 ft container / 5–6 MT", "Kontainer 20 kaki / 5–6 MT", "20英尺集装箱／5–6公吨", "حاوية 20 قدمًا / 5–6 أطنان مترية") },
    { label: "capacity", value: localized("40 MT / year", "40 MT / tahun", "40公吨／年", "40 طنًا متريًا / سنة") },
  ], source: "Compro p.11" },
  { slug: "nutmeg", category: "whole", name: localized("Nutmeg", "Biji Pala", "肉豆蔻", "جوزة الطيب"), description: localized("Whole nutmeg from the Indonesian spice collection. Discuss the grade, packing and volume needed for your distribution or processing business.", "Biji pala utuh dari koleksi rempah Indonesia. Diskusikan grade, kemasan, dan volume untuk kebutuhan distribusi atau pengolahan Anda.", "印尼香料系列的整粒肉豆蔻。欢迎沟通适合分销或加工业务的等级、包装及数量。", "جوزة الطيب الكاملة من مجموعة التوابل الإندونيسية. ناقشوا الدرجة والتعبئة والكمية المطلوبة لأعمال التوزيع أو التصنيع."), specs: [], source: "Brief; Whole Spices/Nutmeg.png" },
  { slug: "long-pepper", category: "whole", name: localized("Long Pepper", "Cabai Jawa", "荜茇", "الفلفل الطويل"), description: localized("Whole Indonesian long pepper, supplied in bulk packing documented in our company profile. Confirm the current specification and shipment arrangement with our team.", "Cabai jawa utuh dengan kemasan bulk yang tercantum dalam company profile. Konfirmasikan spesifikasi terkini dan pengaturan pengiriman bersama tim kami.", "印尼整粒荜茇，公司资料载有其散装包装信息。请与我们确认当前规格及运输安排。", "فلفل طويل إندونيسي كامل، بتعبئة سائبة موثقة في ملف الشركة. أكدوا المواصفات الحالية وترتيبات الشحن مع فريقنا."), specs: [
    { label: "moisture", value: localized("14–16%", "14–16%", "14–16%", "14–16%") },
    { label: "packing", value: localized("Jute bag · 50 kg / 70 kg net", "Karung goni · berat bersih 50 kg / 70 kg", "黄麻袋 · 净重50／70千克", "كيس خيش · الوزن الصافي 50 / 70 كغ") },
    { label: "loading", value: localized("20 ft container / 14 MT", "Kontainer 20 kaki / 14 MT", "20英尺集装箱／14公吨", "حاوية 20 قدمًا / 14 طنًا متريًا") },
    { label: "capacity", value: localized("60 MT / year", "60 MT / tahun", "60公吨／年", "60 طنًا متريًا / سنة") },
  ], source: "Compro p.12; 'Long Paper' normalized to Long Pepper" },
  { slug: "cubeb", category: "whole", name: localized("Cubeb", "Kemukus", "荜澄茄", "الكبابة"), description: localized("Whole cubeb from our Indonesian spice range, with documented moisture, packing and annual production information. Tell us your destination and required volume.", "Kemukus utuh dengan informasi kadar air, kemasan, dan kapasitas tahunan dalam dokumen perusahaan. Sampaikan negara tujuan dan kebutuhan volume Anda.", "印尼整粒荜澄茄，资料载有水分、包装及年产能信息。请告知目的地及所需数量。", "الكبابة الكاملة ضمن مجموعتنا الإندونيسية، مع معلومات موثقة عن الرطوبة والتعبئة والإنتاج السنوي. أخبرونا بالوجهة والكمية المطلوبة."), specs: [
    { label: "moisture", value: localized("14–16%", "14–16%", "14–16%", "14–16%") },
    { label: "packing", value: localized("PP bag · 50 kg net", "Karung PP · berat bersih 50 kg", "PP袋 · 净重50千克", "كيس بولي بروبيلين · الوزن الصافي 50 كغ") },
    { label: "loading", value: localized("20 ft container / 12 MT", "Kontainer 20 kaki / 12 MT", "20英尺集装箱／12公吨", "حاوية 20 قدمًا / 12 طنًا متريًا") },
    { label: "capacity", value: localized("30 MT / year", "30 MT / tahun", "30公吨／年", "30 طنًا متريًا / سنة") },
  ], source: "Compro p.12" },
  { slug: "clove", category: "whole", name: localized("Clove", "Cengkeh", "丁香", "القرنفل"), description: localized("Whole cloves in the Aranaspice Indonesian spice range. Contact our team for the available grade, product specification and a quotation.", "Cengkeh utuh dalam rangkaian rempah Indonesia Aranaspice. Hubungi tim kami untuk grade tersedia, spesifikasi produk, dan penawaran.", "Aranaspice印尼香料系列的整粒丁香。请联系团队了解可供等级、产品规格及报价。", "قرنفل كامل من مجموعة Aranaspice الإندونيسية. تواصلوا لمعرفة الدرجات المتاحة والمواصفات وعرض السعر."), specs: [], source: "Brief; Whole Spices/Clove_PT. SBN.png" },
  { slug: "candlenut", category: "whole", name: localized("Candlenut", "Kemiri", "石栗", "جوز الشموع"), description: localized("Candlenut from our whole-spice collection, shown in the company's supplied product packaging. Ask our team about the available packing and specification for your needs.", "Kemiri dari koleksi rempah utuh kami, ditampilkan dalam kemasan pada foto produk perusahaan. Tanyakan kemasan tersedia dan spesifikasi sesuai kebutuhan Anda.", "整料香料系列的石栗，图片采用公司提供的产品包装实拍。请询问适合您需求的包装及规格。", "جوز الشموع من مجموعة التوابل الكاملة، معروض في صورة التعبئة المقدمة من الشركة. استفسروا عن التعبئة والمواصفات المتاحة."), specs: [], source: "Brief; photo identity confirmed by user" },
  { slug: "turmeric-ground", category: "ground", name: localized("Turmeric Ground", "Bubuk Kunyit", "姜黄粉", "كركم مطحون"), description: localized("Selected turmeric from East Java in a convenient ground format. Presented in composite-can retail packaging with individually portioned sachets.", "Kunyit pilihan dari Jawa Timur dalam bentuk bubuk praktis. Dikemas dalam composite can retail dengan sachet berporsi individual.", "精选东爪哇姜黄制成粉末，以复合罐和独立小袋零售包装呈现。", "كركم مختار من جاوة الشرقية في صورة مسحوق عملي، بتعبئة تجزئة في عبوة مركبة وأكياس فردية."), specs: groundSpecs, source: "Compro p.6" },
  { slug: "ginger-ground", category: "ground", name: localized("Ginger Ground", "Bubuk Jahe", "姜粉", "زنجبيل مطحون"), description: localized("Ground ginger in Aranaspice composite-can packaging. Individual sachets provide a portioned format for your product selection.", "Bubuk jahe dalam kemasan composite can Aranaspice. Sachet individual memberikan format berporsi untuk pilihan produk Anda.", "采用Aranaspice复合罐包装的姜粉，配独立定量小袋。", "زنجبيل مطحون في عبوة Aranaspice المركبة مع أكياس فردية مقسمة."), specs: gingerSpecs, source: "Compro p.6 (shared ginger/red ginger entry)" },
  { slug: "red-ginger-ground", category: "ground", name: localized("Red Ginger Ground", "Bubuk Jahe Merah", "红姜粉", "زنجبيل أحمر مطحون"), description: localized("Red ginger in a ground, individually portioned format. Supplied in the Aranaspice retail composite can shown in our company profile.", "Jahe merah bubuk dengan sachet berporsi individual. Hadir dalam composite can retail Aranaspice sesuai company profile.", "红姜制成粉末并独立分装，采用公司资料中展示的Aranaspice零售复合罐。", "زنجبيل أحمر مطحون في أكياس فردية، داخل عبوة التجزئة المركبة من Aranaspice الموضحة في ملف الشركة."), specs: gingerSpecs, source: "Compro p.6 (shared ginger/red ginger entry)" },
  { slug: "white-pepper-ground", category: "ground", name: localized("White Pepper Ground", "Bubuk Lada Putih", "白胡椒粉", "فلفل أبيض مطحون"), description: localized("Pure white pepper, ground and packed in individual sachets within the Aranaspice composite can. Discuss retail or business supply requirements with us.", "Lada putih murni yang digiling dan dikemas dalam sachet individual di dalam composite can Aranaspice. Diskusikan kebutuhan retail atau pasokan bisnis bersama kami.", "纯白胡椒研磨后以独立小袋装入Aranaspice复合罐。欢迎沟通零售或商业供货需求。", "فلفل أبيض نقي مطحون ومعبأ في أكياس فردية داخل عبوة Aranaspice المركبة. ناقشوا معنا متطلبات التجزئة أو التوريد التجاري."), specs: groundSpecs, source: "Compro p.7" },
  { slug: "spice-mix-powder", category: "ground", name: localized("Spice Mix Powder", "Bubuk Rempah Campuran", "混合香料粉", "مسحوق مزيج التوابل"), description: localized("A combination of turmeric, ginger and red ginger in the Aranaspice Ground Spices Mix format. A three-spice selection to suit your flavour preferences.", "Kombinasi kunyit, jahe, dan jahe merah dalam format Aranaspice Ground Spices Mix. Pilihan tiga rempah untuk disesuaikan dengan preferensi rasa Anda.", "Aranaspice Ground Spices Mix结合姜黄、姜及红姜，提供三种香料选择以适应不同口味。", "مزيج من الكركم والزنجبيل والزنجبيل الأحمر في صيغة Aranaspice Ground Spices Mix، لاختيار النكهة المناسبة لتفضيلاتكم."), specs: [{ label: "ingredients", value: localized("Turmeric, ginger, red ginger", "Kunyit, jahe, jahe merah", "姜黄、姜、红姜", "كركم، زنجبيل، زنجبيل أحمر") }, ...groundSpecs], source: "Compro p.7" },
  { slug: "spice-chocolate", category: "innovative", name: localized("Spice Chocolate", "Cokelat Rempah", "香料巧克力", "شوكولاتة بالتوابل"), description: localized("Chocolate paired with Indonesian herbs and spices in Aranaspice's innovative product collection. Contains milk powder; discuss ingredients and your market's labelling requirements before ordering.", "Cokelat berpadu herbal dan rempah Indonesia dalam koleksi inovatif Aranaspice. Mengandung susu bubuk; diskusikan komposisi dan persyaratan label pasar tujuan sebelum pemesanan.", "Aranaspice创新系列将巧克力与印尼草本香料结合。含奶粉；订购前请确认配料及目的地标签要求。", "شوكولاتة ممزوجة بأعشاب وتوابل إندونيسية ضمن مجموعة Aranaspice المبتكرة. تحتوي على مسحوق الحليب؛ ناقشوا المكونات ومتطلبات الملصقات في سوقكم قبل الطلب."), specs: [
    { label: "packing", value: localized("30 g or 100 g bars in individual boxes; master box: 80 bars", "Batang 30 g atau 100 g dalam kotak individual; master box: 80 batang", "30克或100克独立盒装；每大箱80条", "ألواح 30 أو 100 غ في علب فردية؛ الكرتون الرئيسي: 80 لوحًا") },
    { label: "capacity", value: localized("75,000 pcs / year", "75.000 pcs / tahun", "75,000件／年", "75,000 قطعة / سنة") },
    { label: "ingredients", value: localized("Cocoa mass, cocoa fat, sugar, milk powder; Kaempferia galanga, Piper retrofractum, Curcuma zanthorrhiza, Andrographis paniculata, Zingiber officinale var rubrum rhizoma, Cymbopogon citratus, Curcuma longa, Piper betle linn, Moringa oleifera (document wording).", "Massa kakao, lemak kakao, gula, susu bubuk; Kaempferia galanga, Piper retrofractum, Curcuma zanthorrhiza, Andrographis paniculata, Zingiber officinale var rubrum rhizoma, Cymbopogon citratus, Curcuma longa, Piper betle linn, Moringa oleifera (sesuai penulisan dokumen).", "可可浆、可可脂、糖、奶粉；Kaempferia galanga、Piper retrofractum、Curcuma zanthorrhiza、Andrographis paniculata、Zingiber officinale var rubrum rhizoma、Cymbopogon citratus、Curcuma longa、Piper betle linn、Moringa oleifera（按原资料拼写）。", "كتلة الكاكاو، دهن الكاكاو، السكر، مسحوق الحليب؛ Kaempferia galanga, Piper retrofractum, Curcuma zanthorrhiza, Andrographis paniculata, Zingiber officinale var rubrum rhizoma, Cymbopogon citratus, Curcuma longa, Piper betle linn, Moringa oleifera (بتهجئة الوثيقة).") },
  ], source: "Compro p.9; ingredient spelling retained, no botanical inference" },
];

export const markets = [
  { name: localized("Egypt", "Mesir", "埃及", "مصر"), lat: 26.8, lon: 30.8 },
  { name: localized("India", "India", "印度", "الهند"), lat: 20.6, lon: 78.9 },
  { name: localized("Macau", "Macau", "澳门", "ماكاو"), lat: 22.2, lon: 113.55 },
  { name: localized("Japan", "Jepang", "日本", "اليابان"), lat: 36.2, lon: 138.3 },
  { name: localized("Denmark", "Denmark", "丹麦", "الدنمارك"), lat: 56.3, lon: 9.5 },
  { name: localized("Hong Kong", "Hong Kong", "香港", "هونغ كونغ"), lat: 22.3, lon: 114.2 },
  { name: localized("Vietnam", "Vietnam", "越南", "فيتنام"), lat: 14.1, lon: 108.3 },
  { name: localized("Australia", "Australia", "澳大利亚", "أستراليا"), lat: -25.3, lon: 133.8 },
  { name: localized("Saudi Arabia", "Arab Saudi", "沙特阿拉伯", "المملكة العربية السعودية"), lat: 23.9, lon: 45.1 },
  { name: localized("United Kingdom", "Britania Raya", "英国", "المملكة المتحدة"), lat: 55.4, lon: -3.4 },
  { name: localized("Nigeria", "Nigeria", "尼日利亚", "نيجيريا"), lat: 9.1, lon: 8.7 },
];
