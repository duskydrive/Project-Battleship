const openModalProject = () => {
    const modalProject = document.getElementById('modalProject');
    modalProject.classList.add('active');
}
const closeModalProject = () => {
    const modalProject = document.getElementById('modalProject');
    document.querySelector('#modalProject input').value = '';
    modalProject.classList.remove('active');
}

const openModalTask = () => {
    const modalTask = document.getElementById('modalTask');
    modalTask.classList.add('active');
}
const closeModalTask = () => {
    const modalTask = document.getElementById('modalTask');
    let inputs = document.querySelectorAll('#modalTask input');
    inputs.forEach(input => input.value = '');
    modalTask.classList.remove('active');
}

const openEditModalTask = () => {
    const modalTask = document.getElementById('modalEditTask');
    modalTask.classList.add('active');
}
const closeEditModalTask = () => {
    const modalTask = document.getElementById('modalEditTask');
    let inputs = document.querySelectorAll('#modalEditTask input');
    inputs.forEach(input => input.value = '');
    modalTask.classList.remove('active');
}

export {openModalProject, closeModalProject, openModalTask, closeModalTask, openEditModalTask, closeEditModalTask}