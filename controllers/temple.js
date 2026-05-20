const db = require('../models');
const Temple = db.temples;

const validateTemple = (body) => {
  if (!body.temple_id || !body.name || !body.location || !body.dedicated || !body.region || !body.country) {
    return 'temple_id, name, location, dedicated, region, and country are required.';
  }
  if (typeof body.temple_id !== 'number') {
    return 'temple_id must be a number.';
  }
  if (typeof body.name !== 'string' || body.name.trim() === '') {
    return 'name must be a non-empty string.';
  }
  if (typeof body.location !== 'string' || body.location.trim() === '') {
    return 'location must be a non-empty string.';
  }
  if (typeof body.dedicated !== 'string' || body.dedicated.trim() === '') {
    return 'dedicated must be a non-empty string.';
  }
  if (typeof body.region !== 'string' || body.region.trim() === '') {
    return 'region must be a non-empty string.';
  }
  if (typeof body.country !== 'string' || body.country.trim() === '') {
    return 'country must be a non-empty string.';
  }
  if (body.additionalInfo != null && typeof body.additionalInfo !== 'boolean') {
    return 'additionalInfo must be a boolean when provided.';
  }
  return null;
};

exports.create = async (req, res) => {
  try {
    const validationError = validateTemple(req.body);
    if (validationError) {
      return res.status(400).send({ message: validationError });
    }

    const temple = new Temple({
      temple_id: req.body.temple_id,
      name: req.body.name,
      location: req.body.location,
      dedicated: req.body.dedicated,
      region: req.body.region,
      country: req.body.country,
      history: req.body.history || '',
      additionalInfo: req.body.additionalInfo ?? false,
    });

    const data = await temple.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Some error occurred while creating the Temple.' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Temple.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Some error occurred while retrieving temples.' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const temple_id = Number(req.params.temple_id);
    const data = await Temple.findOne({ temple_id });
    if (!data) {
      return res.status(404).send({ message: `Temple not found with id ${temple_id}` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || `Error retrieving Temple with temple_id=${req.params.temple_id}` });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'Data to update can not be empty!' });
    }

    const updatePayload = { ...req.body };
    const validationError = validateTemple({ ...updatePayload, temple_id: Number(req.params.temple_id) });
    if (validationError) {
      return res.status(400).send({ message: validationError });
    }

    const temple_id = Number(req.params.temple_id);
    const data = await Temple.findOneAndUpdate({ temple_id }, updatePayload, {
      new: true,
      useFindAndModify: false,
    });

    if (!data) {
      return res.status(404).send({ message: `Cannot update Temple with id=${temple_id}. Maybe Temple was not found!` });
    }

    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || `Error updating Temple with temple_id=${req.params.temple_id}` });
  }
};

exports.delete = async (req, res) => {
  try {
    const temple_id = Number(req.params.temple_id);
    const data = await Temple.findOneAndDelete({ temple_id });
    if (!data) {
      return res.status(404).send({ message: `Cannot delete Temple with id=${temple_id}. Maybe Temple was not found!` });
    }
    res.send({ message: 'Temple was deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message || `Could not delete Temple with temple_id=${req.params.temple_id}` });
  }
};
