import express from 'express';
const router = express.Router();
import { showAllContacts, showContact, addContact, deleteContact } from './contact';

//Admin API
router.get('/show/all', showAllContacts);
router.get('/show', showContact);
router.post('/add', addContact);
router.post('/delete', deleteContact);

export default router;
