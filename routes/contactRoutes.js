import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';
import {
  addContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../controllers/contactController.js';

router.route('/').get(protect, getContacts).post(protect, addContact);
router
  .route('/:id')
  .get(protect, getContactById)
  .delete(protect, deleteContact)
  .put(protect, updateContact);

export default router;
