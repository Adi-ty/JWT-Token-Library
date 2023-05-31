import { decode, sign } from '../src';

describe('decode', () => {
  it('Should decode the token payload', () => {
    const token = sign({ payload: { name: 'Aditya Singh' }, secret: 'secret' });

    const decoded = decode({ token });

    expect(decoded.name).toBe('Aditya Singh');
  });
});
