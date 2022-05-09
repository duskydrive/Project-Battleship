export function modalTask() {
    const modal = document.createElement('div');
    const title = document.createElement('div');
    const inputTitle = document.createElement('input');
    const inputDescription = document.createElement('input');
    const inputDate = document.createElement('input');

    const btn = document.createElement('button');
    const iTimes = document.createElement('i');

    modal.classList.add('modal');
    modal.setAttribute('id', 'modalTask');

    title.classList.add('title');
    title.textContent = 'Add Task';

    inputTitle.type = 'text';
    inputDescription.type = 'text';
    inputDate.type = 'date';

    inputTitle.setAttribute('placeholder', 'Enter task title');
    inputDescription.setAttribute('placeholder', 'Enter task description');

    inputTitle.setAttribute('id', 'taskTitle');
    inputDescription.setAttribute('id', 'taskDescription');
    inputDate.setAttribute('id', 'taskDate');

    iTimes.classList.add('fas', 'fa-times', 'close');
    iTimes.setAttribute('id', 'closeModalTask')

    btn.textContent = 'Add'
    btn.setAttribute('id', 'addTask')

    modal.appendChild(title);
    modal.appendChild(inputTitle);
    modal.appendChild(inputDescription);
    modal.appendChild(inputDate);
    modal.appendChild(btn);
    modal.appendChild(iTimes);

    return modal
}