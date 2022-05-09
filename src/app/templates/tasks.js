export function tasks() {
    const tasks = document.createElement('ul');
    tasks.classList.add('tasks');
    tasks.setAttribute('id', 'tasks')
    return tasks
}