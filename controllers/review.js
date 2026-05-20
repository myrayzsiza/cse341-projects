const db = require('../models');
const Review = db.reviews;

const validateReview = (body) => {
  if (!body.review_id || !body.temple_id || !body.author || !body.comment || body.rating == null) {
    return 'review_id, temple_id, author, comment, and rating are required.';
  }
  if (typeof body.review_id !== 'number' || typeof body.temple_id !== 'number') {
    return 'review_id and temple_id must be numbers.';
  }
  if (typeof body.author !== 'string' || body.author.trim() === '') {
    return 'author must be a non-empty string.';
  }
  if (typeof body.comment !== 'string' || body.comment.trim() === '') {
    return 'comment must be a non-empty string.';
  }
  if (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
    return 'rating must be a number between 1 and 5.';
  }
  if (body.isPublic != null && typeof body.isPublic !== 'boolean') {
    return 'isPublic must be a boolean when provided.';
  }
  return null;
};

exports.create = async (req, res) => {
  try {
    const validationError = validateReview(req.body);
    if (validationError) {
      return res.status(400).send({ message: validationError });
    }

    const review = new Review({
      review_id: req.body.review_id,
      temple_id: req.body.temple_id,
      author: req.body.author,
      rating: req.body.rating,
      comment: req.body.comment,
      date: req.body.date || new Date().toISOString(),
      isPublic: req.body.isPublic ?? true,
    });

    const data = await review.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Some error occurred while creating the review.' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.temple_id) {
      filter.temple_id = Number(req.query.temple_id);
    }
    const data = await Review.find(filter);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Some error occurred while retrieving reviews.' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const review_id = Number(req.params.review_id);
    const data = await Review.findOne({ review_id });
    if (!data) {
      return res.status(404).send({ message: `Review not found with id ${review_id}` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error retrieving review.' });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'Data to update can not be empty!' });
    }

    const validationError = validateReview({ ...req.body, review_id: Number(req.params.review_id) });
    if (validationError) {
      return res.status(400).send({ message: validationError });
    }

    const review_id = Number(req.params.review_id);
    const data = await Review.findOneAndUpdate({ review_id }, req.body, {
      new: true,
      useFindAndModify: false,
    });

    if (!data) {
      return res.status(404).send({ message: `Cannot update review with id=${review_id}. Maybe review was not found!` });
    }

    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || `Error updating review with id=${req.params.review_id}` });
  }
};

exports.delete = async (req, res) => {
  try {
    const review_id = Number(req.params.review_id);
    const data = await Review.findOneAndDelete({ review_id });
    if (!data) {
      return res.status(404).send({ message: `Cannot delete review with id=${review_id}. Maybe review was not found!` });
    }
    res.send({ message: 'Review was deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: `Could not delete review with id=${req.params.review_id}` });
  }
};
