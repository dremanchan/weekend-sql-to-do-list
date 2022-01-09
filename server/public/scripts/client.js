$(document).ready(onReady);

function onReady() {
    console.log('jQ sourced');
    $(document).on('click', '.newTaskButton', submitTask);
}

// Takes input from form field and posts to server. Clears input
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

// Posts data to server
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

// GET REQUEST and render function to refresh page to go in .then
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


