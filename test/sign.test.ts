import { sign } from '../src';

describe('sign', () => {
  it('Should produce different signatures for different payloads', () => {
    const secret = '$secret$';
    const jwtOne = sign({
      payload: { name: 'Adi' },
      secret,
      options: { expiresIn: 8.64e7 }, // 1 day in milliseconds
    }).split('.')[2];

    const jwtTwo = sign({
      payload: { name: 'Adi' },
      secret: `${secret}-13342`,
      options: { expiresIn: 8.64e7 }, // 1 day in milliseconds
    }).split('.')[2];

    expect(jwtOne).not.toBe(jwtTwo);
  });

  it('Should add the expiry to the payload', () => {
    const secret = '$new-secret$';
    const jwtOne = sign({
      payload: { name: 'Adi' },
      secret,
      options: { expiresIn: 8.64e7 }, // 1 day in milliseconds
    }).split('.')[1];

    expect(typeof JSON.parse(atob(jwtOne)).exp).toBe('number');
  });
});
