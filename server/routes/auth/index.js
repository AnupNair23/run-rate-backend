import express from 'express';
const router = express.Router();
import { registerUser, userLogin, getNewUserToken, confirmEmail } from './auth';

//Admin API
router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/refresh', getNewUserToken);
router.get('/confirm/:confirmationCode', confirmEmail)

export default router;
