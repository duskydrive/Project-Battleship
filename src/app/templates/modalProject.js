export function modalProject() {
    const modal = document.createElement('div');
    const title = document.createElement('div');
    const input = document.createElement('input');
    const btn = document.createElement('button');
    const iTimes = document.createElement('i');

    modal.classList.add('modal');
    modal.setAttribute('id', 'modalProject');

    title.classList.add('title');
    title.textContent = 'Add Project';

    input.type = 'text';
    input.setAttribute('placeholder', 'Enter projects name');

    iTimes.classList.add('fas', 'fa-times', 'close');
    iTimes.setAttribute('id', 'closeModalProject')

    btn.textContent = 'Add'
    btn.setAttribute('id', 'addProject')

    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(btn);
    modal.appendChild(iTimes);

    return modal
}