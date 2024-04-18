/**
 * @file
 * Enables syntax highlighting via highlight.js.
 */
import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@11.8.0/es/core.min.js';

(function (Drupal, drupalSettings) {
  const languages = drupalSettings.highlightJsLanguages || [];
  const initEvent = new Event("highlightjs:init");
  const promises = Object.values(languages).map(language => {
    return import(`https://unpkg.com/@highlightjs/cdn-assets@11.8.0/es/languages/${language}.min.js`)
      .then(module => hljs.registerLanguage(language, module.default));
  });

  promises.push(
    import('./highlightjs-copy.min.js')
      .then(module => hljs.addPlugin(new module.default))
) ;

  // Run this once, on first page load.
  Promise.all(promises).then(() => {
    hljs.highlightAll();
    document.dispatchEvent(initEvent);
  })

})(Drupal, drupalSettings)
