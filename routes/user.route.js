import express from 'express';
import { signupUser, loginUser, getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();


// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);


// get all users route
router.get('/', getAllUsers);


export { router as userRoutes};