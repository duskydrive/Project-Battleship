import { projectsBtn } from '../templates/projectsBtn';
import { Project } from './project';
import { closeModalProject, closeModalTask, openEditModalTask, closeEditModalTask } from './modalEvents';
import { setRemoveProject, setLoadProject, setEditTaskButtons, setRemoveTask } from "./events.js";
import { task } from "../templates/task.js";
import { toDate, isToday, isThisWeek, subDays } from 'date-fns';
// import { format } from 'date-fns'
// const newDueDate = format(new Date(this.value), 'dd/MM/yyyy')

// localStorage.clear()

const controller = (() => {
    let projectId = 1;
    const setProjectId = num => {
        projectId = num;
    }
    let taskId = 1;
    const setTaskId = arr => {
        taskId = ((arr[arr.length - 1].id) + 1);
    }
    const createProject = () => {
        if (!validateModal()) {
            alert('Some inputs are empty!')
            return
        }
        const projectName = document.querySelector('#modalProject input').value;
        const newProject = Project(projectName, projectId);
        localStorage.setItem(projectId, JSON.stringify(newProject));
        projectId++;
        addProject(newProject);
        closeModalProject();
    }
    const addProject = project => {
        const projectsMenuVal = document.getElementById('projects-menu');
        loadProject(project)
        projectsMenuVal.prepend(projectsBtn(project, true));
        setRemoveProject(project.id)
        setLoadProject(project.id)   
    }
    const addAllProjects = () => {
        const projectsMenuVal = document.getElementById('projects-menu');
        let arr = [];

        for (const [key] of Object.entries(localStorage)) {
            arr.push(JSON.parse(localStorage.getItem(key)))
        }
        arr.sort(function(a,b){
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
            return -1;
            if (nameA > nameB)
            return 1;
            return 0; //default return value (no sorting)    
        })
        arr.forEach( (item, index) => {
            if (index === 0) {
                loadProject(item)
                projectsMenuVal.appendChild(projectsBtn(item, true))
            } else {
                projectsMenuVal.appendChild(projectsBtn(item))
            }
        })
        setRemoveProject()
        setLoadProject()
        setProjectId(localStorage.length + 1)
    }
    const removeProject = function(event) {
        event.stopPropagation()
        let currentLi = this.closest('li');
        localStorage.removeItem(currentLi.getAttribute('data-id'))

        if (currentLi.classList.contains('active')) {
            let newActive = false;

            if (currentLi.previousElementSibling) {
                newActive = currentLi.previousElementSibling;
            } else if (currentLi.nextElementSibling) {
                newActive = currentLi.nextElementSibling;
            } 

            if (!newActive) {
                currentLi.remove()
                loadEmptyProject()
            } else {
                newActive.click()
            }
        } 
        currentLi.remove()
    }
    const checkActiveProject = function(val) {
        if (val === undefined) {
            if (document.querySelector('#projects-menu .active') == undefined) {

            } else {
                document.querySelector('#projects-menu .active').classList.remove('active');
            }
            return 'empty'
        } else if (val.classList.contains('active')) {
            return
        } else {
            document.querySelector('#projects-menu .active').classList.remove('active');
            val.classList.add('active')
        }
    }
    const loadProject = function(project) {
        if ( !(document.querySelector('#main-menu .active').getAttribute('data-filter') === 'inbox') ) {
            document.querySelector('#main-menu .active').classList.remove('active');
            document.querySelector('#main-menu li[data-filter="inbox"]').classList.add('active')
        }
        document.querySelector('#main-menu')
        const heading = document.getElementById('heading');
        const tasks = document.getElementById('tasks');
        const btn = document.getElementById('openTaskModal');
        btn.classList.add('active')
        tasks.replaceChildren()
        if ( checkActiveProject(this) === 'empty' ) {
            heading.textContent = project.name;
            if (project.taskList.length > 0) {
                listAllTasks(project.taskList);
            }
        } else {
            const id = this.getAttribute('data-id');
            let currentProject = null;
            for (const [key] of Object.entries(localStorage)) {
                if (key === id) {
                    currentProject = JSON.parse(localStorage.getItem(key))
                }
            }
            heading.textContent = currentProject.name;
            if (currentProject.taskList.length > 0) {
                listAllTasks(currentProject.taskList);
            }
        }        
    }
    const loadEmptyProject = () => {
        const heading = document.getElementById('heading');
        const tasks = document.getElementById('tasks');
        heading.textContent = 'Create project';
        tasks.replaceChildren()
    }
    const addTask = function() {
        if (!validateModal()) {
            alert('Some inputs are empty!')
            return
        }
        let id = document.querySelector('#projects-menu .active').getAttribute('data-id');
        let currentProject = null;
        const textVal = document.getElementById('taskTitle').value;
        const textDescription = document.getElementById('taskDescription').value;
        const textDateVal = document.getElementById('taskDate').value;
        let textDate = null;
        if (textDateVal === '') {
            textDate = 'No Date'
        } else {
            textDate = textDateVal
        }

        for (const [key] of Object.entries(localStorage)) {
            if (key === id) {
                currentProject = JSON.parse(localStorage.getItem(key))
            }
        }
        createTask(currentProject, textVal, textDescription, textDate);
        closeModalTask()
    }
    const createTask = (project, title, description, date) => {
        if (project.taskList.length === 0) {
            taskId = 1;
        } else {
            setTaskId(project.taskList)
        }

        let task = {
            'id': taskId,
            'title': title,
            'description': description,
            'date': date
        }

        project.taskList.push(task)
        localStorage.setItem(project.id, JSON.stringify(project));
        listOneTask(task)
        
    }
    const listOneTask = newTask => {
        let tasks = document.getElementById('tasks');
        tasks.appendChild(task(newTask))
        setEditTaskButtons(newTask.id)
        setRemoveTask(newTask.id)
    }
    const listAllTasks = arr => {
        arr.forEach(item => tasks.appendChild(task(item)))
        setEditTaskButtons()
        setRemoveTask()
    }
    const getEditTaskValues = function() {
        const currentProjectId = document.querySelector('#projects-menu .active').getAttribute('data-id');
        const currentTaskId = this.closest('li').getAttribute('task-id');
        const modal = document.getElementById('modalEditTask');

        let inputTitle = document.getElementById('editTaskTitle');
        let inputDescription = document.getElementById('editTaskDescription');
        let inputDate = document.getElementById('editTaskDate');
        modal.setAttribute('data-project', currentProjectId)
        modal.setAttribute('data-task', currentTaskId)        

        let currentProjectArr = JSON.parse(localStorage.getItem(currentProjectId)).taskList;
        let currentObj = currentProjectArr.find(x => x.id === Number(currentTaskId));

        inputTitle.value = currentObj.title;
        inputDescription.value = currentObj.description;
        inputDate.value = currentObj.date;

        openEditModalTask()
    }
    const saveEditTask = function() {
        if (!validateModal()) {
            alert('Some inputs are empty!')
            return
        }
        let currentProjectId = document.getElementById('modalEditTask').getAttribute('data-project');
        let currentTaskId = document.getElementById('modalEditTask').getAttribute('data-task');

        let editObj = JSON.parse(localStorage.getItem(currentProjectId));
        let objId = editObj.taskList.findIndex(x => x.id === Number(currentTaskId));

        let inputTitle = document.getElementById('editTaskTitle');
        let inputDescription = document.getElementById('editTaskDescription');
        let inputDate = document.getElementById('editTaskDate');
        let taskInputTitle = document.querySelector('[task-id="'+ currentTaskId +'"] .title');
        let taskInputDescription = document.querySelector('[task-id="'+ currentTaskId +'"] .description');
        let taskInputDate = document.querySelector('[task-id="'+ currentTaskId +'"] .date');

        editObj.taskList[objId].title = inputTitle.value;
        editObj.taskList[objId].description = inputDescription.value;
        editObj.taskList[objId].date = inputDate.value;
        taskInputTitle.textContent = inputTitle.value;
        taskInputDescription.textContent = inputDescription.value;
        taskInputDate.textContent = inputDate.value;

        localStorage.setItem(currentProjectId, JSON.stringify(editObj));

        closeEditModalTask()
    }
    const removeTask = function() {
        const currentProjectId = document.querySelector('#projects-menu .active').getAttribute('data-id');
        const currentTask = this.closest('li');
        const currentTaskId = currentTask.getAttribute('task-id');
        let editObj = JSON.parse(localStorage.getItem(currentProjectId));
        let objId = editObj.taskList.findIndex(x => x.id === Number(currentTaskId));
        editObj.taskList.splice(objId, 1);

        localStorage.setItem(currentProjectId, JSON.stringify(editObj));

        currentTask.remove()
    }
    const validateModal = function() {
        const inputs = document.querySelectorAll('.modal.active input[type=text]');
        let result = true;
        inputs.forEach(input => {
            if (input.value.replace(/ /g,'') === '') {
                result = false;
            }
        })
        return result
    }
    const getDateFormatted = function(date) {
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        let compare = yourDate.toISOString().split('T')[0];

        if (date === 'No Date') {
            return 'No date'
        } else if (date === compare) {
            return 'Today'
        } else {
            return date
        }
    }
    const setDateFilter = function() {
        if (this.classList.contains('active')) {
            return
        } 
        document.querySelector('#main-menu .active').classList.remove('active');
        this.classList.add('active')
        const dataFilter = this.getAttribute('data-filter');
        const currentProjectId = document.querySelector('#projects-menu .active').getAttribute('data-id');
        tasks.replaceChildren()
        if (dataFilter === 'inbox') {
            listAllTasks(JSON.parse(localStorage.getItem(currentProjectId)).taskList)
        } else if (dataFilter === 'today') {
            let yourDate = new Date()
            const offset = yourDate.getTimezoneOffset()
            yourDate = new Date(yourDate.getTime() - (offset*60*1000))
            let compare = yourDate.toISOString().split('T')[0];
            let arr = JSON.parse(localStorage.getItem(currentProjectId)).taskList
            for (const obj of arr) {
                if (obj.date === compare) {
                    console.log(obj)
                    listOneTask(obj)
                }
            }
        }
    }

    return {createProject, loadProject, addAllProjects, removeProject, addTask, getEditTaskValues, saveEditTask, removeTask, getDateFormatted, setDateFilter}
})();

export default controller
console.log(localStorage)