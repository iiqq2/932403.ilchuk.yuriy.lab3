// Переключение языка страницы и CSS-переменных для варианта 17.
// Все цвета, шрифты и градиенты объявлены в style.css.
const languageButtons = document.querySelectorAll('[data-language]');
const themeVariables = ['primary', 'accent', 'surface', 'font-heading', 'focus-border'];
const translatedElements = document.querySelectorAll('[data-i18n]');
const translations = {
  ru: {},
  en: {
    description: 'Languages and phrases: Yuriy Ilchuk’s page. Lab 3, Flexbox and Grid, variant 17.',
    pageTitle: 'About me — Yuriy Ilchuk | Lab 3',
    heading: 'About me — Yuriy Ilchuk',
    intro: 'Group 932403. Language enthusiast and translator.',
    about: 'This page is about translation, learning English and communicating across cultures.',
    avatarAlt: 'Illustrated avatar of a language enthusiast holding a book',
    navigationLabel: 'Page sections',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact me',
    switchLabel: 'Language and appearance',
    languageLabel: 'Language:',
    ruButtonLabel: 'Russian language and appearance',
    enButtonLabel: 'English language and appearance',
    translationSkill: 'Text translation:',
    translationSkillText: 'conveying the meaning, tone and cultural context of the original.',
    englishSkill: 'Learning English:',
    englishSkillText: 'building vocabulary and practising grammar and pronunciation.',
    communicationSkill: 'Intercultural communication:',
    communicationSkillText: 'respecting traditions and differences in communication.',
    editingSkill: 'Editing:',
    editingSkillText: 'checking translations for clarity, accuracy and natural phrasing.',
    podcastProject: 'Translating podcasts from Ruri Ohama’s YouTube channel.',
    translateProject: 'Improving and training AI translation in ',
    engcliProject: 'Data annotation for the EngCLI project’s model.',
    engcliTitle: 'About EngCLI',
    engcliDescription: 'EngCLI is a terminal application. It uses a local model to assess your English level. You provide a link to a YouTube video, and the application creates and saves Anki flashcards based on the video’s content — only those relevant to your English level.',
    learningTitle: 'The language I am learning',
    learningText: 'English. I am developing my listening comprehension, vocabulary and translation accuracy.',
    learningTools: 'I use videos, podcasts and Anki flashcards to learn English. Find out more in the ',
    engcliLink: 'EngCLI description',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    messagePlaceholder: 'Which project would you like to discuss?',
    submitLabel: 'Send',
    languagesTitle: 'Languages I am learning',
    languagesNote: 'The levels and additional languages are sample content for the layout, not verified information about the student.',
    englishFlag: 'Flag of the United Kingdom',
    spanishFlag: 'Flag of Spain',
    frenchFlag: 'Flag of France',
    englishName: 'English',
    spanishName: 'Spanish',
    frenchName: 'French',
    levelLabel: 'Level:',
    englishCardText: 'Podcasts, translation and new expressions from videos.',
    spanishCardText: 'First greetings and everyday phrases.',
    frenchCardText: 'Getting started with pronunciation and simple conversations.',
    goToPhrase: 'See the phrase of the week',
    phrasesTitle: 'Phrase of the week',
    phrasesNote: 'Three short phrases: the original, translation, transcription and pronunciation.',
    englishPhraseTranslation: 'Thank you!',
    spanishPhraseTranslation: 'Hello!',
    frenchPhraseTranslation: 'Good morning!',
    audioEnglish: 'Listen to the English phrase',
    audioSpanish: 'Listen to the Spanish phrase',
    audioFrench: 'Listen to the French phrase',
    listen: 'Listen',
    dictionary: 'Dictionary',
    audioUnavailable: 'Speech playback is unavailable. Use the Dictionary link to hear the pronunciation.'
  }
};

// Русские тексты берутся из HTML, чтобы не дублировать их в словаре.
translatedElements.forEach((element) => {
  const attribute = element.dataset.i18nAttr;
  translations.ru[element.dataset.i18n] = attribute
    ? element.getAttribute(attribute)
    : element.textContent;
});

function translatePage(language) {
  document.documentElement.lang = language;

  translatedElements.forEach((element) => {
    const text = translations[language][element.dataset.i18n];
    const attribute = element.dataset.i18nAttr;

    if (attribute) {
      element.setAttribute(attribute, text);
    } else {
      element.textContent = text;
    }

    if (element.hasAttribute('data-translation')) {
      element.lang = language;
    }
  });
}

function applyLanguageTheme(button) {
  translatePage(button.dataset.language);
  const palette = getComputedStyle(button);

  themeVariables.forEach((variable) => {
    const value = palette.getPropertyValue(`--theme-${variable}`).trim();
    document.documentElement.style.setProperty(`--${variable}`, value);
  });

  languageButtons.forEach((item) => {
    item.setAttribute('aria-pressed', String(item === button));
  });
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguageTheme(button));
});

// Кнопки со значком аудио озвучивают оригинал, независимо от языка интерфейса.
const audioStatus = document.querySelector('#audio-status');

document.querySelectorAll('[data-audio]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      audioStatus.hidden = false;
      return;
    }

    const phrase = document.getElementById(button.dataset.audio);
    const utterance = new SpeechSynthesisUtterance(phrase.textContent);
    utterance.lang = phrase.lang;
    utterance.onerror = (event) => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        audioStatus.hidden = false;
      }
    };

    audioStatus.hidden = true;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  });
});
