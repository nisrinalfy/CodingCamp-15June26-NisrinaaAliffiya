// =====================
// CUSTOM NAME
// =====================

const savedName =
    localStorage.getItem("userName") || "";


// =====================
// GREETING
// =====================

function updateDateTime() {

    const now = new Date();

    const hour = now.getHours();

    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const userName =
        localStorage.getItem("userName");

    document.getElementById("greetingText")
        .textContent =
        userName
            ? `${greeting}, ${userName}`
            : greeting;

    document.getElementById("dateTime")
        .textContent =
        now.toLocaleString();

}

updateDateTime();

setInterval(updateDateTime, 1000);


// =====================
// TIMER
// =====================

let timeLeft = 1500;

let timerInterval;

const timerDisplay =
    document.getElementById("timer");

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

document
.getElementById("startBtn")
.addEventListener("click", () => {

    if (timerInterval) return;

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);

            timerInterval = null;

            alert("Time's up!");

        }

    }, 1000);

});

document
.getElementById("stopBtn")
.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval = null;

});

document
.getElementById("resetBtn")
.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 1500;

    updateTimerDisplay();

});

updateTimerDisplay();


// =====================
// TODO LIST
// =====================

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {

            tasks[index].done =
                checkbox.checked;

            saveTasks();

            renderTasks();

        });

        const span =
            document.createElement("span");

        span.textContent =
            task.text;

        if (task.done) {

            span.style.textDecoration =
                "line-through";

        }

        const editBtn =
            document.createElement("button");

        editBtn.textContent =
            "Edit";

        editBtn.addEventListener("click", () => {

            const newText =
                prompt(
                    "Edit task",
                    task.text
                );

            if (!newText) return;

            tasks[index].text =
                newText;

            saveTasks();

            renderTasks();

        });

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "Delete";

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

            renderTasks();

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}

addTaskBtn.addEventListener("click", () => {

    const task =
        taskInput.value.trim();

    if (task === "") return;

    const duplicate =
        tasks.some(
            item =>
            item.text.toLowerCase() ===
            task.toLowerCase()
        );

    if (duplicate) {

        alert("Task already exists!");

        return;

    }

    tasks.push({
        text: task,
        done: false
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

});

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        addTaskBtn.click();

    }

});

renderTasks();


// =====================
// NAME SAVE
// =====================

const saveNameBtn =
    document.getElementById("saveNameBtn");

if (saveNameBtn) {

    saveNameBtn.addEventListener(
        "click",
        () => {

            const name =
                document
                .getElementById("nameInput")
                .value;

            localStorage.setItem(
                "userName",
                name
            );

            updateDateTime();

        }
    );

}


// =====================
// DARK MODE
// =====================

const themeBtn =
    document.getElementById("themeBtn");

if (
    localStorage.getItem("theme")
    === "dark"
) {

    document.body.classList.add("dark");

}

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body
                .classList
                .toggle("dark");

            const theme =
                document.body
                .classList
                .contains("dark")
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "theme",
                theme
            );

        }
    );

}

// =====================
// QUICK LINKS
// =====================

let links =
JSON.parse(
    localStorage.getItem("links")
) || [];

const linkName =
document.getElementById("linkName");

const linkUrl =
document.getElementById("linkUrl");

const addLinkBtn =
document.getElementById("addLinkBtn");

const linkList =
document.getElementById("linkList");

function saveLinks() {

    localStorage.setItem(
        "links",
        JSON.stringify(links)
    );

}

function renderLinks() {

    linkList.innerHTML = "";

    links.forEach((link, index) => {

        const li =
        document.createElement("li");

        const a =
        document.createElement("a");

        a.href = link.url;

        a.target = "_blank";

        a.textContent =
        link.name;

        const deleteBtn =
        document.createElement("button");

        deleteBtn.textContent =
        "Delete";

        deleteBtn.addEventListener(
            "click",
            () => {

                links.splice(index,1);

                saveLinks();

                renderLinks();

            }
        );

        li.appendChild(a);

        li.appendChild(deleteBtn);

        linkList.appendChild(li);

    });

}

addLinkBtn.addEventListener(
    "click",
    () => {

        const name =
        linkName.value.trim();

        const url =
        linkUrl.value.trim();

        if(
            name === "" ||
            url === ""
        ) return;

        links.push({
            name:name,
            url:url
        });

        saveLinks();

        renderLinks();

        linkName.value = "";
        linkUrl.value = "";

    }
);

renderLinks();