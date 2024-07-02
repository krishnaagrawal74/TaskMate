let input = document.getElementById('inputBox')
let button = document.getElementById("btn")
let deleteAll = document.getElementById('deleteAll')
let checkallbtn = document.getElementById('checkAll')
let alltaskbtn = document.querySelector('#alltaskbtn')
let pendingbtn = document.querySelector('#pendingbtn')
let completedbtn = document.querySelector('#completedbtn')

let alltasklist = document.querySelector('#all-task')
let pendinglist = document.querySelector('#pending-task')
let completedlist = document.querySelector('#completed-task')

const menuBtns = document.querySelectorAll('.logo')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
menuBtns.forEach(menuBtn =>{
    menuBtn.addEventListener("click",()=>{
        left.classList.toggle("activated")
        right.classList.toggle("activated")
    })
})

alltasklist.addEventListener('click', (e) => {
    const editButton = e.target.closest('span');

    if (editButton && (editButton.id === "edit" || editButton.parentElement.id === "edit")) {
        const taskDiv = editButton.previousElementSibling;
        const taskId = taskDiv.parentElement.getAttribute('data-id');
        
        // Check if the task is checked
        const taskIsChecked = taskDiv.classList.contains('checked');
        if (taskIsChecked) {
            return; // Prevent editing if task is checked
        }

        if (taskDiv.getAttribute('data-editing') === 'true') {
            const editInputBox = taskDiv.querySelector('input');
            const newValue = editInputBox.value.trim();

            // Update the task content in all lists
            updateTaskContent(taskId, newValue);

            taskDiv.style.backgroundColor = 'var(--color2)';
            taskDiv.removeAttribute('data-editing');
            saveData();
        } else {
            const itemContent = taskDiv.innerText;
            const editInputBox = document.createElement('input');
            editInputBox.value = itemContent;
            editInputBox.style.width = '100%';

            taskDiv.innerHTML = '';
            taskDiv.appendChild(editInputBox);
            editInputBox.focus();
            taskDiv.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
            taskDiv.setAttribute('data-editing', 'true');

            const saveChanges = () => {
                const newValue = editInputBox.value.trim();
                if (newValue !== '') {
                    taskDiv.innerHTML = newValue;
                } else {
                    taskDiv.innerHTML = 'Untitled Task';
                }
                updateTaskContent(taskId, newValue);
                taskDiv.style.backgroundColor = 'var(--color2)';
                taskDiv.removeAttribute('data-editing');
                saveData();
            };

            editInputBox.addEventListener('blur', saveChanges);
            editInputBox.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveChanges();
                }
            });
        }
    }
});
function updateTaskContent(taskId, newValue) {
    const taskItems = [alltasklist, pendinglist, completedlist];
    taskItems.forEach(list => {
        const taskItem = list.querySelector(`[data-id='${taskId}'] div`);
        if (taskItem) {
            taskItem.innerHTML = newValue;
        }
    });
}

function deleteAllTasks() {
    alltasklist.innerHTML = ''
    pendinglist.innerHTML = ''
    completedlist.innerHTML = ''
    saveData()
}

alltaskbtn.addEventListener('click',(e)=>{
    alltasklist.classList.add('open')
    pendinglist.classList.remove('open')
    completedlist.classList.remove('open')
    alltaskbtn.classList.add('colored')
    pendingbtn.classList.remove('colored')
    completedbtn.classList.remove('colored')
})

pendingbtn.addEventListener('click',(e)=>{
    alltasklist.classList.remove('open')
    pendinglist.classList.add('open')
    completedlist.classList.remove('open')
    alltaskbtn.classList.remove('colored')
    pendingbtn.classList.add('colored')
    completedbtn.classList.remove('colored')
})

completedbtn.addEventListener('click',(e)=>{
    alltasklist.classList.remove('open')
    pendinglist.classList.remove('open')
    completedlist.classList.add('open')
    alltaskbtn.classList.remove('colored')
    pendingbtn.classList.remove('colored')
    completedbtn.classList.add('colored')
})

function saveData() {
    localStorage.setItem("AllTaskListData", alltasklist.innerHTML)
    localStorage.setItem("PendingTaskListData", pendinglist.innerHTML)
    localStorage.setItem("CompletedTaskListData", completedlist.innerHTML)
    
}

showTask()

function toggleTaskCompletion(taskId) {
    let allTaskItem = alltasklist.querySelector(`[data-id='${taskId}'] div`);
    let pendingTaskItem = pendinglist.querySelector(`[data-id='${taskId}'] div`);
    let completedTaskItem = completedlist.querySelector(`[data-id='${taskId}'] div`);

    if (allTaskItem.classList.contains('checked')) {
        allTaskItem.classList.remove('checked');
        pendingTaskItem.classList.remove('checked');
        completedTaskItem.classList.remove('checked');
        allTaskItem.previousElementSibling.querySelector('.checkicon img').src = 'check.svg';
        pendingTaskItem.previousElementSibling.querySelector('.checkicon img').src = 'check.svg';
        completedTaskItem.previousElementSibling.querySelector('.checkicon img').src = 'check.svg';
        pendingTaskItem.parentElement.style.display = 'flex';
        completedTaskItem.parentElement.style.display = 'none';
    } else {
        allTaskItem.classList.add('checked');
        pendingTaskItem.classList.add('checked');
        completedTaskItem.classList.add('checked');
        allTaskItem.previousElementSibling.querySelector('.checkicon img').src = 'checkfill.svg';
        pendingTaskItem.previousElementSibling.querySelector('.checkicon img').src = 'checkfill.svg';
        completedTaskItem.previousElementSibling.querySelector('.checkicon img').src = 'checkfill.svg';
        pendingTaskItem.parentElement.style.display = 'none';
        completedTaskItem.parentElement.style.display = 'flex';
    }

    saveData();
}



function toggleAllTasks() {
    const allTaskItems = document.querySelectorAll('#all-task li');
    let allChecked = Array.from(allTaskItems).every(item => item.querySelector('div').classList.contains('checked'));

    allTaskItems.forEach(item => {
        const taskId = item.getAttribute('data-id');
        const taskDiv = item.querySelector('div');
        const pendingTaskItem = pendinglist.querySelector(`[data-id='${taskId}']`);
        const completedTaskItem = completedlist.querySelector(`[data-id='${taskId}']`);

        if (allChecked) {
            // Uncheck all
            taskDiv.classList.remove('checked');
            pendingTaskItem.querySelector('div').classList.remove('checked');
            completedTaskItem.querySelector('div').classList.remove('checked');
            item.querySelector('.checkicon img').src = 'check.svg';
            pendingTaskItem.querySelector('.checkicon img').src = 'check.svg';
            completedTaskItem.querySelector('.checkicon img').src = 'check.svg';
            pendingTaskItem.style.display = 'flex';
            completedTaskItem.style.display = 'none';
        } else {
            // Check all
            taskDiv.classList.add('checked');
            pendingTaskItem.querySelector('div').classList.add('checked');
            completedTaskItem.querySelector('div').classList.add('checked');
            item.querySelector('.checkicon img').src = 'checkfill.svg';
            pendingTaskItem.querySelector('.checkicon img').src = 'checkfill.svg';
            completedTaskItem.querySelector('.checkicon img').src = 'checkfill.svg';
            pendingTaskItem.style.display = 'none';
            completedTaskItem.style.display = 'flex';
        }
    });

    // Update the button text immediately after toggling tasks
    updateCheckAllButtonText();
    saveData();
}

function updateCheckAllButtonText() {
    const allTaskItems = document.querySelectorAll('#all-task li div');
    const allChecked = Array.from(allTaskItems).every(item => item.classList.contains('checked'));

    // Update button text based on the state of all tasks
    if (allChecked && allTaskItems.length > 0) {
        checkallbtn.innerHTML = 'Uncheck All';
    } else {
        checkallbtn.innerHTML = 'Check All';
    }
}

function showTask() {
    alltasklist.innerHTML = localStorage.getItem("AllTaskListData") || '';
    pendinglist.innerHTML = localStorage.getItem("PendingTaskListData") || '';
    completedlist.innerHTML = localStorage.getItem("CompletedTaskListData") || '';

    // Update button text on initial load
    updateCheckAllButtonText();
}

// Event listener for clicking check icons in all task lists
[alltasklist, pendinglist, completedlist].forEach(list => {
    list.addEventListener('click', (e) => {
        if (e.target.id === 'checkicon' || e.target.parentElement.id === 'checkicon') {
            const taskId = e.target.closest('li').getAttribute('data-id');
            toggleTaskCompletion(taskId);
            updateCheckAllButtonText(); // Update the button text after toggling the task
        }
    });
});


// Ensure the button text updates when adding a new task
function addTask() {
    if (input.value !== '') {
        const taskId = Date.now();

        // Add task to all task lists
        createTaskElement(alltasklist, taskId, input.value);
        createTaskElement(pendinglist, taskId, input.value);
        createTaskElement(completedlist, taskId, input.value);

        input.value = '';
        saveData();
        updateCheckAllButtonText(); // Update the button text after adding a task
    }
}

// Helper function to create a task element in a specific list
// Helper function to create a task element in a specific list
function createTaskElement(list, taskId, taskContent, checked = false) {
    const listContainer = document.createElement('li');
    listContainer.setAttribute('data-id', taskId);
    list.insertAdjacentElement('beforeEnd', listContainer);

    const checkedIcon = document.createElement('span');
    checkedIcon.classList.add('checkicon');
    checkedIcon.setAttribute('id', 'checkicon');
    checkedIcon.innerHTML = `<img class="checkimg" src="${checked ? 'checkfill.svg' : 'check.svg'}" alt="">`;
    listContainer.appendChild(checkedIcon);

    const taskDiv = document.createElement('div');
    taskDiv.innerHTML = taskContent;
    listContainer.appendChild(taskDiv);

    const editIcon = document.createElement('span');
    editIcon.innerHTML = `<img src="edit.svg" alt="">`;
    editIcon.classList.add('editicon');
    editIcon.setAttribute('id', 'edit');
    taskDiv.insertAdjacentElement('afterend', editIcon);

    const deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '<img src="delete.svg" alt="">';
    deleteIcon.classList.add('crossicon');
    deleteIcon.setAttribute('id', 'delete');
    deleteIcon.setAttribute('onclick', `deleteTask(${taskId});`);
    editIcon.insertAdjacentElement('afterend', deleteIcon);

    // Initially hide in completed list
    const completedTaskItem = completedlist.querySelector(`[data-id='${taskId}']`);
    if (completedTaskItem) {
        completedTaskItem.style.display = checked ? 'flex' : 'none';
    }
}


// Ensure the button text updates when deleting a task
function deleteTask(taskId) {
    const allTaskItem = alltasklist.querySelector(`[data-id='${taskId}']`);
    const pendingTaskItem = pendinglist.querySelector(`[data-id='${taskId}']`);
    const completedTaskItem = completedlist.querySelector(`[data-id='${taskId}']`);

    if (allTaskItem) allTaskItem.remove();
    if (pendingTaskItem) pendingTaskItem.remove();
    if (completedTaskItem) completedTaskItem.remove();

    saveData();
    updateCheckAllButtonText(); // Update the button text after deleting a task
}

// Initialize the task lists and button text on page load
showTask();

