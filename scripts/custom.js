

function render(games) {
let snippet = `${games.map((game, index) =>` 
<div class="email-item pure-g" data-id="${index}">
<div class="pure-u">
    <img width="64" height="64" alt="avatar" class="email-avatar" src="${game.avatar}">
</div>

<div class="pure-u-3-4">
    <h5 class="email-name">${game.publisher} ${game.date}</h5>
    <h4 class="email-subject">${game.subject}</h4>
    <p class="email-desc">
        ${game.body.length > 80 ? `${game.body.substr(0,79)}...`: game.body}
    </p>
</div>
</div>`).join("")}`;
let GameColumn = document.getElementById('list');
GameColumn.innerHTML = snippet;

Gamefunc(games);
}
function Gamefunc(games){
  let Selected = 0;
  let ListOfEmail = Array.from(document.querySelectorAll('[data-id]'));
  ListOfEmail.map((List, index) => List.addEventListener('click', function(e){
    ListOfEmail[Selected].classList.remove('email-item-selected');
    List.classList.add('email-item-selected');
    Selected = index;
    GameBody(index, games);
  }));
  if (games.length > 0){
    ListOfEmail[Selected].classList.add('email-item-selected')
    GameBody(Selected, games);
  }
  let trash = document.querySelector('.pure-menu-link')
  let BtnDelete = Array.from(document.querySelectorAll('[data-id]'));
  BtnDelete.map((Btn, index) => Btn.addEventListener('click',function(Del){
    Del.preventDefault();
    if(games[this.dataset.id].Selected = true)
    {
      games.filter(function(deletegame){
        games.move(trash);
      })
      console.info(`Unfollowed ${games[this.dataset.id].publisher}`);
      }
    render(games);
  }));
}


function GameBody(index, games){
      let BodyOfgame =`
      <div class="email-content">
      <div class="email-content-header pure-g">
          <div class="pure-u-1-2">
              <h1 class="email-content-title">${games[index].subject}</h1>
              <p class="email-content-subtitle">
                  From <a>'${games[index].publisher}'</a> <span>${games[index].date}</span>
              </p>
          </div>

        <div class="email-content-controls pure-u-1-2">
          <button data-id=${index} class="secondary-button pure-button">Delete</button>
          <button data-id=${index} class="secondary-button pure-button">Archive</button>
          <button data-id=${index} class="secondary-button pure-button">Unread</button>
        </div>
      </div>

      <div class="email-content-body">
      <iframe src="${games[index].ifrmSrc}" height="600px" width="900px"></iframe>    
      </div>
  </div>`;

  let main = document.querySelector('#main');
  main.innerHTML=BodyOfgame
}
render(games);