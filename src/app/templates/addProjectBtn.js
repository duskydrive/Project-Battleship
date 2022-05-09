export function addProjectBtn() {
    const btn = document.createElement('div');
    const i = document.createElement('i');
    btn.classList.add('add-project');
    i.classList.add('fas', 'fa-plus');
    btn.appendChild(i);
    btn.append('Add Project');
    return btn
}
