import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
import { response } from 'express';

// @desc    Fetch all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const curr_user = req.user._id;
  const contacts = await Contact.find({ user: curr_user });

  res.status(201).json(contacts);
});

// @desc    Fetch single contact
// @route   GET /api/contacts/:id
// @access  Private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    const { name, email, phone } = contact;
    res.json({ name, email, phone });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (contact) {
    res.status(200).json({ message: 'Contact removed' });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

// @desc    Create a contact
// @route   POST /api/contacts
// @access  Private
const addContact = asyncHandler(async (req, res) => {
  const contact = new Contact({
    user: req.user._id,
    ...req.body,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Private/Admin
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone, image } = req.body;
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.image = image;

    const updatedContact = await contact.save();
    res.status(201).json(updatedContact);
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

export {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
