/* Learner-language support. English passages remain untouched and left-to-right. */
(function(){
"use strict";
const UI={
ar:{
"Reading settings":"إعدادات القراءة","Make reading yours":"خصّص تجربة القراءة","Choose how the story looks and sounds":"اختر شكل القصة وصوت القراءة","WORD DISPLAY":"طريقة عرض الكلمات","Syllables":"المقاطع الصوتية","Mixed":"مختلط","Normal":"عادي","TEXT SIZE":"حجم النص","Reading text":"نص القراءة","Show a soft border around each word":"إظهار إطار خفيف حول كل كلمة","Follow the highlighted word while listening":"تابع الكلمة المظللة أثناء الاستماع","NARRATOR VOICE":"صوت الراوي","LEARNER LANGUAGE":"لغة المتعلّم","Choose a story":"اختر قصة","FIND A CHAPTER":"ابحث عن فصل","Search reading passages…":"ابحث في نصوص القراءة…","Reader tip":"نصيحة للقراءة","Try reading a sentence twice: first slowly, then smoothly.":"اقرأ الجملة مرتين: ببطء أولاً، ثم بسلاسة.","Chapters":"الفصول","Copy lesson link":"نسخ رابط الدرس","Meaning":"المعنى","Hear meaning":"استمع إلى المعنى","Slower":"أبطأ","Faster":"أسرع","Expand":"توسيع","Ready when you are":"أنا مستعد عندما تكون","Previous":"السابق","Next page":"الصفحة التالية","Choose a story, then enjoy reading.":"اختر قصة، ثم استمتع بالقراءة.","Read in ordinary English spelling. Tap any word to hear it and explore its meaning.":"اقرأ بالتهجئة الإنجليزية المعتادة. اضغط على أي كلمة لسماعها ومعرفة معناها.","Longer words are divided into syllables. Tap any word to hear it and explore its meaning.":"تُقسّم الكلمات الطويلة إلى مقاطع صوتية. اضغط على أي كلمة لسماعها ومعرفة معناها.","Longer words are divided; shorter words stay whole. Tap any word to hear it and explore its meaning.":"تُقسّم الكلمات الطويلة وتبقى القصيرة كاملة. اضغط على أي كلمة لسماعها ومعرفة معناها.","English meaning (translation not available yet):":"المعنى بالإنجليزية (الترجمة غير متاحة بعد): ","Finding a simple dictionary definition…":"جارٍ البحث عن معنى بسيط في القاموس…","Looking up a learner-friendly dictionary meaning…":"جارٍ البحث عن معنى مناسب للمتعلّم…","Home":"الرئيسية","Reading":"القراءة","Rhymes":"أناشيد تعليمية","My speech stage":"منصة التحدث","Flags":"الأعلام","About us":"من نحن","For grown-ups":"للكبار","Let’s start reading":"هيا نبدأ القراءة","Science & Nature":"العلوم والطبيعة","Akhlaq":"الأخلاق","Aqaid":"العقائد","Qur'an & Ahlulbayt":"القرآن وأهل البيت","People & Society":"الناس والمجتمع","Thinking & Discovery":"التفكير والاكتشاف","Sahifa Sajjadiya":"الصحيفة السجادية","All":"الكل"
},
fa:{
"Reading settings":"تنظیمات خواندن","Make reading yours":"خواندن را مطابق سلیقه‌ات تنظیم کن","Choose how the story looks and sounds":"ظاهر داستان و صدای خواندن را انتخاب کن","WORD DISPLAY":"نمایش واژه‌ها","Syllables":"بخش‌های آوایی","Mixed":"ترکیبی","Normal":"معمولی","TEXT SIZE":"اندازهٔ متن","Reading text":"متن خواندن","Show a soft border around each word":"نمایش کادر کم‌رنگ دور هر واژه","Follow the highlighted word while listening":"هنگام شنیدن، واژهٔ مشخص‌شده را دنبال کن","NARRATOR VOICE":"صدای راوی","LEARNER LANGUAGE":"زبان زبان‌آموز","Choose a story":"یک داستان انتخاب کن","FIND A CHAPTER":"پیدا کردن فصل","Search reading passages…":"جست‌وجو در متن‌های خواندنی…","Reader tip":"نکتهٔ خواندن","Try reading a sentence twice: first slowly, then smoothly.":"یک جمله را دو بار بخوان: بار اول آهسته و بار دوم روان.","Chapters":"فصل‌ها","Copy lesson link":"کپی پیوند درس","Meaning":"معنی","Hear meaning":"شنیدن معنی","Slower":"آهسته‌تر","Faster":"سریع‌تر","Expand":"تمام‌صفحه","Ready when you are":"هر وقت آماده‌ای","Previous":"قبلی","Next page":"صفحهٔ بعد","Choose a story, then enjoy reading.":"داستانی انتخاب کن و از خواندن لذت ببر.","Read in ordinary English spelling. Tap any word to hear it and explore its meaning.":"با املای معمول انگلیسی بخوان. برای شنیدن و دیدن معنی هر واژه روی آن بزن.","Longer words are divided into syllables. Tap any word to hear it and explore its meaning.":"واژه‌های بلند به بخش‌های آوایی تقسیم می‌شوند. برای شنیدن و دیدن معنی روی هر واژه بزن.","Longer words are divided; shorter words stay whole. Tap any word to hear it and explore its meaning.":"واژه‌های بلند تقسیم می‌شوند و واژه‌های کوتاه کامل می‌مانند. برای شنیدن و دیدن معنی روی واژه بزن.","English meaning (translation not available yet):":"معنی انگلیسی (ترجمه هنوز آماده نیست): ","Finding a simple dictionary definition…":"در حال جست‌وجوی معنی ساده در فرهنگ لغت…","Looking up a learner-friendly dictionary meaning…":"در حال یافتن معنی مناسب برای زبان‌آموز…","Home":"خانه","Reading":"خواندن","Rhymes":"شعرهای آموزشی","My speech stage":"جایگاه سخن‌گویی من","Flags":"پرچم‌ها","About us":"دربارهٔ ما","For grown-ups":"برای بزرگ‌ترها","Let’s start reading":"بیایید خواندن را آغاز کنیم","Science & Nature":"علوم و طبیعت","Akhlaq":"اخلاق","Aqaid":"عقاید","Qur'an & Ahlulbayt":"قرآن و اهل‌بیت","People & Society":"مردم و جامعه","Thinking & Discovery":"تفکر و کشف","Sahifa Sajjadiya":"صحیفهٔ سجادیه","All":"همه"
},
ur:{
"Reading settings":"پڑھنے کی ترتیبات","Make reading yours":"پڑھنے کو اپنی پسند کے مطابق بنائیں","Choose how the story looks and sounds":"کہانی کی شکل اور پڑھنے کی آواز منتخب کریں","WORD DISPLAY":"الفاظ کی نمائش","Syllables":"ہجّے","Mixed":"مخلوط","Normal":"عام","TEXT SIZE":"متن کا سائز","Reading text":"پڑھنے کا متن","Show a soft border around each word":"ہر لفظ کے گرد ہلکا سا حاشیہ دکھائیں","Follow the highlighted word while listening":"سنتے وقت نمایاں لفظ کے ساتھ چلیں","NARRATOR VOICE":"راوی کی آواز","LEARNER LANGUAGE":"سیکھنے والے کی زبان","Choose a story":"کہانی منتخب کریں","FIND A CHAPTER":"سبق تلاش کریں","Search reading passages…":"مطالعے کے متن میں تلاش کریں…","Reader tip":"پڑھنے کا مشورہ","Try reading a sentence twice: first slowly, then smoothly.":"ایک جملہ دو بار پڑھیں: پہلے آہستہ، پھر روانی سے۔","Chapters":"اسباق","Copy lesson link":"سبق کا لنک نقل کریں","Meaning":"معنی","Hear meaning":"معنی سنیں","Slower":"آہستہ","Faster":"تیز","Expand":"پھیلائیں","Ready when you are":"جب آپ تیار ہوں","Previous":"پچھلا","Next page":"اگلا صفحہ","Choose a story, then enjoy reading.":"کہانی منتخب کریں اور پڑھنے سے لطف اٹھائیں۔","Read in ordinary English spelling. Tap any word to hear it and explore its meaning.":"عام انگریزی املا میں پڑھیں۔ لفظ سننے اور اس کا مطلب جاننے کے لیے اس پر دبائیں۔","Longer words are divided into syllables. Tap any word to hear it and explore its meaning.":"لمبے الفاظ کو ہجّوں میں تقسیم کیا جاتا ہے۔ لفظ سننے اور مطلب جاننے کے لیے دبائیں۔","Longer words are divided; shorter words stay whole. Tap any word to hear it and explore its meaning.":"لمبے الفاظ تقسیم ہوتے ہیں اور چھوٹے الفاظ مکمل رہتے ہیں۔ لفظ سننے اور مطلب جاننے کے لیے دبائیں۔","English meaning (translation not available yet):":"انگریزی معنی (ترجمہ ابھی دستیاب نہیں): ","Finding a simple dictionary definition…":"سادہ لغوی معنی تلاش کیا جا رہا ہے…","Looking up a learner-friendly dictionary meaning…":"سیکھنے والے کے لیے آسان معنی تلاش کیا جا رہا ہے…","Home":"گھر","Reading":"مطالعہ","Rhymes":"تعلیمی نظمیں","My speech stage":"میرا تقریری اسٹیج","Flags":"جھنڈے","About us":"ہمارے بارے میں","For grown-ups":"بڑوں کے لیے","Let’s start reading":"آئیے پڑھنا شروع کریں","Science & Nature":"سائنس اور فطرت","Akhlaq":"اخلاق","Aqaid":"عقائد","Qur'an & Ahlulbayt":"قرآن اور اہلِ بیت","People & Society":"لوگ اور معاشرہ","Thinking & Discovery":"سوچ اور دریافت","Sahifa Sajjadiya":"صحیفۂ سجادیہ","All":"سب"
}};
const WORDS={
bark:{ar:"لحاء الشجرة: الغطاء الخارجي الخشن الذي يحيط بجذع الشجرة أو أغصانها. يُزال قبل تحويل الخشب إلى لُبّ الورق.",fa:"پوست درخت: پوشش بیرونی و زِبرِ تنه یا شاخهٔ درخت. پیش از تبدیل چوب به خمیر کاغذ، آن را جدا می‌کنند.",ur:"درخت کی چھال: تنے یا شاخوں کے باہر کا سخت غلاف۔ کاغذ کا گودا بنانے سے پہلے اسے اتارا جاتا ہے۔"},
log:{ar:"جذع شجرة مقطوع يُستخدم خشبه في صناعة الورق.",fa:"بخش بریده‌شده‌ای از تنهٔ درخت که چوب آن برای کاغذسازی به کار می‌رود.",ur:"درخت کے تنے کا کٹا ہوا حصہ جس کی لکڑی کاغذ بنانے میں استعمال ہوتی ہے۔"},
pulp:{ar:"مزيج رطب من ألياف نباتية منفصلة يُصنع منه الورق.",fa:"مخلوط خیسِ الیاف جداشدهٔ گیاهی که از آن کاغذ می‌سازند.",ur:"الگ کیے گئے نباتاتی ریشوں کا گیلا آمیزہ جس سے کاغذ بنایا جاتا ہے۔"},
fibre:{ar:"ليف نباتي رفيع؛ تتماسك ألياف كثيرة لتكوين ورقة.",fa:"رشته‌ای نازک از گیاه؛ تعداد زیادی از این رشته‌ها کنار هم ورق کاغذ را می‌سازند.",ur:"پودے کا باریک ریشہ؛ بہت سے ریشے مل کر کاغذ کی چادر بناتے ہیں۔"},
fiber:{ar:"ليف نباتي رفيع؛ تتماسك ألياف كثيرة لتكوين ورقة.",fa:"رشته‌ای نازک از گیاه؛ تعداد زیادی از این رشته‌ها کنار هم ورق کاغذ را می‌سازند.",ur:"پودے کا باریک ریشہ؛ بہت سے ریشے مل کر کاغذ کی چادر بناتے ہیں۔"},
press:{ar:"آلة تضغط الورقة الرطبة لإخراج الماء منها.",fa:"دستگاهی که با فشردن ورق خیس، آب اضافی آن را می‌گیرد.",ur:"ایسی مشین جو گیلی کاغذی چادر کو دبا کر اس میں سے پانی نکالتی ہے۔"},
screen:{ar:"شبكة دقيقة تسمح بخروج الماء وتُبقي ألياف الورق متماسكة.",fa:"توری ظریفی که آب از آن عبور می‌کند و الیاف کاغذ را کنار هم نگه می‌دارد.",ur:"باریک جالی جس سے پانی نکل جاتا ہے اور کاغذ کے ریشے اپنی جگہ رہتے ہیں۔"},
sheet:{ar:"قطعة رقيقة ومسطحة من الورق.",fa:"یک برگ نازک و صاف از کاغذ.",ur:"کاغذ کا ایک پتلا اور ہموار ورق۔"},
roller:{ar:"أسطوانة دوّارة تساعد على ضغط الورق أو تحريكه.",fa:"غلتکی چرخان که به فشردن یا حرکت دادن کاغذ کمک می‌کند.",ur:"گھومنے والا بیلن جو کاغذ کو دبانے یا آگے بڑھانے میں مدد دیتا ہے۔"},
chip:{ar:"قطعة صغيرة مقطوعة من الخشب.",fa:"تکهٔ کوچکی که از چوب بریده یا جدا شده است.",ur:"لکڑی کا ایک چھوٹا ٹکڑا جو کاٹا یا توڑا گیا ہو۔"},
branch:{ar:"جزء ينمو خارجًا من جذع الشجرة.",fa:"بخشی از درخت که از تنهٔ آن بیرون می‌آید.",ur:"درخت کا وہ حصہ جو تنے سے باہر نکلتا ہے۔"},
tree:{ar:"نبات كبير له جذع وأغصان وأوراق.",fa:"گیاهی بزرگ با تنه، شاخه و برگ.",ur:"ایک بڑا پودا جس کا تنا، شاخیں اور پتے ہوتے ہیں۔"},
wood:{ar:"المادة الصلبة التي تكوّن جذوع الأشجار وأغصانها.",fa:"مادهٔ سختی که تنه و شاخه‌های درخت از آن ساخته شده‌اند.",ur:"وہ سخت مادہ جس سے درختوں کے تنے اور شاخیں بنتی ہیں۔"},
paper:{ar:"مادة رقيقة تُستخدم للكتابة والرسم والطباعة.",fa:"ماده‌ای نازک برای نوشتن، نقاشی و چاپ.",ur:"ایک پتلا مادہ جو لکھنے، تصویر بنانے اور چھاپنے کے لیے استعمال ہوتا ہے۔"},
recycle:{ar:"معالجة المواد المستعملة لصنع منتجات جديدة منها.",fa:"فرآوری مواد استفاده‌شده برای ساخت محصولات تازه.",ur:"استعمال شدہ چیزوں کو دوبارہ قابلِ استعمال بنا کر نئی مصنوعات تیار کرنا۔"},
atom:{ar:"ذرة: وحدة صغيرة جداً تكوّن المادة العادية.",fa:"اتم: واحد از بنیادی ذراتِ ماده.",ur:"ایٹم: مادّے کا ایک نہایت چھوٹا بنیادی ذرّہ۔"},
electron:{ar:"إلكترون: جسيم صغير سالب الشحنة يوجد في الذرات.",fa:"الکترون: ذره‌ای بسیار کوچک با بار الکتریکی منفی در اتم.",ur:"الیکٹران: ایٹم میں پایا جانے والا نہایت چھوٹا منفی برقی بار رکھنے والا ذرّہ۔"},
photon:{ar:"فوتون: جسيم صغير من الضوء يحمل الطاقة.",fa:"فوتون: ذره‌ای کوچک از نور که انرژی حمل می‌کند.",ur:"فوٹون: روشنی کا نہایت چھوٹا ذرّہ جو توانائی لے کر چلتا ہے۔"},
quantum:{ar:"كَمّ: مقدار منفصلة وصغيرة من شيء مثل الطاقة.",fa:"کوانتوم: مقدار گسسته و کوچکی از چیزی مانند انرژی.",ur:"کوانٹم: توانائی جیسی کسی چیز کی ایک الگ اور چھوٹی مقدار۔"},
laser:{ar:"ليزر: جهاز يصدر شعاعاً ضيقاً ومركزاً من الضوء.",fa:"لیزر: دستگاهی که پرتویی باریک و متمرکز از نور تولید می‌کند.",ur:"لیزر: ایسا آلہ جو روشنی کی باریک اور مرکوز شعاع بناتا ہے۔"},
galaxy:{ar:"مجرة: مجموعة هائلة من النجوم والغاز والغبار.",fa:"کهکشان: مجموعه‌ای بسیار بزرگ از ستارگان، گاز و غبار.",ur:"کہکشاں: ستاروں، گیس اور گردوغبار کا ایک بہت بڑا مجموعہ۔"},
nebula:{ar:"سديم: سحابة ضخمة من الغاز والغبار في الفضاء.",fa:"سحابی: ابری بزرگ از گاز و غبار در فضا.",ur:"سحابیہ: خلا میں گیس اور گردوغبار کا ایک بہت بڑا بادل۔"},
exoplanet:{ar:"كوكب خارج المجموعة الشمسية: كوكب يدور حول نجم غير الشمس.",fa:"سیارهٔ فراخورشیدی: سیاره‌ای که به دور ستاره‌ای غیر از خورشید می‌گردد.",ur:"نظامِ شمسی سے باہر کا سیارہ: ایسا سیارہ جو سورج کے بجائے کسی دوسرے ستارے کے گرد گھومتا ہے۔"},
orbit:{ar:"مدار: المسار الذي يسلكه جسم حول جسم آخر.",fa:"مدار: مسیری که یک جسم به دور جسمی دیگر طی می‌کند.",ur:"مدار: وہ راستہ جس پر کوئی جسم دوسرے جسم کے گرد گھومتا ہے۔"},
gravity:{ar:"الجاذبية: قوة تجذب الأجسام بعضها إلى بعض.",fa:"گرانش: نیرویی که اجسام را به سوی یکدیگر می‌کشد.",ur:"کششِ ثقل: وہ قوت جو اجسام کو ایک دوسرے کی طرف کھینچتی ہے۔"},
robot:{ar:"روبوت: آلة صممها الناس لتنفذ مهاماً.",fa:"ربات: ماشینی که انسان‌ها برای انجام کارها طراحی می‌کنند.",ur:"روبوٹ: ایک مشین جسے لوگ کام انجام دینے کے لیے بناتے ہیں۔"},
sensor:{ar:"مستشعر: جزء يكتشف شيئاً مثل الضوء أو الحركة أو اللمس.",fa:"حسگر: بخشی که چیزی مانند نور، حرکت یا لمس را تشخیص می‌دهد.",ur:"سینسر: ایسا حصّہ جو روشنی، حرکت یا چھونے جیسی چیزوں کو محسوس کرتا ہے۔"},
dna:{ar:"الحمض النووي: مادة تحمل التعليمات التي تستخدمها الخلايا.",fa:"دی‌اِن‌اِی: ماده‌ای که دستورهای مورد استفادهٔ سلول‌ها را در خود دارد.",ur:"ڈی این اے: وہ مادّہ جس میں خلیوں کے لیے ہدایات محفوظ ہوتی ہیں۔"},
gene:{ar:"جين: جزء من الحمض النووي يحمل تعليمات لصفة أو وظيفة.",fa:"ژن: بخشی از دی‌اِن‌اِی که دستورهای یک ویژگی یا کار را در خود دارد.",ur:"جین: ڈی این اے کا ایک حصّہ جس میں کسی صفت یا کام کی ہدایات ہوتی ہیں۔"},
cell:{ar:"خلية: أصغر وحدة حية تستطيع أداء الوظائف الأساسية للحياة.",fa:"سلول: کوچک‌ترین واحد زنده که کارهای اصلی زندگی را انجام می‌دهد.",ur:"خلیہ: زندگی کے بنیادی کام انجام دینے والی سب سے چھوٹی زندہ اکائی۔"},
ecosystem:{ar:"نظام بيئي: كائنات حية تتفاعل مع بعضها ومع بيئتها.",fa:"بوم‌سازگان: جاندارانی که با یکدیگر و با محیط خود ارتباط دارند.",ur:"ماحولیاتی نظام: جاندار جو ایک دوسرے اور اپنے ماحول سے تعلق رکھتے ہیں۔"},
photosynthesis:{ar:"البناء الضوئي: عملية تستخدم فيها النباتات الضوء لصنع غذائها.",fa:"فتوسنتز: فرایندی که گیاهان با کمک نور غذای خود را می‌سازند.",ur:"ضیائی تالیف: وہ عمل جس میں پودے روشنی کی مدد سے اپنی غذا بناتے ہیں۔"},
habitat:{ar:"موطن: المكان الطبيعي الذي يعيش فيه نبات أو حيوان.",fa:"زیستگاه: جای طبیعی زندگی یک گیاه یا جانور.",ur:"مسکن: وہ قدرتی جگہ جہاں کوئی پودا یا جانور رہتا ہے۔"},
experiment:{ar:"تجربة: اختبار منظم للإجابة عن سؤال أو فحص فكرة.",fa:"آزمایش: آزمونی منظم برای پاسخ دادن به پرسش یا بررسی یک ایده.",ur:"تجربہ: کسی سوال کا جواب معلوم کرنے یا خیال کو جانچنے کے لیے منظم آزمائش۔"},
prediction:{ar:"تنبؤ: فكرة عما قد يحدث بناءً على ما نعرفه.",fa:"پیش‌بینی: حدسی دربارهٔ آنچه ممکن است بر پایهٔ دانسته‌ها رخ دهد.",ur:"پیش گوئی: جو کچھ ہم جانتے ہیں اس کی بنیاد پر یہ اندازہ کہ آگے کیا ہو سکتا ہے۔"},
observation:{ar:"ملاحظة: ما نراه أو نسمعه أو نقيسه أثناء الدراسة.",fa:"مشاهده: چیزی که هنگام بررسی می‌بینیم، می‌شنویم یا اندازه می‌گیریم.",ur:"مشاہدہ: مطالعے کے دوران جو کچھ ہم دیکھتے، سنتے یا ناپتے ہیں۔"},
scientist:{ar:"عالِم: شخص يدرس العالم الطبيعي باستخدام الأسئلة والملاحظات والتجارب.",fa:"دانشمند: کسی که با پرسش، مشاهده و آزمایش جهان طبیعی را بررسی می‌کند.",ur:"سائنس دان: وہ شخص جو سوالات، مشاہدات اور تجربات کے ذریعے قدرتی دنیا کا مطالعہ کرتا ہے۔"},
};
let language="en";
const t=s=>(UI[language]&&UI[language][s])||s;
function translateMeaning(word,english){
 if(language==="en")return english;
 const key=String(word||"").toLowerCase().replace(/[^a-z]/g,"");
 return WORDS[key]?.[language]||t("English meaning (translation not available yet):")+" "+english;
}
const known=new WeakMap();
function translateNode(node){
 if(!node||node.nodeType!==Node.TEXT_NODE||!node.parentElement||node.parentElement.closest("#storyText"))return;
 const value=node.nodeValue,record=known.get(node);
 const original=record&&value===record.last?record.original:value;
 const trimmed=original.trim();if(!trimmed)return;
 const translated=t(trimmed);
 known.set(node,{original,last:translated});
 if(value!==translated)node.nodeValue=value.replace(trimmed,translated);
}
function translateTree(root=document.body){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode()))translateNode(node);
 root.querySelectorAll?.("[placeholder],[aria-label],[title]").forEach(el=>{
  ["placeholder","aria-label","title"].forEach(attr=>{
   const key="llOriginal"+attr,value=el.getAttribute(attr);
   if(value&&!el.dataset[key])el.dataset[key]=value;
   if(el.dataset[key])el.setAttribute(attr,t(el.dataset[key]));
  });
 });
}
function setLanguage(next){
 language=["en","ar","fa","ur"].includes(next)?next:"en";
 try{localStorage.setItem("littleLanternsLearnerLanguage",language);}catch(e){}
 document.documentElement.lang=language;document.documentElement.dir=language==="en"?"ltr":"rtl";
 document.body.classList.toggle("learner-rtl",language!=="en");
 const passage=document.getElementById("storyText");if(passage){passage.lang="en";passage.dir="ltr";}
 document.querySelectorAll("#learnerLanguage,#learnerLanguageGlobal").forEach(selector=>selector.value=language);
 translateTree();document.dispatchEvent(new CustomEvent("littlelanterns:languagechange",{detail:{language}}));
}
window.LittleLanternsLanguage={get language(){return language;},setLanguage,translate:t,translateMeaning};
document.addEventListener("littlelanterns:languagechange",()=>{
 const panel=document.getElementById("wordPanel"),word=document.getElementById("wordDisplay"),meaning=document.getElementById("wordMeaning");
 if(panel&&!panel.hidden&&word&&meaning&&meaning.dataset.englishMeaning){
  meaning.textContent=translateMeaning(word.textContent,meaning.dataset.englishMeaning);
 }
});
document.querySelectorAll("#learnerLanguage,#learnerLanguageGlobal").forEach(selector=>selector.addEventListener("change",()=>setLanguage(selector.value)));
let saved="en";try{saved=localStorage.getItem("littleLanternsLearnerLanguage")||"en";}catch(e){}
const observer=new MutationObserver(records=>records.forEach(record=>{
 if(record.type==="characterData")translateNode(record.target);
 else record.addedNodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE)translateNode(node);else if(node.nodeType===Node.ELEMENT_NODE)translateTree(node);});
}));
observer.observe(document.body,{subtree:true,childList:true,characterData:true});
setLanguage(saved);
})();