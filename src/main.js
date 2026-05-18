console.log("Hello, World!");

function sum(a, b) {
  return a + b;
}

function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function fahrenheitToCelsius(f) {
  return ((f - 32) * 5) / 9;
}

console.log("2 + 3 =", sum(2, 3));
console.log("100°C in Fahrenheit:", celsiusToFahrenheit(100));
console.log("32°F in Celsius:", fahrenheitToCelsius(32));
