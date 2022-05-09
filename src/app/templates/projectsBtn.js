export function projectsBtn(prj, active) {
    const btn = document.createElement('li');
    if (active) btn.classList.add('active');
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const iTasks = document.createElement('i');
    const iTimes = document.createElement('i');
    iTasks.classList.add('fas', 'fa-tasks');
    iTimes.classList.add('fas', 'fa-times', 'remove');
    leftDiv.appendChild(iTasks);
    leftDiv.append(prj.name);
    rightDiv.appendChild(iTimes);
    btn.appendChild(leftDiv);
    btn.appendChild(rightDiv);
    btn.setAttribute('data-id', prj.id)
    return btn
}