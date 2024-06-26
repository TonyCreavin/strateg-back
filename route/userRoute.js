import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { signup, signin } from '../controllers/authController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', signup);
router.post('/login', signin);

router.route('/').get(protect, getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
