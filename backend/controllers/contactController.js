const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access Private (admin only)
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
});

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access Private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    res.status(200).json(contact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    await contact.destroy();
    res.status(200).json({ message: 'Contact deleted successfully' });
});

module.exports = {
    getAllContacts,
    getContactById,
    deleteContact
};