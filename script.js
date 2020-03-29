const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector('.form-control').value;
  const server = 'https://api.themoviedb.org/3/search/multi?api_key=464e10b60abead2a4d80d7babcfba4a2&language=ru&query=' + searchText;
  requestApi(server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('readystatechange', function () {
    if (request.readyState !== 4) return;
    if (request.status !== 200) {
      console.log('error: ' + request.status);
      return;
    }

    const output = JSON.parse(request.responseText);
    let inner = '';

    output.results.forEach(function (item) {
      let nameItem = item.name || item.title;
      console.log(nameItem);
      inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`;
    });

    movie.innerHTML = inner;

  });
}