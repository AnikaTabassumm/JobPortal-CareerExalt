const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    getContactById,
    deleteContact
} = require('../controllers/contactController');

router.get('/', getAllContacts);

router.route('/:id').get(getContactById).delete(deleteContact);

module.exports = router;