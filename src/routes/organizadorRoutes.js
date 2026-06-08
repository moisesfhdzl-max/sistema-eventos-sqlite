// src/routes/organizadorRoutes.js
import express from 'express';
import { organizadorController } from '../controllers/organizadorController.js';

const router = express.Router();

router.get('/', organizadorController.getAll);
router.get('/:id', organizadorController.getById);
router.post('/', organizadorController.create);
router.put('/:id', organizadorController.update);
router.delete('/:id', organizadorController.delete);

export default router;