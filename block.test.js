const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
  const timestamp = 'test-date';
  const lastHash = 'crypt-lhash';
  const hash = 'crypt-hash';
  const data = ['blockchain', 'data'];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data
  });

  //I would not put all of the expects in the same function I would divide them but I wanted to show you
  it('Timestamp, lastHash, hash, and data are provided', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.data).toEqual(data);
  });
  describe('genesis()', () => {
    const genesisBlock = Block.genesis();
    it('returns Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('Returns genesis Data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data);
    });
    it('sets a `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('creates a SHA-256 `hash` based on proper inputs', () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
