const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const inputPostId = document.createElement ('input');
inputPostId.value ="Enter Post Id";
inputPostId.id ="nb";

const search = document.createElement ('button');
search.textContent ="Launch the search";
search.onclick = function () {
  var nb_final = document.getElementById("nb").value;
  test(nb_final)
}

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(inputPostId)
app.appendChild(search)
app.appendChild(container);

function test(nb) {
  container.innerHTML='';
  var request = new XMLHttpRequest();
  request.open('GET', 'https://jsonplaceholder.typicode.com/comments?postId=' + nb, true);
  request.onload = function () {
    var dataPosts = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      dataPosts.forEach(monPost => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
  
        const h1 = document.createElement('h1');
        h1.textContent = monPost.id + " - " + monPost.name;
  
        const p = document.createElement('p');
        monPost.body = monPost.body.substring(0, 300);
        p.textContent = `${monPost.body}...`;
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
      });
    } else {
      const errorMessage = document.createElement('h1');
      errorMessage.textContent = `ERROR! API NOT FOUND`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}