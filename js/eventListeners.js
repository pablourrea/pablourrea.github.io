/**
 * Provides custom event listeners.
 */

// Next page scroll.
Array.prototype.map.call(document.getElementsByClassName('scroll-to-next-page'), (element) => {
  element.onclick = function() {
    docSlider.nextPage();
  };
});

// Send email
Array.prototype.map.call(document.getElementsByClassName('send-contact-email'), (element) => {
  element.onclick = function() {
    const sendEmailLink = document.createElement('a');
    sendEmailLink.setAttribute('href', 'mailto:paurca@gmail.com?subject=Desarrollo&amp;body=' + document.getElementById('contact-form--message').value);
    sendEmailLink.click();
  };
});
