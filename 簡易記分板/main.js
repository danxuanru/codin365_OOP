const players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
];

const ICON_PLUS = '<i class="fas fa-plus-circle plus"></i>';
const ICON_MINUS = '<i class="fas fa-minus-circle minus"></i>';

let tbodyContent = '';
players.forEach((player) => {
  tbodyContent += `
    <tr>
      <td>${player.name}</td>
      <td>${ICON_MINUS} <span>${player.pts}</span> ${ICON_PLUS}</td>
      <td>${ICON_MINUS} <span>${player.reb}</span> ${ICON_PLUS}</td>
      <td>${ICON_MINUS} <span>${player.ast}</span> ${ICON_PLUS}</td>
      <td>${ICON_MINUS} <span>${player.stl}</span> ${ICON_PLUS}</td>
      <td>${ICON_MINUS} <span>${player.blk}</span> ${ICON_PLUS}</td>
    </tr>
  `;
});
// console.log(tbodyContent);

const tbody = document.querySelector('#data-panel');
tbody.innerHTML = tbodyContent;

// console.log(document.querySelector('.plus').previousElementSibling);

tbody.addEventListener('click', (event) => {
  if (event.target.matches('.plus')) {
    const scoreEl = event.target.previousElementSibling;
    let currentNumber = parseInt(scoreEl.innerText);
    currentNumber = ++currentNumber;
    scoreEl.innerText = currentNumber;
  }
  if (event.target.matches('.minus')) {
    const scoreEl = event.target.nextElementSibling;
    let currentNumber = parseInt(scoreEl.innerText);
    if (currentNumber <= 0) return;
    currentNumber = --currentNumber;
    scoreEl.innerText = currentNumber;
  }
});
