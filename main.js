window.addEventListener('load', () => {


    Ak_todo= JSON.parse(localStorage.getItem('Ak_todo')) || []; // just made a list

    const nameInput = document.querySelector('#name');
    const todoform = document.querySelector('#todoform');

    const userName = localStorage.getItem('userName') || '';

    nameInput.value = userName;

    nameInput.addEventListener('change', myFunction);
    function myFunction(event){

          localStorage.setItem('userName',event.target.value);
    }
     
    todoform.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
              content: e.target.elements.data.value,
              
              done: false,
              createdAt: new Date().getTime()
        }

        Ak_todo.push(todo);

        localStorage.setItem('Ak_todo', JSON.stringify(Ak_todo));
        e.target.reset();

        display();

    })

    display();
})

function display(){

    const list = document.querySelector('#todo-list');

    list.innerHTML="";

    Ak_todo.forEach(todo => {

        
        

        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        
        
		 const label = document.createElement('label');
		 const input = document.createElement('input');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const Deletebutton = document.createElement('button');
        
        
		 input.type = 'checkbox';
		 input.checked = todo.done;

        content.classList.add('todo-content');

        actions.classList.add('actions');
        edit.classList.add('edit');

        Deletebutton.classList.add('delete');


        content.innerHTML= `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML="Edit";
        Deletebutton.innerHTML="Delete";

        input.classList.add('Checkbox');
        


        
       
        label.appendChild(input);

        actions.appendChild(edit);
        actions.appendChild(Deletebutton);
        

        todoItem.appendChild(label);

        todoItem.appendChild(content);
        todoItem.appendChild(actions);


        list.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add('done');
        }

       input.addEventListener('click', e => {

             todo.done=e.target.checked;
             localStorage.setItem('Ak_todo', JSON.stringify(Ak_todo));

             if(todo.done){
                 todoItem.classList.add('done');
             }

             else {

                  todoItem.classList.remove('done');
             }

             display();
       })


        edit.addEventListener('click', function handleclick(e) 
        { 

             const input = content.querySelector('input');
             input.removeAttribute('readonly');
             input.focus();

             input.addEventListener('blur', (e) => {

                   input.setAttribute('readonly', true);

                   todo.content = e.target.value;
                   localStorage.setItem('Ak_todo', JSON.stringify(Ak_todo))

                   display();
             })


             

        })

        Deletebutton.addEventListener('click', function handleclick(e){

            Ak_todo = Ak_todo.filter(t => t!=todo);

            localStorage.setItem('Ak_todo', JSON.stringify(Ak_todo));
            display();
       })


       

    });
}







      
