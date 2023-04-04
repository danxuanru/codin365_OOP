const imgEl = document.querySelector('img');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
      console.log(response.data);
      imgEl.src = response.data.message;
      return axios.get('https://dog.ceo/api/breeds/image/random'); // Promise
    })
    .then((secondResponse) => {
      console.log(secondResponse.data);
    })
    .catch((err) => console.error(err));
});

// thenable  chaining
