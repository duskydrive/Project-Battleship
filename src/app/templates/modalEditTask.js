export function modalEditTask() {
    const modal = document.createElement('div');
    const title = document.createElement('div');
    const inputTitle = document.createElement('input');
    const inputDescription = document.createElement('input');
    const inputDate = document.createElement('input');

    const btn = document.createElement('button');
    const iTimes = document.createElement('i');

    modal.classList.add('modal');
    modal.setAttribute('id', 'modalEditTask');

    title.classList.add('title');
    title.textContent = 'Edit Task';

    inputTitle.type = 'text';
    inputDescription.type = 'text';
    inputDate.type = 'date';

    inputTitle.setAttribute('placeholder', 'Enter task title');
    inputDescription.setAttribute('placeholder', 'Enter task description');

    inputTitle.setAttribute('id', 'editTaskTitle');
    inputDescription.setAttribute('id', 'editTaskDescription');
    inputDate.setAttribute('id', 'editTaskDate');

    iTimes.classList.add('fas', 'fa-times', 'close');
    iTimes.setAttribute('id', 'closeEditModalTask')

    btn.textContent = 'Edit'
    btn.setAttribute('id', 'addEditTask')

    modal.appendChild(title);
    modal.appendChild(inputTitle);
    modal.appendChild(inputDescription);
    modal.appendChild(inputDate);
    modal.appendChild(btn);
    modal.appendChild(iTimes);

    return modal
}