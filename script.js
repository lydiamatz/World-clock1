const CITIES = [
  { name: "Athens", tz: "Europe/Athens", home: true },
  { name: "London", tz: "Europe/London" },
  { name: "New York", tz: "America/New_York" },
  { name: "Los Angeles", tz: "America/Los_Angeles" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Bangkok", tz: "Asia/Bangkok" },
  { name: "Stockholm", tz: "Europe/Stockholm" },
  { name: "Jakarta", tz: "Asia/Jakarta" },
  { name: "Copenhagen", tz: "Europe/Copenhagen" },
  { name: "Singapore", tz: "Asia/Singapore" },
  { name: "São Paulo", tz: "America/Sao_Paulo" },
];

let active = ["Athens", "London", "New York"];

function getTime(tz) {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: tz,
  });
}

function getDate(tz) {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: tz,
  });
}

function getOffset(tz) {
  const now = new Date();
  const home = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Athens" }));
  const there = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const diff = Math.round((there - home) / 3600000);
  if (diff === 0) return "your time";
  return diff > 0 ? `+${diff}h from Athens` : `${diff}h from Athens`;
}

function render() {
  const clocks = document.getElementById("clocks");
  const pills = document.getElementById("pills");

  if (active.length === 0) {
    clocks.innerHTML = `<div class="empty">add a city above</div>`;
  } else {
    clocks.innerHTML = active.map(name => {
      const city = CITIES.find(c => c.name === name);
      const id = "t_" + name.replace(/\s/g, "_");
      return `<div class="card ${city.home ? "home" : ""}">
        ${!city.home ? `<button class="remove-btn" onclick="removeCity('${name}')">✕</button>` : ""}
        <p class="city-name">${name}</p>
        <p class="time" id="${id}">${getTime(city.tz)}</p>
        <p class="date">${getDate(city.tz)}</p>
        <p class="offset">${getOffset(city.tz)}</p>
      </div>`;
    }).join("");
  }

  pills.innerHTML = CITIES.map(c => {
    const added = active.includes(c.name);
    return `<button ${added ? "disabled" : ""} onclick="addCity('${c.name}')">${c.name}</button>`;
  }).join("");
}

function addCity(name) {
  if (!active.includes(name)) {
    active.push(name);
    render();
  }
}

function removeCity(name) {
  active = active.filter(n => n !== name);
  render();
}

function tick() {
  active.forEach(name => {
    const city = CITIES.find(c => c.name === name);
    const el = document.getElementById("t_" + name.replace(/\s/g, "_"));
    if (el) el.textContent = getTime(city.tz);
  });
}

render();
setInterval(tick, 1000);
