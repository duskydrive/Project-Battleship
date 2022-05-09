import {header} from '../templates/header.js'
import {content} from '../templates/content.js'
import {nav} from '../templates/nav.js'
import {section} from '../templates/section.js'
import {modalProject} from '../templates/modalProject.js'
import {modalTask} from '../templates/modalTask.js'
import {modalEditTask} from '../templates/modalEditTask.js'

export function buildTemplates() {
    const body = document.querySelector('body');
    const main = content();

    main.appendChild(nav());
    main.appendChild(section());
    body.appendChild(header());
    body.appendChild(main);
    body.appendChild(modalProject())
    body.appendChild(modalTask())
    body.appendChild(modalEditTask())
}
