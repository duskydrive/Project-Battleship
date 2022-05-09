import { controller } from './controller.js'
import { openModalProject, closeModalProject, openModalTask, closeModalTask, closeEditModalTask } from './modalEvents'

function setRemoveProject(id) {
    if (id) {
        console.log(id)
        document.querySelector('li[data-id="' + id + '"] .remove').addEventListener('click', controller.removeProject)
    } else {
        let removeProjectBtn = document.querySelectorAll('#projects-menu .remove');
        removeProjectBtn.forEach(btn => btn.addEventListener('click', controller.removeProject))
    }
}

function setLoadProject(id) {
    if (id) {
        document.querySelector('li[data-id="' + id + '"]').addEventListener('click', controller.loadProject)
    } else {
        let loadProjectBtn = document.querySelectorAll('#projects-menu li');
        loadProjectBtn.forEach(btn => btn.addEventListener('click', controller.loadProject))
    }
}

function setOpenModalProject() {
    const addProjectBtn = document.querySelector('.add-project');
    addProjectBtn.addEventListener('click', openModalProject);
}

function setCloseModalProject() {
    const modalProjectTimes = document.getElementById('closeModalProject');
    modalProjectTimes.addEventListener('click', closeModalProject);
}

function setAddProjectBtn() {
    const addProjectModalBtn = document.getElementById('addProject');
    addProjectModalBtn.addEventListener('click', controller.createProject);
}

function checkLocalStorage() {
    if (localStorage.length > 0) {
        controller.addAllProjects()
    }
}

function setOpenTaskModal() {
    const openTaskModalBtn = document.getElementById('openTaskModal');
    openTaskModalBtn.addEventListener('click', openModalTask);
}

function setCloseTaskModal() {
    const closeTaskModalBtn = document.getElementById('closeModalTask');
    closeTaskModalBtn.addEventListener('click', closeModalTask);
}

function setAddTaskBtn() {
    const addProjectModalBtn = document.getElementById('addTask');
    addProjectModalBtn.addEventListener('click', controller.addTask);
}

function setEditTaskButtons(id) {
    if (id) {
        document.querySelector('li[task-id="' + id + '"] .fa-edit').addEventListener('click', controller.getEditTaskValues)
    } else {
        const editTaskBtn = document.querySelectorAll('.task .fa-edit');
        editTaskBtn.forEach(btn => btn.addEventListener('click', controller.getEditTaskValues))
    }
}

function setCloseEditModal() {
    const closeTaskModalBtn = document.getElementById('closeEditModalTask');
    closeTaskModalBtn.addEventListener('click', closeEditModalTask);
}

function setSaveEditTaskModal() {
    const addEditTaskBtn = document.getElementById('addEditTask');
    addEditTaskBtn.addEventListener('click', controller.saveEditTask);
}

function setRemoveTask(id) {
    if (id) {
        document.querySelector('li[task-id="' + id + '"] .fa-times').addEventListener('click', controller.removeTask)
        document.querySelector('li[task-id="' + id + '"] .fa-circle').addEventListener('click', controller.removeTask)
    } else {
        const removeTaskBtn = document.querySelectorAll('.task .fa-times');
        const removeTaskBtnCircle = document.querySelectorAll('.task .fa-circle');
        removeTaskBtn.forEach(btn => btn.addEventListener('click', controller.removeTask))
        removeTaskBtnCircle.forEach(btn => btn.addEventListener('click', controller.removeTask))
    }
}

function toggleMobileMenu() {
    const menu = document.querySelector('nav');
    if ( menu.classList.contains('active') ) {
        menu.classList.remove('active')
    } else {
        menu.classList.add('active')
    }
}

function setToggleMobileMenu() {
    const menuBtn = document.querySelector('.fa-bars');
    menuBtn.addEventListener('click', toggleMobileMenu)
}

function setDateFilter() {
    const btns = document.querySelectorAll('#main-menu li');
    btns.forEach(btn => btn.addEventListener('click', controller.setDateFilter))
}

function setEventsOnInit() {
    setOpenModalProject()
    setCloseModalProject()
    setOpenTaskModal()
    setCloseTaskModal()
    setAddProjectBtn()
    setAddTaskBtn()
    checkLocalStorage()
    setEditTaskButtons()
    setCloseEditModal()
    setSaveEditTaskModal()
    setToggleMobileMenu()
    setDateFilter()
}

export {setRemoveProject, setLoadProject, setEventsOnInit, setEditTaskButtons, setRemoveTask}