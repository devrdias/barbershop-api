import { Router } from 'express';
import User from '../app/models/User';

const router = new Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const user = await User.create({
    name: 'Rafael',
    email: 'rafael@gmail.com',
    password_hash: '231231231312',
  });

  res.json(user);
});

export default router;
