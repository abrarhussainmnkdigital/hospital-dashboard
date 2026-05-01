function loadData() {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("patients");
      container.innerHTML = "";

      data.doctors.forEach(doc => {
        doc.patients.forEach(p => {

          const div = document.createElement("div");
          div.className = "card";

          div.innerHTML = `
            <h2>${p.name}</h2>

            <p><strong>Status:</strong> 
              <span class="status ${p.status.toLowerCase()}">
                ${p.status}
              </span>
            </p>

            <p><strong>Doctor:</strong> ${doc.name}</p>
            <p><strong>Room:</strong> ${doc.room}</p>

            <p><strong>Tests Done:</strong><br>
              ${p.tests_done.join(", ")}
            </p>

            <p><strong>Pending Tests:</strong><br>
              ${p.tests_pending.join(", ")}
            </p>
          `;

          container.appendChild(div);
        });
      });
    });
}

// Auto refresh
setInterval(loadData, 3000);
loadData();