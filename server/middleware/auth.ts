import jwt from 'jsonwebtoken';

function auth(req: any, res:any, next:any) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ msg: 'Auth Error' });
  try {
    const key = process.env.token;
    const decoded:any = jwt.verify(token, `${key}`);
    req.user = decoded.user;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: 'Invalid Token' });
  }
}

export default auth;
