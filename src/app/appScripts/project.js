export const Project = (projectName, projectId) => {
    const name = projectName;
    const id = projectId;
    const taskList = [];

    return {name, id, taskList}
}