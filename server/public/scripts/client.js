$(document).ready(onReady);

function onReady() {
    console.log('jQ sourced');
    $(document).on('click', '.newTaskButton', submitTask);
    $(document).on('click', '.completeBtn', completeTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    getTasks();
}

// Takes input from form field and posts to server. Clears input
function submitTask() {
    console.log('submit button clicked');
    let todo = {
        task: "",
        status: ""
    };
    todo.task = $('#newTaskInput').val();
    console.log('New task listed', todo);
    postTask(todo);
    $('#newTaskInput').val('');
}

// Posts data to server
function postTask(addedTask) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: addedTask
    }).then(function (response) {
        console.log('POST successful', response);
        getTasks();
    }).catch(function (err) {
        console.log('POST task failed', err);
    });
}

// GET REQUEST and render function to refresh page to go in .then
function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (res) {
        console.log(res);
        // append function goes here
        $('#taskPlace').empty();
        for (let i =0; i< res.length; i++) {
            if (res[i].status === false) {
                $('#taskPlace').append(`
                <tr data-id="${res[i].id}">
                    <td>${res[i].task}</td>
                    <td>
                        <button class="completeBtn">
                            Complete
                        </button>
                    </td>
                    <td>
                        <button class="deleteBtn">
                            Delete
                        </button>
                    </td>
                    </tr>
            `);
        } else if (res[i].status === true) {
            $('#taskPlace').append(`
                <tr class="completeTask" data-id="${res[i].id}">
                    <td>${res[i].task}</td>
                    <td>Task Completed!</td>
                    <td>
                        <button class="deleteBtn">
                            Delete
                        </button>
                    </td>
                    </tr>
            `);
        }
    }
    }).catch(function (err) {
        console.log('GET FAILED', err);
    });
}

function completeTask() {
    let taskId = $(this).parent().parent().data("id");
    let completeStatus = $(this).text();
    console.log('this is the task id', taskId);
    console.log('this is the completion status', completeStatus);
    $.ajax({
        type: 'PUT',
        url: `/tasks/status/${taskId}`,
        data: {
            status: completeStatus
        }
    }).then(function (res) {
        console.log(res);
        getTasks();
    }).catch(function (err) {
        console.log('PUT failed', err);
    })
}

function deleteTask() {
    let taskId = $(this).parent().parent().data("id");
    console.log("Delete Task with ID: ", taskId);
    let r = confirm("Are you sure you want to delete this task?");
    if (r == true) {
        $.ajax({
            type: 'DELETE',
            url: `tasks/${taskId}`,
        })
            .then((res) => {
                console.log('DELETE successful!');
                getTasks();
            })
            .catch(function (error) {
                alert("Error in DELETE function: ", error);
            })
    } else {
        return;
    }
}
