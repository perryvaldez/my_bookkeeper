import crypto from 'crypto';

const hashPassword = (password, salt) => {
  const sha1 = crypto.createHash('sha1');
  sha1.update(`${password}|${salt}`);
  const sha1Pass = sha1.digest('hex');

  return sha1Pass;
};

export default { hashPassword };