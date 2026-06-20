// ===== DARK MODE =====
const themeBtn = document.getElementById('themeBtn');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeBtn(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeBtn(next);
});

function updateThemeBtn(theme) {
  themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}


// ===== GREETING & DATETIME =====
const greetingText = document.getElementById('greetingText');
const dateTimeEl = document.getElementById('dateTime');
const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveNameBtn');

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function updateGreeting() {
  const name = localStorage.getItem('userName') || 'Friend';
  greetingText.textContent = `${getGreeting()}, ${name}! 👋`;
}

function updateDateTime() {
  const now = new Date();
  dateTimeEl.textContent = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Load saved name into input
const savedName = localStorage.getItem('userName');
if (savedName) nameInput.value = savedName;

saveNameBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem('userName', name);
    updateGreeting();
  }
});

updateGreeting();
updateDateTime();
setInterval(updateDateTime, 1000);
setInterval(updateGreeting, 60000);


// ===== FOCUS TIMER =====
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let totalSeconds = 25 * 60;
let timerInterval = null;
let running = false;

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerEl.textContent = formatTime(totalSeconds);
}

startBtn.addEventListener('click', () => {
  if (running) return;
  running = true;
  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      running = false;
      timerEl.textContent = '00:00';
      alert('⏰ Focus session complete! Take a break.');
      return;
    }
    totalSeconds--;
    renderTimer();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  totalSeconds = 25 * 60;
  renderTimer();
});


// ===== TO-DO LIST =====
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.done) span.classList.add('done');
    span.addEventListener('click', () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();


// ===== QUICK LINKS =====
const linkName = document.getElementById('linkName');
const linkUrl = document.getElementById('linkUrl');
const addLinkBtn = document.getElementById('addLinkBtn');
const linkList = document.getElementById('linkList');

let links = JSON.parse(localStorage.getItem('links')) || [];

function saveLinks() {
  localStorage.setItem('links', JSON.stringify(links));
}

function renderLinks() {
  linkList.innerHTML = '';
  links.forEach((link, index) => {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = link.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      links.splice(index, 1);
      saveLinks();
      renderLinks();
    });

    li.appendChild(a);
    li.appendChild(deleteBtn);
    linkList.appendChild(li);
  });
}

function addLink() {
  const name = linkName.value.trim();
  let url = linkUrl.value.trim();
  if (!name || !url) return;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  links.push({ name, url });
  saveLinks();
  renderLinks();
  linkName.value = '';
  linkUrl.value = '';
}

addLinkBtn.addEventListener('click', addLink);
linkUrl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addLink();
});

renderLinks();
