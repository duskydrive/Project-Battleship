import {controller} from '../appScripts/controller.js'

export function task(newTask) {
    const task = document.createElement('li');
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const circleDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const descriptionDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const editDiv = document.createElement('div');

    const iCircle = document.createElement('i');
    const iTimes = document.createElement('i');
    const iEdit = document.createElement('i');

    leftDiv.classList.add('left');
    textDiv.classList.add('text');
    rightDiv.classList.add('right');
    circleDiv.classList.add('circle');
    titleDiv.classList.add('title');
    descriptionDiv.classList.add('description');
    task.classList.add('task');
    dateDiv.classList.add('date');
    editDiv.classList.add('edit');

    iCircle.classList.add('far', 'fa-circle');
    iTimes.classList.add('fas', 'fa-times');
    iEdit.classList.add('fas', 'fa-edit');

    titleDiv.textContent = newTask.title;
    descriptionDiv.textContent = newTask.description;
    dateDiv.textContent = controller.getDateFormatted(newTask.date)
    // dateDiv.textContent = newTask.date;

    task.setAttribute('task-id', newTask.id)

    textDiv.appendChild(titleDiv);
    textDiv.appendChild(descriptionDiv);
    circleDiv.appendChild(iCircle);
    editDiv.appendChild(iTimes);
    editDiv.appendChild(iEdit);
    leftDiv.appendChild(circleDiv);
    leftDiv.appendChild(textDiv);
    rightDiv.appendChild(dateDiv);
    rightDiv.appendChild(editDiv);
    task.appendChild(leftDiv);
    task.appendChild(rightDiv);

    return task
}
