export function header() {
    const logo = document.createElement('span');
    logo.classList.add('logo');
    logo.textContent = "Todo List";

    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-bars');

    const header = document.createElement('header');
    header.appendChild(logo);
    header.appendChild(i);

    return header
}

