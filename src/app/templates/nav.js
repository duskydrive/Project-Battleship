import {menu} from './menu.js'
import {projectsBtn} from './projectsBtn.js'
import {menuBtn} from './menuBtn.js'
import {addProjectBtn} from './addProjectBtn.js'

export function nav() {
    const nav = document.createElement('nav');
    const mainMenu = menu('main-menu');
    const projectsMenu = menu('projects-menu');
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = 'Projects';

    mainMenu.appendChild(menuBtn('fa-inbox', 'Inbox', 'inbox', true));
    mainMenu.appendChild(menuBtn('fa-calendar-day', 'Today', 'today'));

    nav.appendChild(mainMenu);
    nav.appendChild(title);
    nav.appendChild(projectsMenu);
    nav.appendChild(addProjectBtn());

    return nav
}