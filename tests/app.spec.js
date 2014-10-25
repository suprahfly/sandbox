describe('Calculator', function () {
  var calc;

  beforeEach(function () {
    calc = new Calculator();
  });

  describe('Addition', function () {
    it('should be able to return sum of two numbers', function () {
      var result = calc.addition(2, 2);

      expect(result).toBe(4);
    });
  });

  describe('Division', function () {
    it('should be able to return result of one number divided by other', function () {
      var result = calc.division(20, 7);

      expect(result).toBe(3);
    });

    it('should throw an error', function () {

      expect(function () {
        calc.division(3, 0);
      }).toThrow(new Error('Calculator does not allow division by zero'));
    });
  });
});
