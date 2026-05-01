// No external backend needed
const BASE_URL = "";

function loadData() {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("doctors");
      container.innerHTML = "";

      data.doctors.forEach(doc => {
        const div = document.createElement("div");
        div.className = "card";

        let patientsHTML = "";
        doc.patients.forEach(p => {
          patientsHTML += `
            <p><strong>${p.name}</strong> - ${p.status}</p>
            <p>Done: ${p.tests_done.join(", ")}</p>
            <p>Pending: ${p.tests_pending.join(", ")}</p>
            <hr>
          `;
        });

        div.innerHTML = `
          <h2>${doc.name}</h2>
          <p>Room: ${doc.room}</p>
          ${patientsHTML}
        `;

        container.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}

// Auto refresh every 3 seconds
setInterval(loadData, 3000);

// Initial load
loadData();