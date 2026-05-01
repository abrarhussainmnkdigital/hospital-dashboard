function showSection(section) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(section).classList.remove("hidden");
}

function loadData() {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {

      let total = 0, waiting = 0, consult = 0, tests = 0;

      const patientContainer = document.getElementById("patientCards");
      patientContainer.innerHTML = "";

      data.doctors.forEach(doc => {
        doc.patients.forEach(p => {

          total++;

          if (p.status === "Waiting") waiting++;
          if (p.status === "Consultation") consult++;

          tests += p.tests_pending.length;

          const div = document.createElement("div");
          div.className = "card";

          div.innerHTML = `
            <h3>${p.name}</h3>
            <p>Status: ${p.status}</p>
            <p>Doctor: ${doc.name}</p>
            <p>Room: ${doc.room}</p>
            <p>Pending Tests: ${p.tests_pending.join(", ")}</p>
          `;

          patientContainer.appendChild(div);
        });
      });

      document.getElementById("total").innerText = total;
      document.getElementById("waiting").innerText = waiting;
      document.getElementById("consult").innerText = consult;
      document.getElementById("tests").innerText = tests;
    });
}

loadData();
setInterval(loadData, 3000);