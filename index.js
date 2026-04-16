const input = document.getElementById("stateInput");
const button = document.getElementById("getAlertsBtn");
const output = document.getElementById("output");
const errorEl = document.getElementById("error");

// Fetch weather alerts
async function fetchWeatherData(state) {
  try {
    if (!state) {
      throw new Error("Please enter a state.");
    }

    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    displayError(error.message);
    throw error; // important for tests
  }
}

// Display weather alerts
function displayWeather(data, state) {
  clearError();

  const alerts = data.features;

  output.innerHTML = `
    <h2>Current watches, warnings, and advisories for ${state}: ${alerts.length}</h2>
  `;

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    output.appendChild(p);
  });
}

// Display error
function displayError(message) {
  errorEl.style.display = "block";
  errorEl.textContent = message;
}

// Clear error
function clearError() {
  errorEl.style.display = "none";
  errorEl.textContent = "";
}

// Clear UI
function clearUI() {
  input.value = "";
}

// Button click event
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data, state);
    clearUI();
  } catch (error) {
    // already handled
  }
});

// Export for testing
module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError
};