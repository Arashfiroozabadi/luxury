const Liara = require('@liara/sdk');

export const endPoint = '5ed778ad1c92cc0011b11ead.liara.space';

export const liaraClient = new Liara.Storage.Client({
  accessKey: 'Z3SBHOIW4DM5VL9YTHRJF',
  secretKey: 'ejoUJJEe4yqkUYFohJZtYprSxWSqT8wC9Thv9AOBQ',
  endPoint,
});

export default liaraClient;
