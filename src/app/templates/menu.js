export function menu(id) {
    const menu = document.createElement('ul');
    menu.setAttribute('id', id);
    menu.classList.add(id);
    return menu
}