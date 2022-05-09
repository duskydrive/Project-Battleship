import {addTaskBtn} from "./addTaskBtn";
import {tasks} from './tasks.js'

export function section() {
    const section = document.createElement('section');
    const heading = document.createElement('h1');
    heading.setAttribute('id', 'heading')
    heading.textContent = 'Create project';
    
    section.appendChild(heading);
    section.appendChild(addTaskBtn())

    section.appendChild(tasks())

    return section
}