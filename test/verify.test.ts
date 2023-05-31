import { verify, sign } from '../src';

describe('verify', () => {
  it('Should verify and decode a valid token', () => {
    const secret = 'secret';

    const token = sign({ payload: { name: 'Aditya Singh' }, secret });

    const verified = verify({ token, secret });

    expect(verified.name).toBe('Aditya Singh');
  });

  it('Should throw if the signature is invalid', () => {
    const secretOne = 'secret1';
    const secretTwo = 'secret2';

    const token = sign({ payload: { name: 'Adi' }, secret: secretOne });

    try {
      verify({ token, secret: secretTwo });
    } catch (e) {
      expect(e.message).toBe('Invalid Signature');
    }
  });

  it('Should throw if the token is expired', () => {
    const secret = 'anothersecret';
    const token = sign({
      payload: { name: 'Adi' },
      secret,
      options: {
        expiresIn: -8.64e7, // 1 day in past
      },
    });

    try {
      verify({ token, secret });
    } catch (e) {
      expect(e.message).toBe('Token has expired');
    }
  });
});
