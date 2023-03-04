
(function () {

  let localStorage = window.localStorage;

  let btnReload = document.getElementById('btn-reload');

  window.onload = function() {
    updateContent();

    setInterval(function() {
      updateContent();
    }, 1000);
  }

  btnReload.addEventListener('click', async () => {
    btnReload.classList.add('rotate');

    response = await fetch('https://pablourrea.github.io/apps/idolmilitaryservice/api/', {cache: "reload"});
    localStorageElement = await response.json();

    if (localStorageElement) {
      for (let [key, value] of Object.entries(localStorageElement)) {
        if (value.id && value.group) {
          localStorageElement = JSON.stringify(value);
          localStorage.removeItem(value.id);
          localStorage.setItem(value.group + '_' + value.id, localStorageElement);
        }
      }
    }

    await updateContent();

    await setTimeout(function() {
      btnReload.classList.remove('rotate');
    }, 1000);
  });

  async function updateContent() {
    Array.prototype.forEach.call(document.getElementsByClassName('card'), async function(card, index) {
      let localStorageElement = localStorage.getItem(idolsMilitaryServiceGroup + '_' + card.id);

      if (!localStorageElement) {
        response = await fetch('https://pablourrea.github.io/apps/idolmilitaryservice/api/', {cache: "reload"});
        localStorageElement = await response.json();

        for (let [key, value] of Object.entries(localStorageElement)) {
          if (value.id == card.id) {
            localStorageElement = JSON.stringify(value);
            localStorage.setItem(value.group + '_' + card.id, localStorageElement);
          }
        }
      }

      if (localStorageElement) {
        value = JSON.parse(localStorageElement);

        if (value.group == idolsMilitaryServiceGroup && value.id == card.id) {
          let cardContent = card.getElementsByClassName('card-content')[0];
          let cardContentStatus = cardContent.getElementsByClassName('card-content-status')[0];
          let cardContentStatusBool = cardContentStatus.getElementsByClassName('card-content-status-bool')[0];
          let cardContentETR = cardContent.getElementsByClassName('card-content-etr')[0];
          let cardContentETRTime = cardContent.getElementsByClassName('card-content-etr-time')[0];

          const currentTimestamp = Math.floor(Date.now() / 1000);
          const remainingTimestamp = (currentTimestamp < value.start_time) ? parseInt(value.start_time) - currentTimestamp :  parseInt(value.end_time) - currentTimestamp;

          let seconds = Math.floor((remainingTimestamp) % 60);
          let minutes = Math.floor((remainingTimestamp / 60) % 60);
          let hours = Math.floor((remainingTimestamp / 60 / 60) % 24);
          let days = Math.floor(remainingTimestamp / 60 / 60 / 24);

          if (currentTimestamp < value.start_time) {
            cardContentStatusBool.innerText = 'No';
            cardContentStatusBool.removeAttribute('true');
            cardContentETR.innerText = 'Estimated Time Until Military Service:';
          }
          else if (currentTimestamp > value.end_time) {
            cardContentStatusBool.innerText = 'No';
            cardContentStatusBool.removeAttribute('true');
            cardContentETR.innerText = 'Not in Service Since:';
          }
          else {
            cardContentStatusBool.innerText = 'Yes';
            cardContentStatusBool.setAttribute('true', true);
            cardContentETR.innerText = 'Estimated Time of Service:';
          }

          cardContentETRTime.innerText = days + 'd, ' + hours + 'h, ' + minutes + 'min and ' + seconds + 's';
        }
      }
    });
  }

} ());
