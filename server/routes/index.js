import express from 'express';
import { validateUser } from '../middleware/jwt';
import auth from './auth'
import contact from './contact'

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'connected' });
});

router.use('/auth', auth);
router.use('/contact', validateUser, contact)

export default router;
