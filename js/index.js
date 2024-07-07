let setTimeoutId = null;

function notification(notification, innerText, beforeVisibility, afterVisibility) {
  const setNotification = document.getElementById(notification);
  setNotification.innerText = innerText;
  setNotification.style.visibility = beforeVisibility;

  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(() => {
    setNotification.style.visibility = afterVisibility;
  }, 2000);
}

window.addEventListener("load", () => {
  const form = document.querySelector("#task_list");
  const input = document.querySelector("#task_input");
  const listElement = document.querySelector("#tasks");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("content");
    taskElement.appendChild(taskContentElement);

    const taskInputElement = document.createElement("p");
    taskInputElement.style.wordBreak = "break-all";
    taskInputElement.classList.add("text");
    taskInputElement.type = "text";
    taskInputElement.innerText = task;
    taskInputElement.setAttribute("readonly", "readonly");
    taskContentElement.appendChild(taskInputElement);

    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("actions");

    //edit button create and set attribute
    const taskEditElement = document.createElement("button");
    taskEditElement.classList.add("edit");
    taskEditElement.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    taskEditElement.setAttribute("data", "edit");

    //success button create
    const successElement = document.createElement("button");
    successElement.classList.add("success");
    successElement.innerHTML = `<i class="fa-solid fa-check"></i>`;

    //success button addEventListener
    successElement.addEventListener('click', function(){
      listElement.removeChild(taskElement);
      notification(
        "notification",
        "Task complete successfully",
        "visible",
        "hidden"
      );
    })

    
    const taskDeleteElement = document.createElement("button");
    taskDeleteElement.classList.add("delete");
    taskDeleteElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    taskActionsElement.appendChild(taskEditElement);
    taskActionsElement.appendChild(successElement);
    taskActionsElement.appendChild(taskDeleteElement);
    taskElement.appendChild(taskActionsElement);
    listElement.appendChild(taskElement);
    input.value = "";

    notification(
      "notification",
      "Task added successfully",
      "visible",
      "hidden"
    );

    taskEditElement.addEventListener("click", () => {
      if (taskEditElement.getAttribute("data").toLowerCase() == "edit") {
        taskInputElement.contentEditable = true;
        taskEditElement.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
        taskEditElement.setAttribute("data", "");
        taskInputElement.focus();
      } else {
        notification(
        "notification",
        "Edit saved successfully",
        "visible",
        "hidden"
        );
        taskEditElement.setAttribute("data", "edit");
        
        taskEditElement.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        taskInputElement.contentEditable = false;
        taskInputElement.setAttribute("readonly", "readonly");
      }
    });
    taskDeleteElement.addEventListener("click", () => {
      listElement.removeChild(taskElement);

      notification(
        "notification",
        "Task deleted",
        "visible",
        "hidden"
      );
    });
  });
});
