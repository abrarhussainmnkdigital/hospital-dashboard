const BASE_URL = "https://YOUR_BACKEND_URL.onrender.com";

let doctors = [];
let currentDoctorIndex = 0;

async function loadData() {
  try {
    const res = await fetch(BASE_URL + "/queue");
    const data = await res.json();
    doctors = data.doctors || [];

    populateDoctors();
    render();
  } catch (err) {
    console.error(err);
  }
}

function populateDoctors() {
  const select = document.getElementById("doctorSelect");
  select.innerHTML = "";

  doctors.forEach((doc, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerText = doc.name;
    select.appendChild(opt);
  });
}

function changeDoctor() {
  currentDoctorIndex = document.getElementById("doctorSelect").value;
  render();
}

function render() {
  const doc = doctors[currentDoctorIndex];
  if (!doc) return;

  const p = doc.current_patient;

  document.getElementById("patientName").innerText = p?.name || "--";
  document.getElementById("patientAge").innerText = p ? "Age: " + p.age : "";

  document.getElementById("doctor").innerText = doc.name;
  document.getElementById("room").innerText = doc.room;

  renderList("completed", p?.completed_tests || []);
  renderList("pending", p?.pending_tests || []);

  const queueList = document.getElementById("queueList");
  queueList.innerHTML = "";

  (doc.queue || []).forEach(q => {
    let li = document.createElement("li");
    li.innerText = q.name + " - " + q.issue;
    queueList.appendChild(li);
  });

  renderDoctors();
}

function renderList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  items.forEach(i => {
    let li = document.createElement("li");
    li.innerText = i;
    el.appendChild(li);
  });
}

function renderDoctors() {
  const container = document.getElementById("doctorCards");
  container.innerHTML = "";

  doctors.forEach(doc => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${doc.name}</h3><p>${doc.room}</p>`;
    container.appendChild(div);
  });
}

async function updatePatient() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  doctors[currentDoctorIndex].current_patient.name = name;
  doctors[currentDoctorIndex].current_patient.age = age;

  await fetch(BASE_URL + "/update", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ doctors })
  });

  loadData();
}

function showPage(page, element) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");

  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
  element.classList.add("active");
}

setInterval(() => {
  document.getElementById("time").innerText = new Date().toLocaleTimeString();
}, 1000);

setInterval(loadData, 5000);

loadData();