module.exports = (mongoose) => {
  const Review = mongoose.model(
    'reviews',
    mongoose.Schema(
      {
        review_id: Number,
        temple_id: Number,
        author: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: String,
        isPublic: Boolean,
      },
      { timestamps: true }
    )
  );

  return Review;
};
