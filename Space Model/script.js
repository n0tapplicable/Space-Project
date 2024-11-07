const planetData = {
  Sun: { name: "Sun", info: "The Sun is the star at the center of the Solar System." },
  Mercury: { name: "Mercury", info: "The closest planet to the Sun." },
  Venus: { name: "Venus", info: "Second planet from the Sun." },
  Earth: { name: "Earth", info: "The third planet from the Sun, home to life." },
  Mars: { name: "Mars", info: "The fourth planet from the Sun, known as the Red Planet." },
  Jupiter: { name: "Jupiter", info: "The fifth planet from the Sun, the largest in the Solar System." },
  Saturn: { name: "Saturn", info: "The sixth planet from the Sun, known for its rings." },
  Uranus: { name: "Uranus", info: "The seventh planet from the Sun, an ice giant." },
  Neptune: { name: "Neptune", info: "The eighth planet from the Sun, known for its deep blue color." }
};

// Distance between planets in millions of kilometers
const planetDistances = {
  Mercury: { Venus: 50, Earth: 92, Mars: 170, Jupiter: 720, Saturn: 1376, Uranus: 2813, Neptune: 4437 },
  Venus: { Earth: 42, Mars: 120, Jupiter: 670, Saturn: 1326, Uranus: 2763, Neptune: 4387 },
  Earth: { Mars: 78, Jupiter: 628, Saturn: 1282, Uranus: 2716, Neptune: 4338 },
  Mars: { Jupiter: 550, Saturn: 1204, Uranus: 2638, Neptune: 4260 },
  Jupiter: { Saturn: 654, Uranus: 2088, Neptune: 3708 },
  Saturn: { Uranus: 1434, Neptune: 3054 },
  Uranus: { Neptune: 1620 }
};

const planetDropdown = document.getElementById("planet-dropdown");
const planetDetails = document.getElementById("planet-details");
const closeDetails = document.getElementById("close-details");
const planetNameElem = document.getElementById("planet-name");
const planetInfoElem = document.getElementById("planet-info");
const sizeSlider = document.getElementById("size-slider");

// Planet information dropdown
planetDropdown.addEventListener("change", () => {
  const selectedPlanet = planetDropdown.value;
  const data = planetData[selectedPlanet];
  planetNameElem.textContent = data.name;
  planetInfoElem.textContent = data.info;
  planetDetails.classList.remove("hidden");
});

// Close button for planet info
closeDetails.addEventListener("click", () => {
  planetDetails.classList.add("hidden");
});

// Size Comparison Slider
sizeSlider.addEventListener("input", () => {
  const scale = sizeSlider.value;
  document.querySelectorAll(".planet").forEach((planet) => {
    planet.style.transform = `scale(${scale})`;
  });
});

// Add planets and orbits to the solar system
document.addEventListener('DOMContentLoaded', () => {
  const planets = [
    { name: 'Sun', class: 'sun' },
    { name: 'Mercury', class: 'mercury' },
    { name: 'Venus', class: 'venus' },
    { name: 'Earth', class: 'earth' },
    { name: 'Mars', class: 'mars' },
    { name: 'Jupiter', class: 'jupiter' },
    { name: 'Saturn', class: 'saturn' },
    { name: 'Uranus', class: 'uranus' },
    { name: 'Neptune', class: 'neptune' },
  ];

  const solarSystem = document.getElementById('solar-system');

  planets.forEach(planet => {
    const orbitElement = document.createElement('div');
    orbitElement.classList.add('orbit', `${planet.class}-orbit`);
    solarSystem.appendChild(orbitElement);

    const planetElement = document.createElement('div');
    planetElement.classList.add('planet', planet.class);
    orbitElement.appendChild(planetElement);

    const labelElement = document.createElement('div');
    labelElement.classList.add('planet-label');
    labelElement.textContent = planet.name;
    planetElement.appendChild(labelElement);
  });
});

// Distance Calculator
document.getElementById("calculate-distance").addEventListener("click", () => {
  const planet1 = document.getElementById("planet1").value;
  const planet2 = document.getElementById("planet2").value;

  let distance;
  if (planet1 === planet2) {
    distance = 0;
  } else if (planetDistances[planet1] && planetDistances[planet1][planet2]) {
    distance = planetDistances[planet1][planet2];
  } else if (planetDistances[planet2] && planetDistances[planet2][planet1]) {
    distance = planetDistances[planet2][planet1];
  } else {
    distance = "Unknown"; // In case we don't have the data for some combinations
  }

  document.getElementById("distance-result").textContent = `Distance: ${distance} million km`;
});