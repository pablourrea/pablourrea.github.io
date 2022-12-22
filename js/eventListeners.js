/**
 * Provides custom event listeners.
 */

// Next page scroll.
Array.prototype.map.call(document.getElementsByClassName('scroll-to-next-page'), (element) => {
  element.onclick = function() {
    docSlider.nextPage();
  };
});

// Translate page, provide Spanish by default.
let currentLanguage = 'es';
let translator = new EOTranslator(EOTranslatorDictionary, currentLanguage);
Array.prototype.map.call(document.getElementsByClassName('translate'), (element) => {
  element.setAttribute('eo-translator-html', true);
  element.setAttribute('eo-translator', element.innerText);
});
translator.translateDOM();

Array.prototype.map.call(document.getElementsByClassName('translate-component'), (element) => {
  if (element.getAttribute('eo-translator-component') === currentLanguage) {
    element.style.display = 'none';
  }
  else {
    element.style.display = 'flex';
  }

  element.onclick = function() {
    currentLanguage = element.getAttribute('eo-translator-component');
    translator = new EOTranslator(EOTranslatorDictionary, currentLanguage);
    translator.translateDOM();

    Array.prototype.map.call(document.getElementsByClassName('translate-component'), (element) => {
      if (element.getAttribute('eo-translator-component') === currentLanguage) {
        element.style.display = 'none';
      }
      else {
        element.style.display = 'flex';
      }
    });
  };
});
