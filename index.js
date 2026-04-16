const input = document.getElementById("stateInput");
const button = document.getElementById("getAlertsBtn");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Fetch weather alerts
async function fetchWeatherData(state) {
  const response = await fetch(
    `https://api.weather.gov/alerts/active?area=${state}`
  );

  if (!response.ok) {
    throw new Error("Network failure");
  }

  return await response.json();
}

// Display weather
function displayWeather(data) {
  const alerts = data.features || [];

  alertsDisplay.textContent = "";
  alertsDisplay.textContent = `Weather Alerts: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });

  // hide error on success
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";
}

// Display error
function displayError(message) {
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}

// Clear input
function clearInput() {
  input.value = "";
}

// MAIN BUTTON CLICK
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data);
    clearInput();
  } catch (error) {
    displayError(error.message);
  }
});

// export for tests
module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError
};