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
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: tz,
  }).format(new Date());
}

function getDate(tz) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: tz,
  }).format(new Date());
}

function getOffset(tz) {
  const now = new Date();
  const local = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Athens" }));
  const target = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const diff = Math.round((target - local) / 3600000);
  if (diff === 0) return "Your time";
  return diff > 0 ? `+${diff}h from Athens` : `${diff}h from Athens`;
}

function render() {
  const clocks = document.getElementById("clocks");
  const pills = document.getElementById("pills");

  if (active.length === 0) {
    clocks.innerHTML = `<div class="empty">No cities added yet — pick one above</div>`;
  } else {
    clocks.innerHTML = active.map(name => {
      const city = CITIES.find(c => c.name === name);
      const id = "t_" + name.replace(/[^a-zA-Z]/g, "_");
      return `<div class="clock-card ${city.home ? "home" : ""}">
        ${city.home ? "" : `<button class="remove" onclick="remove('${name}')">✕</button>`}
        <p class="card-city">${name}</p>
        <p class="card-time" id="${id}">${getTime(city.tz)}</p>
        <p class="card-date">${getDate(city.tz)}</p>
        <p class="card-offset">${getOffset(city.tz)}</p>
      </div>`;
    }).join("");
  }

  pills.innerHTML = CITIES.map(c => {
    const on = active.includes(c.name);
    return `<button class="pill" ${on ? "disabled" : ""} onclick="add('${c.name}')">${c.name}</button>`;
  }).join("");
}

function add(name) {
  if (!active.includes(name)) {
    active.push(name);
    render();
  }
}

function remove(name) {
  active = active.filter(n => n !== name);
  render();
}

function tick() {
  active.forEach(name => {
    const city = CITIES.find(c => c.name === name);
    const el = document.getElementById("t_" + name.replace(/[^a-zA-Z]/g, "_"));
    if (el) el.textContent = getTime(city.tz);
  });
}

render();
setInterval(tick, 1000);
