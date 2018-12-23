import { expect } from 'chai';
import add from '../src/utils';

describe('test', () => {
  describe('eh', () => {
    it('to be right', () => {
      const res = add(1, 3);
      expect(res).to.be.equal(4);
    });
  });
});