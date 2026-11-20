import * as React from 'react'

/**
 * Lightweight bilingual dictionary (English + Hindi).
 * Add a key to `en` first — `hi` is type-checked against it, so a missing
 * Hindi string is a compile error.
 */
const en = {
  'nav.home': 'Home',
  'nav.create': 'Create',
  'nav.dashboard': 'Dashboard',
  'nav.pricing': 'Pricing',
  'nav.login': 'Log in',
  'nav.signup': 'Get started',
  'nav.menu': 'Menu',

  'hero.badge': 'India’s bilingual AI creation studio',
  'hero.title1': 'Your Imagination,',
  'hero.title2': 'Powered by AI',
  'hero.subtitle':
    'Create images, videos, voices and talking photos in English and Hindi — all from one beautiful studio that works on your phone and your computer.',
  'hero.placeholder':
    'Describe what you want to create… e.g. “A golden temple glowing at sunrise, cinematic”',
  'hero.cta': 'Create now',
  'hero.explore': 'Explore tools',
  'hero.try': 'Try:',
  'hero.selectTool': 'Choose a tool',
  'hero.stat1': 'AI tools in one place',
  'hero.stat2': 'Languages supported',
  'hero.stat3': 'Free credits every day',

  'tools.title': 'Everything you need to create',
  'tools.subtitle':
    'Seven creative AI tools designed for creators, students, businesses and storytellers.',
  'tools.open': 'Open tool',

  'tool.text-to-image': 'Text to Image',
  'tool.text-to-image.desc':
    'Turn words into stunning artwork, posters and photos in seconds.',
  'tool.image-to-video': 'Image to Video',
  'tool.image-to-video.desc':
    'Bring a still picture to life with smooth cinematic motion.',
  'tool.photo-edit': 'AI Photo Editing',
  'tool.photo-edit.desc':
    'Remove backgrounds, enhance faces, restore old photos and upscale.',
  'tool.talking-photo': 'Talking Photo',
  'tool.talking-photo.desc':
    'Make any portrait speak your script with realistic lip-sync.',
  'tool.voice': 'AI Voice Generator',
  'tool.voice.desc':
    'Natural studio voices for reels, ads, audiobooks and videos.',
  'tool.chat': 'AI Chat Assistant',
  'tool.chat.desc':
    'Brainstorm ideas, write scripts and get answers in Hindi or English.',
  'tool.hindi-tts': 'Hindi Text to Speech',
  'tool.hindi-tts.desc':
    'Convert Hindi text into clear, natural spoken audio.',

  'status.needsApi': 'Needs AI API',
  'status.browser': 'Works in browser',
  'status.preview': 'Preview',
  'status.needsApi.long':
    'This tool is a working interface preview. Real generation starts once it is connected to a secure server-side AI service — nothing shown here is fake output.',
  'status.browser.long':
    'This preview uses your device’s built-in speech engine, so you can hear it right now. Premium studio voices arrive with the AI voice integration.',

  'gallery.title': 'Made for creators like you',
  'gallery.subtitle':
    'Concept artwork showing the style of images the studio is designed to create.',
  'gallery.label': 'Concept art',

  'how.title': 'Create in three simple steps',
  'how.1.title': 'Describe',
  'how.1.desc': 'Type your idea in English, Hindi or Hinglish.',
  'how.2.title': 'Customise',
  'how.2.desc': 'Pick a style, size, voice or motion that fits.',
  'how.3.title': 'Download & share',
  'how.3.desc': 'Save in HD and share straight to Instagram or WhatsApp.',

  'security.title': 'Secure by design',
  'security.desc':
    'API keys never touch your browser. Every AI request will run through protected server-side functions, and your creations stay private to your account.',

  'pricing.title': 'Simple plans for every creator',
  'pricing.subtitle': 'Start free. Upgrade when you need more power.',
  'pricing.monthly': 'Monthly',
  'pricing.yearly': 'Yearly',
  'pricing.save': 'Save 20%',
  'pricing.perMonth': '/month',
  'pricing.popular': 'Most popular',
  'pricing.free.name': 'Free',
  'pricing.free.desc': 'Explore the studio and try every tool.',
  'pricing.free.cta': 'Start for free',
  'pricing.pro.name': 'Premium',
  'pricing.pro.desc': 'For creators who publish every week.',
  'pricing.pro.cta': 'Go Premium',
  'pricing.studio.name': 'Studio',
  'pricing.studio.desc': 'For teams, agencies and businesses.',
  'pricing.studio.cta': 'Contact sales',
  'pricing.f.credits10': '10 credits per day',
  'pricing.f.credits1000': '1,000 credits per month',
  'pricing.f.credits5000': '5,000 credits per month',
  'pricing.f.sd': 'Standard quality downloads',
  'pricing.f.hd': 'HD & 4K downloads',
  'pricing.f.watermark': 'Watermark on exports',
  'pricing.f.noWatermark': 'No watermark',
  'pricing.f.chat': 'AI chat assistant',
  'pricing.f.allTools': 'All 7 AI tools',
  'pricing.f.priority': 'Priority generation queue',
  'pricing.f.voices': 'Premium Hindi & English voices',
  'pricing.f.commercial': 'Commercial usage rights',
  'pricing.f.seats': '5 team seats',
  'pricing.f.api': 'Brand kit & API access',
  'pricing.f.support': 'Dedicated support',
  'pricing.note':
    'Payments are not live yet — checkout will be enabled when the payment provider is connected.',

  'faq.title': 'Questions, answered',
  'faq.1.q': 'Can I use the studio in Hindi?',
  'faq.1.a':
    'Yes. Switch the language from the top bar at any time. You can also write prompts and scripts in Hindi.',
  'faq.2.q': 'Does it work on my phone?',
  'faq.2.a':
    'Absolutely. IBRAR AI STUDIO is built mobile-first for Android and iPhone, and scales up beautifully on computers.',
  'faq.3.q': 'Is generation live right now?',
  'faq.3.a':
    'This is the first release of the studio interface. Tools marked “Needs AI API” are being connected to real AI services and will never show fake results in the meantime.',
  'faq.4.q': 'How are my data and keys protected?',
  'faq.4.a':
    'All AI providers are called from secure server functions. No secret keys are ever sent to the browser.',

  'cta.title': 'Ready to create something amazing?',
  'cta.desc': 'Join free today and get daily credits to explore every tool.',

  'footer.tagline': 'Your Imagination, Powered by AI.',
  'footer.product': 'Product',
  'footer.company': 'Company',
  'footer.about': 'About',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.contact': 'Contact',
  'footer.rights': 'All rights reserved.',

  'studio.title': 'Creation Studio',
  'studio.subtitle': 'Pick a tool, describe your idea and create.',
  'studio.prompt': 'Prompt',
  'studio.negative': 'Avoid (optional)',
  'studio.style': 'Style',
  'studio.ratio': 'Aspect ratio',
  'studio.generate': 'Generate',
  'studio.output': 'Output',
  'studio.emptyOutput': 'Your creation will appear here.',
  'studio.pendingTitle': 'AI service not connected yet',
  'studio.queued':
    'Your request was captured, but this tool isn’t connected to an AI provider yet, so no output was generated.',
  'studio.upload': 'Upload an image',
  'studio.uploadHint': 'PNG or JPG, up to 10 MB',
  'studio.uploadPortrait': 'Upload a portrait photo',
  'studio.motion': 'Motion',
  'studio.duration': 'Duration',
  'studio.editAction': 'Edit action',
  'studio.script': 'Script',
  'studio.scriptPlaceholder': 'Type what the photo should say…',
  'studio.voice': 'Voice',
  'studio.speed': 'Speed',
  'studio.pitch': 'Pitch',
  'studio.text': 'Text',
  'studio.speak': 'Speak',
  'studio.stop': 'Stop',
  'studio.ttsPlaceholder': 'नमस्ते! आईबीआर एआई स्टूडियो में आपका स्वागत है।',
  'studio.voicePlaceholder':
    'Welcome to IBRAR AI STUDIO — where your imagination comes to life.',
  'studio.noVoices':
    'No Hindi voice was found on this device. Try Chrome on Android or Safari on iPhone.',
  'studio.chatPlaceholder': 'Ask anything in Hindi or English…',
  'studio.send': 'Send',
  'studio.chatWelcome':
    'Namaste! I’m the IBRAR AI assistant. Once connected to an AI model I can help you write prompts, scripts and captions.',
  'studio.chatPending':
    'The chat assistant isn’t connected to an AI model yet, so I can’t give a real answer. Your message has been kept here so you can see how the conversation will work.',
  'studio.credits': 'credits',
  'studio.cost': 'Cost',

  'dash.welcome': 'Welcome back',
  'dash.subtitle': 'Here’s what’s happening in your studio.',
  'dash.credits': 'Credits left today',
  'dash.creations': 'Total creations',
  'dash.plan': 'Current plan',
  'dash.upgrade': 'Upgrade to Premium',
  'dash.quick': 'Quick create',
  'dash.recent': 'Recent activity',
  'dash.usage': 'Usage this week',
  'dash.demo': 'Demo data',
  'dash.demoNote':
    'You’re viewing a sample dashboard. Your real activity appears here after accounts go live.',
  'dash.status.done': 'Completed',
  'dash.status.pending': 'Awaiting AI',
  'dash.planUsage': 'Daily credits used',

  'auth.loginTitle': 'Welcome back',
  'auth.loginSub': 'Log in to continue creating.',
  'auth.signupTitle': 'Create your free account',
  'auth.signupSub': 'Get 10 free credits every day.',
  'auth.name': 'Full name',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.google': 'Continue with Google',
  'auth.or': 'or',
  'auth.login': 'Log in',
  'auth.signup': 'Create account',
  'auth.noAccount': 'New here?',
  'auth.haveAccount': 'Already have an account?',
  'auth.forgot': 'Forgot password?',
  'auth.pending':
    'Accounts are coming in the next release. This form is a preview and does not store anything.',
  'auth.terms': 'By continuing you agree to our Terms and Privacy Policy.',
} as const

export type TKey = keyof typeof en

const hi: Record<TKey, string> = {
  'nav.home': 'होम',
  'nav.create': 'बनाएँ',
  'nav.dashboard': 'डैशबोर्ड',
  'nav.pricing': 'प्लान',
  'nav.login': 'लॉग इन',
  'nav.signup': 'शुरू करें',
  'nav.menu': 'मेन्यू',

  'hero.badge': 'भारत का द्विभाषी एआई क्रिएशन स्टूडियो',
  'hero.title1': 'आपकी कल्पना,',
  'hero.title2': 'एआई की शक्ति से',
  'hero.subtitle':
    'अंग्रेज़ी और हिंदी में इमेज, वीडियो, आवाज़ और बोलती तस्वीरें बनाएँ — एक ही सुंदर स्टूडियो से, जो आपके फ़ोन और कंप्यूटर दोनों पर चलता है।',
  'hero.placeholder':
    'बताइए आप क्या बनाना चाहते हैं… जैसे “सूर्योदय में चमकता स्वर्ण मंदिर, सिनेमैटिक”',
  'hero.cta': 'अभी बनाएँ',
  'hero.explore': 'टूल्स देखें',
  'hero.try': 'आज़माएँ:',
  'hero.selectTool': 'टूल चुनें',
  'hero.stat1': 'एआई टूल्स एक जगह',
  'hero.stat2': 'भाषाएँ समर्थित',
  'hero.stat3': 'रोज़ मुफ़्त क्रेडिट',

  'tools.title': 'बनाने के लिए सब कुछ',
  'tools.subtitle':
    'क्रिएटर्स, छात्रों, व्यवसायों और कहानीकारों के लिए सात रचनात्मक एआई टूल्स।',
  'tools.open': 'टूल खोलें',

  'tool.text-to-image': 'टेक्स्ट से इमेज',
  'tool.text-to-image.desc':
    'शब्दों को कुछ ही सेकंड में शानदार आर्टवर्क, पोस्टर और फ़ोटो में बदलें।',
  'tool.image-to-video': 'इमेज से वीडियो',
  'tool.image-to-video.desc':
    'किसी भी तस्वीर में सिनेमैटिक मोशन से जान डालें।',
  'tool.photo-edit': 'एआई फ़ोटो एडिटिंग',
  'tool.photo-edit.desc':
    'बैकग्राउंड हटाएँ, चेहरा निखारें, पुरानी फ़ोटो सुधारें और अपस्केल करें।',
  'tool.talking-photo': 'बोलती तस्वीर',
  'tool.talking-photo.desc':
    'किसी भी पोर्ट्रेट से असली लिप-सिंक के साथ अपनी स्क्रिप्ट बुलवाएँ।',
  'tool.voice': 'एआई वॉइस जेनरेटर',
  'tool.voice.desc':
    'रील्स, विज्ञापन, ऑडियोबुक और वीडियो के लिए प्राकृतिक स्टूडियो आवाज़ें।',
  'tool.chat': 'एआई चैट असिस्टेंट',
  'tool.chat.desc':
    'आइडिया सोचें, स्क्रिप्ट लिखें और हिंदी या अंग्रेज़ी में जवाब पाएँ।',
  'tool.hindi-tts': 'हिंदी टेक्स्ट टू स्पीच',
  'tool.hindi-tts.desc': 'हिंदी टेक्स्ट को साफ़, प्राकृतिक आवाज़ में बदलें।',

  'status.needsApi': 'एआई API ज़रूरी',
  'status.browser': 'ब्राउज़र में चालू',
  'status.preview': 'प्रीव्यू',
  'status.needsApi.long':
    'यह टूल एक कार्यरत इंटरफ़ेस प्रीव्यू है। सुरक्षित सर्वर-साइड एआई सेवा से जुड़ने के बाद असली जेनरेशन शुरू होगा — यहाँ कोई नकली आउटपुट नहीं दिखाया जाता।',
  'status.browser.long':
    'यह प्रीव्यू आपके डिवाइस के बिल्ट-इन स्पीच इंजन का उपयोग करता है, इसलिए आप इसे अभी सुन सकते हैं। प्रीमियम स्टूडियो आवाज़ें एआई वॉइस इंटीग्रेशन के साथ आएँगी।',

  'gallery.title': 'आप जैसे क्रिएटर्स के लिए',
  'gallery.subtitle':
    'कॉन्सेप्ट आर्टवर्क, जो दिखाता है कि स्टूडियो किस तरह की इमेज बनाने के लिए तैयार किया गया है।',
  'gallery.label': 'कॉन्सेप्ट आर्ट',

  'how.title': 'तीन आसान चरणों में बनाएँ',
  'how.1.title': 'बताइए',
  'how.1.desc': 'अपना आइडिया अंग्रेज़ी, हिंदी या हिंग्लिश में लिखें।',
  'how.2.title': 'कस्टमाइज़ करें',
  'how.2.desc': 'स्टाइल, साइज़, आवाज़ या मोशन चुनें।',
  'how.3.title': 'डाउनलोड और शेयर',
  'how.3.desc': 'HD में सेव करें और सीधे Instagram या WhatsApp पर शेयर करें।',

  'security.title': 'सुरक्षा सबसे पहले',
  'security.desc':
    'API कुंजियाँ कभी आपके ब्राउज़र तक नहीं पहुँचतीं। हर एआई अनुरोध सुरक्षित सर्वर-साइड फ़ंक्शन से चलेगा और आपकी रचनाएँ आपके खाते तक निजी रहेंगी।',

  'pricing.title': 'हर क्रिएटर के लिए आसान प्लान',
  'pricing.subtitle': 'मुफ़्त शुरू करें। ज़्यादा पावर चाहिए तो अपग्रेड करें।',
  'pricing.monthly': 'मासिक',
  'pricing.yearly': 'वार्षिक',
  'pricing.save': '20% बचाएँ',
  'pricing.perMonth': '/माह',
  'pricing.popular': 'सबसे लोकप्रिय',
  'pricing.free.name': 'फ़्री',
  'pricing.free.desc': 'स्टूडियो देखें और हर टूल आज़माएँ।',
  'pricing.free.cta': 'मुफ़्त शुरू करें',
  'pricing.pro.name': 'प्रीमियम',
  'pricing.pro.desc': 'हर हफ़्ते कंटेंट बनाने वाले क्रिएटर्स के लिए।',
  'pricing.pro.cta': 'प्रीमियम लें',
  'pricing.studio.name': 'स्टूडियो',
  'pricing.studio.desc': 'टीमों, एजेंसियों और व्यवसायों के लिए।',
  'pricing.studio.cta': 'सेल्स से बात करें',
  'pricing.f.credits10': 'रोज़ 10 क्रेडिट',
  'pricing.f.credits1000': 'हर महीने 1,000 क्रेडिट',
  'pricing.f.credits5000': 'हर महीने 5,000 क्रेडिट',
  'pricing.f.sd': 'स्टैंडर्ड क्वालिटी डाउनलोड',
  'pricing.f.hd': 'HD और 4K डाउनलोड',
  'pricing.f.watermark': 'एक्सपोर्ट पर वॉटरमार्क',
  'pricing.f.noWatermark': 'कोई वॉटरमार्क नहीं',
  'pricing.f.chat': 'एआई चैट असिस्टेंट',
  'pricing.f.allTools': 'सभी 7 एआई टूल्स',
  'pricing.f.priority': 'प्राथमिकता जेनरेशन क्यू',
  'pricing.f.voices': 'प्रीमियम हिंदी और अंग्रेज़ी आवाज़ें',
  'pricing.f.commercial': 'व्यावसायिक उपयोग अधिकार',
  'pricing.f.seats': '5 टीम सीट',
  'pricing.f.api': 'ब्रांड किट और API एक्सेस',
  'pricing.f.support': 'समर्पित सहायता',
  'pricing.note':
    'भुगतान अभी चालू नहीं है — पेमेंट प्रोवाइडर जुड़ने पर चेकआउट शुरू होगा।',

  'faq.title': 'आपके सवाल, हमारे जवाब',
  'faq.1.q': 'क्या मैं स्टूडियो हिंदी में इस्तेमाल कर सकता हूँ?',
  'faq.1.a':
    'हाँ। ऊपर की पट्टी से कभी भी भाषा बदलें। आप प्रॉम्प्ट और स्क्रिप्ट भी हिंदी में लिख सकते हैं।',
  'faq.2.q': 'क्या यह मेरे फ़ोन पर चलेगा?',
  'faq.2.a':
    'बिल्कुल। IBRAR AI STUDIO एंड्रॉइड और iPhone के लिए मोबाइल-फ़र्स्ट बनाया गया है और कंप्यूटर पर भी शानदार दिखता है।',
  'faq.3.q': 'क्या जेनरेशन अभी चालू है?',
  'faq.3.a':
    'यह स्टूडियो इंटरफ़ेस का पहला रिलीज़ है। “एआई API ज़रूरी” वाले टूल्स असली एआई सेवाओं से जोड़े जा रहे हैं और तब तक कभी नकली परिणाम नहीं दिखाएँगे।',
  'faq.4.q': 'मेरा डेटा और कुंजियाँ कैसे सुरक्षित हैं?',
  'faq.4.a':
    'सभी एआई प्रोवाइडर सुरक्षित सर्वर फ़ंक्शन से कॉल होते हैं। कोई भी गुप्त कुंजी ब्राउज़र को नहीं भेजी जाती।',

  'cta.title': 'कुछ शानदार बनाने के लिए तैयार हैं?',
  'cta.desc': 'आज ही मुफ़्त जुड़ें और हर टूल आज़माने के लिए रोज़ क्रेडिट पाएँ।',

  'footer.tagline': 'आपकी कल्पना, एआई की शक्ति से।',
  'footer.product': 'प्रोडक्ट',
  'footer.company': 'कंपनी',
  'footer.about': 'हमारे बारे में',
  'footer.privacy': 'गोपनीयता',
  'footer.terms': 'शर्तें',
  'footer.contact': 'संपर्क',
  'footer.rights': 'सर्वाधिकार सुरक्षित।',

  'studio.title': 'क्रिएशन स्टूडियो',
  'studio.subtitle': 'टूल चुनें, अपना आइडिया बताइए और बनाइए।',
  'studio.prompt': 'प्रॉम्प्ट',
  'studio.negative': 'इनसे बचें (वैकल्पिक)',
  'studio.style': 'स्टाइल',
  'studio.ratio': 'आस्पेक्ट रेशियो',
  'studio.generate': 'बनाएँ',
  'studio.output': 'आउटपुट',
  'studio.emptyOutput': 'आपकी रचना यहाँ दिखाई देगी।',
  'studio.pendingTitle': 'एआई सेवा अभी जुड़ी नहीं है',
  'studio.queued':
    'आपका अनुरोध दर्ज हो गया, लेकिन यह टूल अभी किसी एआई प्रोवाइडर से नहीं जुड़ा है, इसलिए कोई आउटपुट नहीं बना।',
  'studio.upload': 'इमेज अपलोड करें',
  'studio.uploadHint': 'PNG या JPG, अधिकतम 10 MB',
  'studio.uploadPortrait': 'पोर्ट्रेट फ़ोटो अपलोड करें',
  'studio.motion': 'मोशन',
  'studio.duration': 'अवधि',
  'studio.editAction': 'एडिट विकल्प',
  'studio.script': 'स्क्रिप्ट',
  'studio.scriptPlaceholder': 'फ़ोटो क्या बोले, यहाँ लिखें…',
  'studio.voice': 'आवाज़',
  'studio.speed': 'गति',
  'studio.pitch': 'पिच',
  'studio.text': 'टेक्स्ट',
  'studio.speak': 'बोलें',
  'studio.stop': 'रोकें',
  'studio.ttsPlaceholder': 'नमस्ते! आईबीआर एआई स्टूडियो में आपका स्वागत है।',
  'studio.voicePlaceholder':
    'IBRAR AI STUDIO में आपका स्वागत है — जहाँ आपकी कल्पना साकार होती है।',
  'studio.noVoices':
    'इस डिवाइस पर कोई हिंदी आवाज़ नहीं मिली। एंड्रॉइड पर Chrome या iPhone पर Safari आज़माएँ।',
  'studio.chatPlaceholder': 'हिंदी या अंग्रेज़ी में कुछ भी पूछें…',
  'studio.send': 'भेजें',
  'studio.chatWelcome':
    'नमस्ते! मैं IBRAR AI असिस्टेंट हूँ। एआई मॉडल से जुड़ने के बाद मैं प्रॉम्प्ट, स्क्रिप्ट और कैप्शन लिखने में आपकी मदद करूँगा।',
  'studio.chatPending':
    'चैट असिस्टेंट अभी किसी एआई मॉडल से नहीं जुड़ा है, इसलिए मैं असली जवाब नहीं दे सकता। आपका संदेश यहाँ रखा गया है ताकि आप देख सकें कि बातचीत कैसे होगी।',
  'studio.credits': 'क्रेडिट',
  'studio.cost': 'लागत',

  'dash.welcome': 'फिर से स्वागत है',
  'dash.subtitle': 'आपके स्टूडियो में क्या चल रहा है, देखें।',
  'dash.credits': 'आज बचे क्रेडिट',
  'dash.creations': 'कुल रचनाएँ',
  'dash.plan': 'मौजूदा प्लान',
  'dash.upgrade': 'प्रीमियम में अपग्रेड करें',
  'dash.quick': 'झटपट बनाएँ',
  'dash.recent': 'हाल की गतिविधि',
  'dash.usage': 'इस हफ़्ते का उपयोग',
  'dash.demo': 'डेमो डेटा',
  'dash.demoNote':
    'आप एक सैंपल डैशबोर्ड देख रहे हैं। खाते चालू होने के बाद आपकी असली गतिविधि यहाँ दिखेगी।',
  'dash.status.done': 'पूर्ण',
  'dash.status.pending': 'एआई की प्रतीक्षा',
  'dash.planUsage': 'आज इस्तेमाल हुए क्रेडिट',

  'auth.loginTitle': 'फिर से स्वागत है',
  'auth.loginSub': 'बनाना जारी रखने के लिए लॉग इन करें।',
  'auth.signupTitle': 'अपना मुफ़्त खाता बनाएँ',
  'auth.signupSub': 'रोज़ 10 मुफ़्त क्रेडिट पाएँ।',
  'auth.name': 'पूरा नाम',
  'auth.email': 'ईमेल',
  'auth.password': 'पासवर्ड',
  'auth.google': 'Google से जारी रखें',
  'auth.or': 'या',
  'auth.login': 'लॉग इन',
  'auth.signup': 'खाता बनाएँ',
  'auth.noAccount': 'नए हैं?',
  'auth.haveAccount': 'पहले से खाता है?',
  'auth.forgot': 'पासवर्ड भूल गए?',
  'auth.pending':
    'खाते अगले रिलीज़ में आ रहे हैं। यह फ़ॉर्म एक प्रीव्यू है और कुछ भी सेव नहीं करता।',
  'auth.terms': 'जारी रखकर आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं।',
}

export type Lang = 'en' | 'hi'
const dictionaries: Record<Lang, Record<TKey, string>> = { en, hi }
const STORAGE_KEY = 'ibrar-lang'

type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TKey) => string
}

const I18nContext = React.createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>('en')

  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'hi') setLangState(saved)
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = React.useMemo<I18nValue>(
    () => ({ lang, setLang, t: (key) => dictionaries[lang][key] }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
