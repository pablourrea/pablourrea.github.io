/**
 * @file
 * Enables syntax highlighting via highlight.js.
 */
import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/core.min.js';

(function (Drupal, drupalSettings) {
  const languages = drupalSettings.highlightJsLanguages || [];
  const initEvent = new Event("highlightjs:init");
  const promises = Object.values(languages).map(language => {
    return import(`https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/languages/${language}.min.js`)
      .then(module => hljs.registerLanguage(language, module.default))
      .catch(e => console.error(`${e.name}: ${e.message}`));
  });

  if (drupalSettings.enableCopyButton == true) {
    promises.push(
        import('./highlightjs-copy.min.js')
            .then(module => hljs.addPlugin(new module.default))
    );
  }

  Drupal.behaviors.highlightInit = {
    attach (context, settings) {
      // Run this once, on first page load.
      if (context !== document) {
        return;
      }
      Promise.all(promises).then(() => {
        hljs.highlightAll();
        document.dispatchEvent(initEvent);
      })
    }
  }
})(Drupal, drupalSettings)
