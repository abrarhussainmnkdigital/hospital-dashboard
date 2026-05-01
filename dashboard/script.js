function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
  event.target.classList.add("active");
}

function loadData() {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {

      let total = 0, waiting = 0, consult = 0, tests = 0;

      const recent = document.getElementById("recentPatients");
      const cards = document.getElementById("patientCards");
      const health = document.getElementById("healthData");
      const testBox = document.getElementById("testData");

      recent.innerHTML = "";
      cards.innerHTML = "";
      health.innerHTML = "";
      testBox.innerHTML = "";

      document.getElementById("doctorCount").innerText = data.doctors.length;
      document.getElementById("roomCount").innerText = data.doctors.length;

      data.doctors.forEach(doc => {

        doc.patients.forEach(p => {

          total++;

          if (p.status === "Waiting") waiting++;
          if (p.status === "Consultation") consult++;

          tests += p.tests_pending.length;

          /* RECENT */
          recent.innerHTML += `
            <p><b>${p.name}</b> (${p.age}) - ${p.status}</p>
          `;

          /* PATIENT CARDS */
          cards.innerHTML += `
            <div class="card">
              <h3>${p.name}</h3>
              <p>Age: ${p.age}</p>
              <p>Status: ${p.status}</p>
              <p>Doctor: ${doc.name}</p>
              <p>Room: ${doc.room}</p>
            </div>
          `;

          /* HEALTH */
          health.innerHTML += `
            <div class="healthCard">
              <h4>${p.name}</h4>
              <p>Age: ${p.age}</p>
              <p>Heart Rate: ${p.heart_rate || 72} bpm</p>
              <p>Blood Pressure: ${p.bp || "120/80"}</p>
              <p>Diabetic: ${p.diabetic ? "Yes" : "No"}</p>
            </div>
          `;

          /* TESTS */
          p.tests_pending.forEach(t => {
            testBox.innerHTML += `
              <p>${t} - <b>${p.name}</b></p>
            `;
          });

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