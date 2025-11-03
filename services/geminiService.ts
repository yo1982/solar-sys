
import { AgriculturalData, HomeData, SystemType } from '../types';

const generateBasePrompt = (data: AgriculturalData | HomeData) => `
أنت خبير تصميم أنظمة الطاقة الشمسية في شركة عوض الفهيم للمواد الكهربائية في العراق. مهمتك هي تحليل متطلبات العميل وتقديم حلين مميزين لأنظمة الطاقة الشمسية: 'النظام الاقتصادي' و 'النظام الممتاز'.

متطلبات العميل:
- نوع النظام: ${data.type === 'agricultural' ? 'زراعي' : 'منزلي'}
- المحافظة: ${data.governorate}
- المنطقة: ${data.region}
`;

const generateAgriculturalPrompt = (data: AgriculturalData) => `
${generateBasePrompt(data)}
- نوع المضخة: ${data.pumpType === 'submersible' ? 'غاطسة' : 'سطحية (ماتور)'}
- القدرة بالحصان: ${data.power} حصان
`;

const generateHomePrompt = (data: HomeData) => `
${generateBasePrompt(data)}
- الأمبير المطلوب نهاراً: ${data.dayAmperage} أمبير
- الأمبير المطلوب ليلاً: ${data.nightAmperage} أمبير
- توفر الكهرباء الوطنية: ${data.hasNationalGrid ? 'نعم' : 'لا'}
- عدد ساعات انقطاع الكهرباء الوطنية: ${data.hasNationalGrid ? data.outageHours : 'غير متوفر'} ساعات
`;

const promptSuffix = `
بناءً على هذه المتطلبات، وبالاعتماد على بياناتك الفنية وأسعارك التقديرية للسوق العراقي، قم بإنشاء استجابة بصيغة JSON. يجب أن يحتوي كائن JSON على مفتاحين: 'economy' و 'premium'.

لكل اقتراح نظام، قدم التفاصيل التالية:
- name: "النظام الاقتصادي" أو "النظام الممتاز"
- rationale: شرح احترافي وموجز باللغة العربية يوضح سبب ملاءمة هذا النظام للعميل.
- components: مصفوفة من الكائنات، كل كائن يحتوي على 'name' (اسم المكون باللغة العربية) و 'specification' (مواصفاته الفنية باللغة العربية). يجب أن تشمل المكونات الرئيسية مثل الألواح، الانفرتر، البطاريات (إذا لزم الأمر)، هياكل التثبيت، والكابلات.
- protection: "IP20" للنظام الاقتصادي، و "IP65" للنظام الممتاز.
- warranty: "سنتان" للنظام الاقتصادي، و "عشر سنوات" للنظام الممتاز.
- price: السعر الإجمالي بالدينار العراقي (مثال: "3,500,000 د.ع").

قيود:
- يجب أن تكون الاستجابة بالكامل باللغة العربية.
- يجب أن يكون الإخراج كائن JSON صالحًا تمامًا ويتبع المخطط المحدد بدقة.
- يجب أن تكون الأسعار والمكونات واقعية ومناسبة للسوق العراقي.

لا تقم بتضمين أي نص أو علامات markdown قبل أو بعد كائن JSON. الإخراج يجب أن يكون فقط كائن JSON صالح.
`;

export const generatePrompt = (type: SystemType, data: AgriculturalData | HomeData): string => {
  let specificPrompt;
  if (type === 'agricultural') {
    specificPrompt = generateAgriculturalPrompt(data as AgriculturalData);
  } else {
    specificPrompt = generateHomePrompt(data as HomeData);
  }
  return specificPrompt + promptSuffix;
};
