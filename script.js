const apiKey = "a1d3bea5f14f4b9ab1853403261405";
const apiUrl = "https://api.weatherapi.com/v1/current.json";

const cityInput   = document.getElementById("cityInput");
const searchBtn   = document.getElementById("searchBtn");
const weatherDiv  = document.getElementById("weatherDiv");
const errorDiv    = document.getElementById("errorDiv");
const weatherIcon = document.getElementById("weatherIcon");

// ── Inline SVG weather icons (no image files needed) ──────────────────────
const icons = {
  sunny: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="14" fill="#FFD93D" />
    <g stroke="#FFD93D" stroke-width="3.5" stroke-linecap="round">
      <line x1="32" y1="6"  x2="32" y2="13"/>
      <line x1="32" y1="51" x2="32" y2="58"/>
      <line x1="6"  y1="32" x2="13" y2="32"/>
      <line x1="51" y1="32" x2="58" y2="32"/>
      <line x1="13.5" y1="13.5" x2="18.5" y2="18.5"/>
      <line x1="45.5" y1="45.5" x2="50.5" y2="50.5"/>
      <line x1="50.5" y1="13.5" x2="45.5" y2="18.5"/>
      <line x1="18.5" y1="45.5" x2="13.5" y2="50.5"/>
    </g>
  </svg>`,

  cloudy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="30" r="12" fill="#90a4c8"/>
    <circle cx="35" cy="26" r="15" fill="#aab8d4"/>
    <circle cx="46" cy="31" r="10" fill="#90a4c8"/>
    <rect x="12" y="30" width="44" height="14" rx="7" fill="#aab8d4"/>
  </svg>`,

  partlyCloudy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="11" fill="#FFD93D"/>
    <g stroke="#FFD93D" stroke-width="2.5" stroke-linecap="round">
      <line x1="20" y1="4"  x2="20" y2="9"/>
      <line x1="4"  y1="20" x2="9"  y2="20"/>
      <line x1="8"  y1="8"  x2="12" y2="12"/>
      <line x1="32" y1="8"  x2="28" y2="12"/>
    </g>
    <circle cx="28" cy="38" r="10" fill="#90a4c8"/>
    <circle cx="39" cy="34" r="13" fill="#aab8d4"/>
    <circle cx="50" cy="39" r="9"  fill="#90a4c8"/>
    <rect x="18" y="38" width="40" height="12" rx="6" fill="#aab8d4"/>
  </svg>`,

  rain: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="11" fill="#7a92b8"/>
    <circle cx="35" cy="18" r="14" fill="#8fa4c4"/>
    <circle cx="46" cy="23" r="9"  fill="#7a92b8"/>
    <rect x="12" y="22" width="42" height="12" rx="6" fill="#8fa4c4"/>
    <g stroke="#4db8ff" stroke-width="3" stroke-linecap="round">
      <line x1="22" y1="42" x2="18" y2="52"/>
      <line x1="32" y1="42" x2="28" y2="52"/>
      <line x1="42" y1="42" x2="38" y2="52"/>
    </g>
  </svg>`,

  drizzle: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="11" fill="#7a92b8"/>
    <circle cx="35" cy="18" r="14" fill="#8fa4c4"/>
    <circle cx="46" cy="23" r="9"  fill="#7a92b8"/>
    <rect x="12" y="22" width="42" height="12" rx="6" fill="#8fa4c4"/>
    <g stroke="#a0d8ff" stroke-width="2.5" stroke-linecap="round">
      <line x1="20" y1="42" x2="18" y2="48"/>
      <line x1="28" y1="44" x2="26" y2="50"/>
      <line x1="36" y1="42" x2="34" y2="48"/>
      <line x1="44" y1="44" x2="42" y2="50"/>
    </g>
  </svg>`,

  snow: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="11" fill="#a0b8d8"/>
    <circle cx="35" cy="18" r="14" fill="#b8cce0"/>
    <circle cx="46" cy="23" r="9"  fill="#a0b8d8"/>
    <rect x="12" y="22" width="42" height="12" rx="6" fill="#b8cce0"/>
    <g fill="#e0f0ff">
      <circle cx="22" cy="46" r="3"/>
      <circle cx="32" cy="52" r="3"/>
      <circle cx="42" cy="46" r="3"/>
      <circle cx="27" cy="56" r="2.5"/>
      <circle cx="37" cy="56" r="2.5"/>
    </g>
  </svg>`,

  mist: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#90a8c4" stroke-width="4" stroke-linecap="round" opacity="0.9">
      <line x1="8"  y1="22" x2="56" y2="22"/>
    </g>
    <g stroke="#90a8c4" stroke-width="4" stroke-linecap="round" opacity="0.6">
      <line x1="14" y1="32" x2="56" y2="32"/>
    </g>
    <g stroke="#90a8c4" stroke-width="4" stroke-linecap="round" opacity="0.4">
      <line x1="8"  y1="42" x2="48" y2="42"/>
    </g>
    <g stroke="#90a8c4" stroke-width="4" stroke-linecap="round" opacity="0.25">
      <line x1="14" y1="52" x2="50" y2="52"/>
    </g>
  </svg>`,

  thunder: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="20" r="11" fill="#5a6a8a"/>
    <circle cx="35" cy="16" r="14" fill="#6a7a9a"/>
    <circle cx="46" cy="21" r="9"  fill="#5a6a8a"/>
    <rect x="12" y="20" width="42" height="12" rx="6" fill="#6a7a9a"/>
    <polygon points="36,34 28,48 34,48 28,62 44,44 37,44" fill="#FFD93D"/>
  </svg>`,

  night: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M38 10 A20 20 0 1 0 38 50 A14 14 0 1 1 38 10Z" fill="#c8d8f0"/>
    <circle cx="46" cy="14" r="2" fill="#fff" opacity="0.7"/>
    <circle cx="52" cy="24" r="1.5" fill="#fff" opacity="0.5"/>
    <circle cx="14" cy="18" r="1.5" fill="#fff" opacity="0.5"/>
    <circle cx="10" cy="34" r="1" fill="#fff" opacity="0.4"/>
  </svg>`
};

// ── Map condition code → icon ─────────────────────────────────────────────
function getWeatherIcon(code, isDay) {
  if ([1087,1273,1276,1279,1282].includes(code)) return icons.thunder;
  if ([1066,1069,1114,1117,1204,1207,1210,1213,1216,1219,1222,1225,
       1237,1249,1252,1255,1258,1261,1264].includes(code)) return icons.snow;
  if ([1063,1180,1183,1186,1189,1192,1195,1198,1201,1240,1243,1246].includes(code)) return icons.rain;
  if ([1072,1150,1153,1168,1171].includes(code)) return icons.drizzle;
  if ([1030,1135,1147].includes(code)) return icons.mist;
  if ([1006,1009].includes(code)) return icons.cloudy;
  if (code === 1003) return icons.partlyCloudy;
  if (code === 1000) return isDay ? icons.sunny : icons.night;
  return isDay ? icons.sunny : icons.night;
}

// ── Fetch weather ─────────────────────────────────────────────────────────
async function checkWeather(city) {
  if (!city.trim()) return;

  // Show loading state
  weatherDiv.style.display = "none";
  errorDiv.style.display   = "none";

  try {
    const url = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;
    const res  = await fetch(url);

    if (res.status === 400 || res.status === 404) {
      errorDiv.style.display = "flex";
      return;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const d = await res.json();

    // Populate
    document.getElementById("temp").textContent        = Math.round(d.current.temp_c) + "°C";
    document.getElementById("city").textContent        = d.location.name + ", " + d.location.country;
    document.getElementById("description").textContent = d.current.condition.text;
    document.getElementById("humidity").textContent    = d.current.humidity + "%";
    document.getElementById("wind").textContent        = d.current.wind_kph + " km/h";
    document.getElementById("feelsLike").textContent   = Math.round(d.current.feelslike_c) + "°C";
    document.getElementById("visibility").textContent  = d.current.vis_km + " km";

    weatherIcon.innerHTML = getWeatherIcon(d.current.condition.code, d.current.is_day);

    weatherDiv.style.display = "block";
    errorDiv.style.display   = "none";

  } catch (err) {
    console.error(err);
    errorDiv.style.display   = "flex";
    weatherDiv.style.display = "none";
  }
}

// ── Events ────────────────────────────────────────────────────────────────
searchBtn.addEventListener("click", () => checkWeather(cityInput.value));
cityInput.addEventListener("keydown", e => { if (e.key === "Enter") checkWeather(cityInput.value); });

// Load default
checkWeather("New York");