console.log("Hello, World!");

function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a + b;
}

function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function fahrenheitToCelsius(f) {
  return ((f - 32) * 5) / 9;
}

function calculator(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    default:
      throw new Error(`Unknown operator: ${op}`);
  }
}

console.log("2 + 3 =", sum(2, 3));
console.log("100°C in Fahrenheit:", celsiusToFahrenheit(100));
console.log("32°F in Celsius:", fahrenheitToCelsius(32));
console.log("10 / 2 =", calculator(10, "/", 2));
