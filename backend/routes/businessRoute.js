
import express from 'express';
import businessController from '../controllers/businessController.js';

const router = express.Router();

// GET /businesses
router.get('/', businessController.getAllBusinesses);

// GET /businesses/:id
router.get('/:id', businessController.getBusinessById);

// POST /businesses
router.post('/', businessController.createBusiness);

// PUT /businesses/:id
router.put('/:id', businessController.updateBusiness);

// DELETE /businesses/:id
router.delete('/:id', businessController.deleteBusiness);

export default router;