
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
  let ListOfGames = Array.from(document.querySelectorAll('[data-id]'));
  ListOfGames.map((List, index) => List.addEventListener('click', function(e){
    ListOfGames[Selected].classList.remove('email-item-selected');
    List.classList.add('email-item-selected');
    Selected = index;
    GameBody(index, games);
  }));
  if (games.length > 0){
    ListOfGames[Selected].classList.add('email-item-selected')
    GameBody(Selected, games);
  }
  else
  {
    let main = document.querySelector('#main');
    main.innerHTML = `<h1 class="alert alert-warning" style="margin-left:250px;"> Sorry! No games in this Folder </h1>`
  }
  }


  let TrashFolder = document.querySelector('#TrashFolder');
  
    TrashFolder.addEventListener('click', function(trsh){
      trsh.preventDefault;
      let DeletedGames = games.filter(game => game.deleted);
      render (DeletedGames);
    });
  
  
  
    let InboxFolder = document.querySelector('#InboxFolder');
    
    InboxFolder.addEventListener('click', function(box){
      box.preventDefault;
      let inboxGames = games.filter(game => !game.deleted);
      render (inboxGames);
    });

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
          <button data-id=${index} id="DelButton" class="secondary-button pure-button ${games[index].deleted === true ? 'btn btn-danger' : ''}">${games[index].deleted === true ? 'Deleted' : 'Delete'}</button>
          <button data-id=${index} class="secondary-button pure-button">Archive</button>
          <button data-id=${index} class="secondary-button pure-button">Unread</button>
        </div>
      </div>

      <div class="email-content-body">
      <iframe src="${games[index].ifrmSrc}" height="500px" width="850px"></iframe>    
      </div>
  </div>`;

  let main = document.querySelector('#main');
  main.innerHTML=BodyOfgame

  let DelButton = document.querySelector('#DelButton');
  DelButton.addEventListener('click',function(delGame){
    if(!games[this.dataset.id].deleted){
    games[this.dataset.id].deleted = true;
    LocalStorage();
    let inboxGames = games.filter(game => !game.deleted);
    render (inboxGames);
  }else{
    delete  games[this.dataset.id].deleted;
    let DeletedGames = games.filter(game => game.deleted);
    render (DeletedGames);
  }
  });
}
function LocalStorage(){
  localStorage.setItem('items', JSON.stringify(games));
}

if(localStorage.getItem('items')){
  games = JSON.parse(localStorage.getItem('items'));
  let storage = games.filter(game => !game.deleted);
  render (storage);
}
else{
render(games);
}