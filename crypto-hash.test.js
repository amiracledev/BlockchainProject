const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('secret')).toEqual(
      '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b'
    );
  });
  it('produces the same hash with the same input arguments in and order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(
      cryptoHash('three', 'one', 'two')
    );
  });
});
