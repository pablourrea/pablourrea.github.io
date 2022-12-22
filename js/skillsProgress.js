/**
 * Provides custom progress bars for skills sections.
 */

Array.prototype.map.call(document.getElementsByClassName('main-content__section__skills-progress'), (wrapper) => {
  const skills = [
    {
      'name' : 'PHP',
      'value': 95,
      'color' : '#AEB2D5',
      'logo' : './assets/php-logo.png',
    },
    {
      'name' : 'HTML 5',
      'value': 95,
      'color' : '#FF5573',
      'logo' : './assets/html-logo.png',
    },
    {
      'name' : 'CSS',
      'value': 95,
      'color' : '#264DE4',
      'logo' : './assets/css-logo.png',
    },
    {
      'name' : 'Javascript',
      'value': 90,
      'color' : '#F0DB4F',
      'logo' : './assets/javascript-logo.png',
    },
    {
      'name' : 'GIT',
      'value': 90,
      'color' : '#F34F29',
      'logo' : './assets/git-logo.png',
    },
    {
      'name' : 'Twig',
      'value': 85,
      'color' : '#BACF29',
      'logo' : './assets/twig-logo.png',
    },
    {
      'name' : 'SQL',
      'value': 85,
      'color' : '#F29111',
      'logo' : './assets/sql-logo.png',
    },
    {
      'name' : 'Drupal',
      'value': 80,
      'color' : '#0077C0',
      'logo' : './assets/drupal-logo.png',
    },
    {
      'name' : 'Photoshop',
      'value': 60,
      'color' : '#234561',
      'logo' : './assets/photoshop-logo.png',
    },
    {
      'name' : 'React',
      'value': 50,
      'color' : '#61DBFB',
      'logo' : './assets/react-logo.png',
    },
  ];

  skills.forEach((element, index) => {
    const progressElement = document.createElement('div');
    const progressBarElement = document.createElement('div');
    const progressLogoElement = document.createElement('img');
    const progressWrapperElement = document.createElement('div');

    progressElement.classList.add('progress');
    progressWrapperElement.classList.add('main-content__section__skills-progress__wrapper');
    progressLogoElement.classList.add('main-content__section__skills-progress__wrapper__logo');
    (element.value > 0 && element.value < 100) ? progressBarElement.classList.add('progress-bar', 'progress-bar-striped', 'progress-bar-animated') : progressBarElement.classList.add('progress-bar');

    progressBarElement.innerHTML = element.name;
    progressBarElement.setAttribute('title',  element.name);
    progressBarElement.setAttribute('aria-valuemin', '0');
    progressBarElement.setAttribute('role', 'progressbar');
    progressBarElement.setAttribute('aria-valuemax', '100');
    progressBarElement.setAttribute('aria-valuenow', element.value);

    progressLogoElement.setAttribute('src', element.logo);
    progressLogoElement.setAttribute('title',  element.name);
    progressLogoElement.setAttribute('alt', element.name + ' logo');

    progressBarElement.style.width = element.value + '%';
    progressBarElement.style.backgroundColor = element.color;

    progressElement.appendChild(progressBarElement);
    progressWrapperElement.appendChild(progressLogoElement);
    progressWrapperElement.appendChild(progressElement);

    wrapper.appendChild(progressWrapperElement);
  });
});
