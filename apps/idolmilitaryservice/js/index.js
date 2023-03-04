(function () {

  window.onload = async function() {
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
  }

} ());