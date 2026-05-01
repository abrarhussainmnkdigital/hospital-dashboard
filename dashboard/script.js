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

      recent.innerHTML = "";
      cards.innerHTML = "";

      data.doctors.forEach(doc => {
        doc.patients.forEach(p => {

          total++;

          if (p.status === "Waiting") waiting++;
          if (p.status === "Consultation") consult++;

          tests += p.tests_pending.length;

          /* RECENT LIST */
          const row = document.createElement("div");
          row.innerHTML = `
            <p><b>${p.name}</b> - ${p.status} (${doc.name})</p>
          `;
          recent.appendChild(row);

          /* CARDS */
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${p.name}</h3>
            <p>Status: ${p.status}</p>
            <p>Doctor: ${doc.name}</p>
            <p>Room: ${doc.room}</p>
          `;
          cards.appendChild(card);
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