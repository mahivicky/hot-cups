/*
  Simple i18n helper.
  Exposes: i18n.translate(lang), i18n.getText(key, lang)
  Use data-i18n="key" on any element to auto-translate.
*/
const i18n = (function () {
  const translations = {
    en: {
      "promo.title": "Hot Soup Fest!",
      "tab.soups": "Soups",
      "tab.juices": "Juices",
      "footer.contact": "Contact: +91 98765 43210 — 123 Soup Street",
      "footer.hours": "Open: 8:00 AM — 10:00 PM",
      "soups.title": "Hot Soup Varieties",
      "soup.tomato.name": "Tomato Soup",
      "soup.tomato.desc": "A warm, comforting tomato soup.",
      "juices.title": "Healthy Juices",
      "juice.mango.name": "Mango Juice",
      "juice.mango.desc": "Fresh, ripe mango juice",
      "juice.amla.name": "Amla Juice – Top 10 Powerful Benefits",
      "juice.amla.desc": "1. Super immunity booster – protects from infections.\n2.Enhances digestion and reduces acidity.\n3. Natural detox drink that purifies the blood.\n4. Gives glowing, youthful skin.\n5. Strengthens hair roots and reduces hair fall.\n6. Supports weight loss by boosting metabolism.\n7. Helps control blood sugar levels.\n8. Improves heart health and lowers bad cholesterol.\n9. Sharpens memory and improves focus.\n10. Boosts energy and reduces tiredness.",
      "juice.amla.image": "/assets/images/amla_juice.png"
    },
    ta: {
      "promo.title": "வெப்பமான சூப் பண்டிகை!",
      "tab.soups": "சூப்புகள்",
      "tab.juices": "ரசங்கள்",
      "footer.contact": "தொடர்பு: +91 98765 43210 — 123 சூப் வீதி",
      "footer.hours": "திறப்பு: காலை 8:00 — இரவு 10:00",
      "soups.title": "வெப்பமான சூப் வகைகள்",
      "soup.tomato.name": "தக்காளி சூப்",
      "soup.tomato.desc": "சூடான, சிப்பெட்டான தக்காளி சூப் — உடலை சூரவை செய்கிறது",
      "juices.title": "ஆரோக்கிய ரசங்கள்",
      "juice.mango.name": "மாங்கா ஜூஸ்",
      "juice.mango.desc": "பழச்சத்து நிறைந்த மாங்கா ரசம்"
    },
    kn: {
      "promo.title": "ಹಾಟ್ ಸೂಪ್ ಹಬ್ಬ!",
      "tab.soups": "ಸೂಪುಗಳು",
      "tab.juices": "ರಸಗಳು",
      "footer.contact": "ಸಂಪರ್ಕ: +91 98765 43210 — 123 ಸೂಪ್ ಬೀದಿ",
      "footer.hours": "ಮುಕ್ತ: ಬೆಳಗ್ಗೆ 8:00 — ರಾತ್ರ 10:00",
      "soups.title": "ಹಾಟ್ ಸೂಪ್ ಪ್ರಕಾರಗಳು",
      "soup.tomato.name": "ಟೊಮೆಟೋ ಸೂಪ್",
      "soup.tomato.desc": "ಉರಿಗೊಸರು, ರಿಚ್ ಟೊಮೆಟೊ ಸೂಪ್",
      "juices.title": "ಆರೋಗ್ಯಕರ ರಸಗಳು",
      "juice.mango.name": "ಮ್ಯಾಂಗೋ ಜ್ಯೂಸ್",
      "juice.mango.desc": "ಮಾಲಿನ್ಯವಿಲ್ಲದ ಮಾವಿನ ರಸ"
    },
    te: {
      "promo.title": "హాట్ సూప్ పండుగ!",
      "tab.soups": "సూప్స్",
      "tab.juices": "జ్యూసులు",
      "footer.contact": "సంప్రదించండి: +91 98765 43210 — 123 సూప్ వీధి",
      "footer.hours": "సమయం: ఉదయం 8:00 — రాత్రి 10:00",
      "soups.title": "వార్మ్ సూప్ రకాల",
      "soup.tomato.name": "టొమాటో సూప్",
      "soup.tomato.desc": "సూసలైన, రుచికరమైన టొమాటో సూప్",
      "juices.title": "ఆరోగ్యకరమైన రసాలు",
      "juice.mango.name": "మామిడి జ్యూస్",
      "juice.mango.desc": "స్మూత్ మామిడి రసం"
    },
    hi: {
      "promo.title": "हॉट सूप उत्सव!",
      "tab.soups": "सूप्स",
      "tab.juices": "रस",
      "footer.contact": "संपर्क: +91 98765 43210 — 123 सूप स्ट्रीट",
      "footer.hours": "समय: सुबह 8:00 — रात 10:00",
      "soups.title": "हॉट सूप प्रकार",
      "soup.tomato.name": "टमाटर सूप",
      "soup.tomato.desc": "गरम, स्वादिष्ट टमाटर सूप",
      "juices.title": "स्वस्थ रस",
      "juice.mango.name": "आम का जूस",
      "juice.mango.desc": "रसीला आम का जूस"
    },
    ml: {
      "promo.title": "ഹോട്ട് സൂപ്പ് ആഘോഷം!",
      "tab.soups": "സൂപ്പുകൾ",
      "tab.juices": "ജ്യൂസുകൾ",
      "footer.contact": "സമ്പർക്കം: +91 98765 43210 — 123 സൂപ്പ് സ്ട്രീറ്റ്",
      "footer.hours": "സമയം: രാവിലെ 8:00 — രാത്രി 10:00",
      "soups.title": "ഹോട്ട് സൂപ്പ് തരം",
      "soup.tomato.name": "തക്കാളി സൂപ്പ്",
      "soup.tomato.desc": "ചൂടുള്ള, രുചികരമായ തക്കാളി സൂപ്പ്",
      "juices.title": "ആരോഗ്യകരമായ ജ്യൂസുകൾ",
      "juice.mango.name": "മാമ്പഴം ജ്യൂസ്",
      "juice.mango.desc": "തണുത്ത മാമ്പഴം ജ്യൂസ്"
    }
  };

  function getText(key, lang) {
    const langMap = translations[lang] || translations['hi'];
    return langMap[key] || translations['hi'][key] || key;
  }

  function translateDocument(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = getText(key, lang);
    });
  }

  // set src on images (or other elements with data-i18n-src)
    document.querySelectorAll('[data-i18n-src]').forEach(el => {
      const key = el.getAttribute('data-i18n-src');
      const val = getText(key, lang);
      if (val) el.src = val;
    });

    // set alt text
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const val = getText(key, lang);
      if (val) el.alt = val;
    });

    // set background-image style
    document.querySelectorAll('[data-i18n-bg]').forEach(el => {
      const key = el.getAttribute('data-i18n-bg');
      const val = getText(key, lang);
      if (val) el.style.backgroundImage = `url("${val}")`;
    });

  return {
    translate: translateDocument,
    getText
  };
})();