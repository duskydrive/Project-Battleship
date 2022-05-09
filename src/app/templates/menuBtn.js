export function menuBtn (iClass, text, data, active) {
    const btn = document.createElement('li');
    btn.setAttribute('data-filter', data)
    if (active) btn.classList.add('active');
    const i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add(iClass);
    btn.appendChild(i);
    btn.append(text);
    return btn
}