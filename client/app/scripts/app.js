function Calculator() {
}

Calculator.prototype.addition = function(num, num2) {
  return num + num2;
};

Calculator.prototype.division = function(num1, num2) {
  if (num2 === 0) throw new Error('Calculator does not allow division by zero');
  return Math.round(num1 / num2);
};