//Define Ui Element
let form=document.querySelector('#task-form');
let tasks_list=document.querySelector('ul');
let clearBtn=document.querySelector('#clear_task_btn');
let filter=document.querySelector('#task_filter');
let taskInput=document.querySelector('#new-task');

//Define Event listener
form.addEventListener('submit',addTask);
tasks_list.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

//Define Function
function addTask(e){
	e.preventDefault();
	if(taskInput.value === ''){
		alert('Add a task!');
	}else{
		let li=document.createElement('li');
		li.appendChild(document.createTextNode(taskInput.value + " "));
		let link=document.createElement('a');
		link.setAttribute('href', '#');
		link.innerHTML='<i class="far fa-trash-alt"></i>';
		li.appendChild(link);
		tasks_list.appendChild(li);
		storeTaskLocalStorage(taskInput.value); 
		taskInput.value='';
	}
}
function removeTask(e){
	if(e.target.hasAttribute('href')){
		if(confirm("Are you sure?")){
			let ele=e.target.parentElement;
			ele.remove();
			// local storage
			removeFromLS(ele);
		}
	}
}
function clearTask(e){
	while(tasks_list.firstChild){
		tasks_list.removeChild(tasks_list.firstChild);
	}
}
function filterTask(e){
	 let text = e.target.value.toLowerCase(); 
    document.querySelectorAll('li').forEach(task => { 
        let item = task.firstChild.textContent; 

        if (item.toLowerCase().indexOf(text) != -1) { 
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
// local storage
function storeTaskLocalStorage(task) {
    let tasks;
    
    if (localStorage.getItem('tasks') === null) { 
        tasks = []; 
    } else { 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task); 

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => { 

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " ")); 
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        li.appendChild(link);
        tasks_list.appendChild(li);
    });
}
function removeFromLS(taskItem) { 
    
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild); 
    
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1); 
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}