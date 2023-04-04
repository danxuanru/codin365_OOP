// https://randomuser.me/api/?results=10

const usersContainer = document.querySelector('.users');
const maleSelector = document.querySelector('.male');
const femaleSelector = document.querySelector('.female');
const allSelector = document.querySelector('.all');

// preconfigure
maleSelector.addEventListener('click', fetchUsers.bind(null, 'male'));
femaleSelector.addEventListener('click', fetchUsers.bind(null, 'female'));
allSelector.addEventListener('click', fetchUsers.bind(null, 'all'));

/**
 *
 * @param {string} filter
 */
function fetchUsers(filter) {
  axios
    .get(`https://randomuser.me/api/?results=10&gender=${filter}`)
    .then((response) => {
      const users = response.data.results;
      console.log(users);
      let rowContent = '';
      users.forEach((user) => {
        rowContent += `
      <div class="col">
        <div class="card">
          <img src="${user.picture.thumbnail}" style="height:100px; object-fit:cover" class="card-img-top" alt="${user.cell}" />
          <div class="card-body">
            <h6 class="card-title">${user.name.title}. ${user.name.first} ${user.name.last}</h6>
            <p class="card-text">
              <ul>
                <li>Gender:${user.gender}</li>
                <li>Email:${user.email}</li>
                <li>Phone number:${user.phone}</li>
              </ul>
              <small>Register At: ${user.registered.date}</small>
            </p>
          </div>
        </div>
      </div>
      `;
      });

      usersContainer.innerHTML = rowContent;
    })
    .catch((err) => console.log(err));
}

// /**
//  * This is my function
//  * @param {string} name
//  * @param {number} age
//  * @param {string} birthday
//  */
// function myFunction(name, age, birthday) {
//   console.log(name);
//   console.log(age);
//   console.log(birthday);
// }

// myFunction();
