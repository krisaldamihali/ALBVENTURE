
document.addEventListener('DOMContentLoaded', function() {
// Mock locations in Albania for autocomplete
const albanianLocations = [
"Tirana", "Durrës", "Vlorë", "Shkodër", "Sarandë", "Korçë", "Elbasan", 
"Fier", "Berat", "Lushnjë", "Pogradec", "Gjirokastër", "Lezhë", "Kukës"
];
// Initialize variables
let startLocation = document.getElementById('startLocation');
let endLocation = document.getElementById('endLocation');
let calculateBtn = document.getElementById('calculateBtn');
let resetBtn = document.getElementById('resetBtn');
let switchBtn = document.getElementById('switchBtn');
let resultsContainer = document.getElementById('resultsContainer');
let loader = document.getElementById('loader');
// Simulate autocomplete functionality
function setupAutocomplete(inputElement) {
inputElement.addEventListener('input', function() {
const value = this.value.toLowerCase();
if (value.length < 2) return;
// Remove any existing dropdown
const existingDropdown = document.querySelector('.autocomplete-dropdown');
if (existingDropdown) {
existingDropdown.remove();
}
// Filter locations based on input
const matches = albanianLocations.filter(location =>
location.toLowerCase().includes(value)
);
if (matches.length > 0) {
// Create dropdown
const dropdown = document.createElement('div');
dropdown.className = 'autocomplete-dropdown absolute z-10 bg-white w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto';
// Add matches to dropdown
matches.forEach(match => {
const item = document.createElement('div');
item.className = 'p-3 hover:bg-gray-100 cursor-pointer';
item.textContent = match;
item.addEventListener('click', function() {
inputElement.value = match;
dropdown.remove();
});
dropdown.appendChild(item);
});
// Append dropdown to input container
inputElement.parentNode.appendChild(dropdown);
}
});
// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
if (!e.target.matches('.location-input')) {
const dropdown = document.querySelector('.autocomplete-dropdown');
if (dropdown) {
dropdown.remove();
}
}
});
}
// Setup autocomplete for both inputs
setupAutocomplete(startLocation);
setupAutocomplete(endLocation);
// Calculate button click handler
calculateBtn.addEventListener('click', function() {
const start = startLocation.value.trim();
const end = endLocation.value.trim();
if (!start || !end) {
alert('Please enter both starting point and destination');
return;
}
// Show loader
loader.style.display = 'block';
// Simulate calculation delay
setTimeout(function() {
calculateRoute(start, end);
loader.style.display = 'none';
resultsContainer.classList.remove('hidden');
}, 1500);
});
// Reset button click handler
resetBtn.addEventListener('click', function() {
startLocation.value = '';
endLocation.value = '';
resultsContainer.classList.add('hidden');
});
// Switch locations button click handler
switchBtn.addEventListener('click', function() {
const temp = startLocation.value;
startLocation.value = endLocation.value;
endLocation.value = temp;
});
// Function to calculate route and update results
function calculateRoute(start, end) {
// This is a simplified mock calculation
// In a real application, you would use Google Maps API
// Generate a random but realistic distance based on locations
let distance = 0;
// Predefined distances for common routes
const commonRoutes = {

// From Tirana
  "Tirana-Durrës": 40,
  "Tirana-Vlorë": 150,
  "Tirana-Shkodër": 95,
  "Tirana-Sarandë": 283,
  "Tirana-Korçë": 185,
  "Tirana-Elbasan": 45,
  "Tirana-Fier": 115,
  "Tirana-Berat": 119,
  "Tirana-Lushnjë": 92,
  "Tirana-Pogradec": 165,
  "Tirana-Gjirokastër": 238,
  "Tirana-Lezhë": 90,
  "Tirana-Kukës": 195,

  // From Durrës
  "Durrës-Vlorë": 120,
  "Durrës-Shkodër": 185,
  "Durrës-Sarandë": 330,
  "Durrës-Korçë": 276,
  "Durrës-Elbasan": 60,
  "Durrës-Fier": 105,
  "Durrës-Berat": 140,
  "Durrës-Lushnjë": 88,
  "Durrës-Pogradec": 280,
  "Durrës-Gjirokastër": 290,
  "Durrës-Lezhë": 95,
  "Durrës-Kukës": 265,

  // From Vlorë
  "Vlorë-Shkodër": 295,
  "Vlorë-Sarandë": 125,
  "Vlorë-Korçë": 315,
  "Vlorë-Elbasan": 165,
  "Vlorë-Fier": 37,
  "Vlorë-Berat": 100,
  "Vlorë-Lushnjë": 80,
  "Vlorë-Pogradec": 305,
  "Vlorë-Gjirokastër": 112,
  "Vlorë-Lezhë": 243,
  "Vlorë-Kukës": 355,

  // From Shkodër
  "Shkodër-Sarandë": 380,
  "Shkodër-Korçë": 330,
  "Shkodër-Elbasan": 175,
  "Shkodër-Fier": 235,
  "Shkodër-Berat": 235,
  "Shkodër-Lushnjë": 210,
  "Shkodër-Pogradec": 300,
  "Shkodër-Gjirokastër": 405,
  "Shkodër-Lezhë": 25,
  "Shkodër-Kukës": 163,

  // From Sarandë
  "Sarandë-Korçë": 310,
  "Sarandë-Elbasan": 310,
  "Sarandë-Fier": 247,
  "Sarandë-Berat": 245,
  "Sarandë-Lushnjë": 300,
  "Sarandë-Pogradec": 325,
  "Sarandë-Gjirokastër": 63,
  "Sarandë-Lezhë": 393,
  "Sarandë-Kukës": 385,

  // From Korçë
  "Korçë-Elbasan": 180,
  "Korçë-Fier": 330,
  "Korçë-Berat": 202,
  "Korçë-Lushnjë": 260,
  "Korçë-Pogradec": 65,
  "Korçë-Gjirokastër": 258,
  "Korçë-Lezhë": 300,
  "Korçë-Kukës": 230,

  // From Elbasan
  "Elbasan-Fier": 140,
  "Elbasan-Berat": 90,
  "Elbasan-Lushnjë": 125,
  "Elbasan-Pogradec": 210,
  "Elbasan-Gjirokastër": 230,
  "Elbasan-Lezhë": 185,
  "Elbasan-Kukës": 215,

  // From Fier
  "Fier-Berat": 59,
  "Fier-Lushnjë": 29,
  "Fier-Pogradec": 269,
  "Fier-Gjirokastër": 212,
  "Fier-Lezhë": 225,
  "Fier-Kukës": 325,

  // From Berat
  "Berat-Lushnjë": 33,
  "Berat-Pogradec": 145,
  "Berat-Gjirokastër": 225,
  "Berat-Lezhë": 230,
  "Berat-Kukës": 280,

  // From Lushnjë
  "Lushnjë-Pogradec": 259,
  "Lushnjë-Gjirokastër": 210,
  "Lushnjë-Lezhë": 205,
  "Lushnjë-Kukës": 300,

  // From Pogradec
  "Pogradec-Gjirokastër": 285,
  "Pogradec-Lezhë": 290,
  "Pogradec-Kukës": 180,

  // From Gjirokastër
  "Gjirokastër-Lezhë": 320,
  "Gjirokastër-Kukës": 350,

  // From Lezhë
  "Lezhë-Kukës": 225

};
// Check if the route is in our predefined list
const route1 = `${start}-${end}`;
const route2 = `${end}-${start}`;
if (commonRoutes[route1]) {
distance = commonRoutes[route1];
} else if (commonRoutes[route2]) {
distance = commonRoutes[route2];
} else {
// Generate a random but realistic distance for unknown routes
// Albania is about 360km north-south, so max distance ~400km
distance = Math.floor(Math.random() * 300) + 20;
}
// Calculate time (rough estimate: 60km/h average speed)
const timeInMinutes = Math.round(distance / 60 * 60);
const hours = Math.floor(timeInMinutes / 60);
const minutes = timeInMinutes % 60;
const timeText = hours > 0 ?
`${hours} hr ${minutes} min` :
`${minutes} min`;
// Calculate fare
const baseFare = 300; // ALL
const ratePerKm = 150; // ALL
const distanceCharge = Math.round(distance * ratePerKm);
const totalFare = baseFare + distanceCharge;
// Calculate price range (±10%)
const minFare = Math.round(totalFare * 0.9);
const maxFare = Math.round(totalFare * 1.1);
// Update the results
document.getElementById('distanceResult').textContent = `${distance} km`;
document.getElementById('timeResult').textContent = timeText;
document.getElementById('fareResult').textContent = `${totalFare.toLocaleString()} ALL`;
document.getElementById('baseFare').textContent = `${baseFare.toLocaleString()} ALL`;
document.getElementById('distanceCharge').textContent = `${distanceCharge.toLocaleString()} ALL`;
document.getElementById('totalFare').textContent = `${totalFare.toLocaleString()} ALL`;
document.getElementById('priceRange').textContent = `${minFare.toLocaleString()}-${maxFare.toLocaleString()} ALL`;
}
});
