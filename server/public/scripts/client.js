$(document).ready(onReady);

function onReady() {
    console.log('jQ sourced');
    $(document).on('click', '.newTaskButton', submitTask);
}

function submitTask() {
    console.log('submit button clicked', submitTask);
    let todo = {
        task: "",
        status: ""
    };
}