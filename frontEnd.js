//import database, {database} from './db.js';
window.addEventListener('load', (event) => {
  const todoInput = document.querySelector('.todo-input');
  const todoButton = document.querySelector('.todo-button');
  //const taskParent = document.createElement('div');
  const tasks = document.querySelector('.tasks');
  const clear = document.querySelector('.clear');

  function clear1() {
    document.getElementById('tasks').innerHTML = '';
  }
  // //getData();

  const getData = () => {
    event.preventDefault();

    fetch('http://localhost:5501/db')
      .then((res) => {
        return res.json();
      })
      .then((data) =>
        data.forEach(function count(e) {
          //console.log('line 22 ' + e._id);
          let newItem = document.createElement('p');
          let button = document.createElement('button');
          let update = document.createElement('button');
          button.innerHTML = 'Delete';
          button.onclick = () => {
            fetch(`http://localhost:5501/db/${e._id}`, {
              method: 'DELETE',
            });
            clear1();
            getData();
          };

          //UPDATE
          update.innerHTML = 'update';
          update.onclick = () => {
            var my_text = prompt('Enter text here');
            if (my_text) {
              console.log(my_text);
              fetch(`http://localhost:5501/db/${e._id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                  todoInput: my_text,
                }),
              });
              clear1();
              getData();
            }
          };

          //END OF UPDATE
          //console.log(newItem);
          newItem.textContent = e.todoInput;
          newItem.setAttribute('_id', e._id);
          //console.log(newItem);
          tasks.appendChild(newItem);
          newItem.appendChild(button);
          newItem.appendChild(update);
          //console.log(e._id);
        })
      );
  };

  const postData = () => {
    fetch('http://localhost:5501/db', {
      method: 'POST',
      body: JSON.stringify({
        todoInput: document.querySelector('.todo-input').value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  function addTodo(event) {
    event.preventDefault();
    if (document.querySelector('.todo-input').value === '') {
      alert('THE FIELD IS BLANK');
      clear1();
      getData();
    } else {
      postData();
      clear1();
      getData();
      document.querySelector('.todo-input').value = '';
    }
  }

  todoButton.addEventListener('click', addTodo);
});
