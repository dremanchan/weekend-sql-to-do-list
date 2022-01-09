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
    todo.task = $('#newTaskInput').val();
    console.log('New task listed', todo);
    postTask(todo);
    $('#newTaskInput').val();
}

function postTask() {
    $.ajax({
        type: 'POST',
        url: 'tasks',
        data: addedTask
    }).then(function (response) {
        console.log('POST successful', response);
        // GET/RENDER FUNCTION GOES HERE
    }).catch(function (err) {
        console.log('POST task failed', err);

    });
}

function refresh() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (res) {
        console.log(res);
        // append function goes here
    }).catch(function (err) {
        console.log('GET FAILED', err);
    });
}

