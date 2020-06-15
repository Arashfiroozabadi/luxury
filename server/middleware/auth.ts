import jwt from 'jsonwebtoken';
import Loger from '../components/logers';

function auth(req: any, res:any, next:any) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ msg: 'Auth Error' });
  try {
    const key = process.env.token;
    const decoded:any = jwt.verify(token, `${key}`);
    req.user = decoded.user;
    return next();
  } catch (e) {
    Loger('error', e.message);
    return res.status(500).send({ msg: 'احراز هویت کاربر نا موفق بود' });
  }
}

export default auth;
