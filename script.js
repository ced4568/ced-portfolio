document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.querySelector("[data-year]");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  loadNocStatus();
  setInterval(loadNocStatus, 30000);
});

async function loadNocStatus() {
  try {
    const response = await fetch("data/noc-status.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const statusText = document.getElementById("noc-status-text");
    const nodes = document.getElementById("metric-nodes");
    const services = document.getElementById("metric-services");
    const vlans = document.getElementById("metric-vlans");
    const edge = document.getElementById("metric-edge");
    const grid = document.getElementById("noc-system-grid");
    const alertList = document.getElementById("noc-alert-list");

    if (!statusText || !nodes || !services || !vlans || !edge || !grid) {
      return;
    }

    statusText.textContent = `${data.nocName} — ${data.status} — Last updated: ${data.lastUpdated}`;

    animateMetric(nodes, data.summary.nodes);
    animateMetric(services, data.summary.services);
    animateMetric(vlans, data.summary.vlans);
    animateMetric(edge, data.summary.edgeSystems);

    grid.innerHTML = "";

    data.systems.forEach((system) => {
      const card = document.createElement("article");
      card.className = "noc-system-card";

      const status = system.status.toLowerCase();

      const statusClass =
        status.includes("online") || status.includes("operational")
          ? "online"
          : status.includes("building") || status.includes("tuning") || status.includes("active")
          ? "warning"
          : "offline";

      card.innerHTML = `
        <div class="noc-system-top">
          <span class="mini-status ${statusClass}"></span>
          <span>${system.layer}</span>
        </div>

        <div class="system-label">${system.label || "System"}</div>

        <div class="severity-pill ${system.severity?.toLowerCase() || "unknown"}">
          ${system.severity || "Unknown"}
        </div>

        <h3>${system.name}</h3>
        <p>${system.type}</p>
        <code>${system.address}</code>

        <div class="system-meta">
          <small>Status: ${system.status}</small>
          <small>Latency: ${system.latency || "N/A"}</small>
          <small>Last Check: ${system.lastCheck || "Manual"}</small>
        </div>
      `;

      grid.appendChild(card);
    });

    if (alertList) {
      renderAlerts(data.systems, alertList);
    }
  } catch (error) {
    const statusText = document.getElementById("noc-status-text");

    if (statusText) {
      statusText.textContent = "Ced’s NOC data unavailable";
    }

    console.error("Failed to load NOC status:", error);
  }
}

function animateMetric(element, value) {
  element.classList.remove("metric-pop");
  element.textContent = value;

  void element.offsetWidth;
  element.classList.add("metric-pop");
}

function renderAlerts(systems, alertList) {
  const priority = systems
    .map((system) => {
      const severity = (system.severity || "Unknown").toLowerCase();
      const status = (system.status || "").toLowerCase();

      let score = 0;

      if (severity.includes("critical") || status.includes("offline")) {
        score = 3;
      } else if (severity.includes("degraded")) {
        score = 2;
      } else if (severity.includes("unknown")) {
        score = 1;
      }

      return { ...system, score };
    })
    .filter((system) => system.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (priority.length === 0) {
    alertList.innerHTML = `
      <div class="noc-alert healthy">
        <strong>All monitored systems healthy</strong>
        <span>No critical or degraded systems detected.</span>
      </div>
    `;
    return;
  }

  alertList.innerHTML = priority
    .map((system) => {
      const alertClass =
        system.score === 3 ? "critical" : system.score === 2 ? "degraded" : "unknown";

      return `
        <div class="noc-alert ${alertClass}">
          <strong>${system.name}</strong>
          <span>${system.severity || system.status} • ${system.layer} • ${system.latency || "N/A"}</span>
        </div>
      `;
    })
    .join("");
}