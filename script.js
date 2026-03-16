const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
const taskList = document.querySelector("#taskList");

function addTask () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert ("Введите задачу!");
        return;
    }
    const li =
    document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);

    taskInput.value = "";
    li.addEventListener("click", function () {
        taskList.removeChild(li);
    });
}
function clearAllTasks () {
    taskList.innerHTML = "";
}

addTaskBtn.addEventListener ("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);
taskInput.addEventListener("keypress", function (Event) {
    if (event.key === "Enter") {
        addTask ();
    }
});