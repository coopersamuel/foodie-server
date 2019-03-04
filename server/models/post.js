const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const Restaurant = mongoose.model('restaurant');

// This is the Post schema for mongoose
// This schema contains the data that will be stored in each Post record
const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      autopopulate: {
        select: ['firstName', 'lastName', 'email', 'username']
      }
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'restaurant',
      required: true,
      autopopulate: {
        select: ['name', 'lat', 'long']
      }
    },
    review: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      default: null
    },
    media: {
      type: [String],
      default: null
    },
    taggedUsers: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: null,
      autopopulate: {
        select: ['username']
      }
    },
    hashtags: {
      type: [String],
      match: RegExp('^#', 'i'),
      default: null
    }
  },
  {
    timestamps: true
  }
);

PostSchema.post('save', async function(doc, next) {
  // Once a post is saved, update both the restaurant avgRating and ratingCount in the Restaurant collection

  // avgRating
  await Restaurant.findById({ _id: doc.restaurant }, async function(err, obj) {
    await Restaurant.findByIdAndUpdate(doc.restaurant, {
      $set: {
        avgRating:
          (obj.toObject().ratingCount * obj.toObject().avgRating + doc.review) /
          (obj.toObject().ratingCount + 1)
      }
    });
  });

  // ratingCount
  await Restaurant.findByIdAndUpdate(doc.restaurant, {
    $inc: { ratingCount: 1 }
  });
  next();
});

PostSchema.post('remove', async function(doc, next) {
  // When a post is removed, update both the restaurant avgRating and ratingCount in the Restaurant collection

  // avgRating
  await Restaurant.findById({ _id: doc.restaurant }, async function(err, obj) {
    await Restaurant.findByIdAndUpdate(doc.restaurant, {
      $set: {
        avgRating:
          (obj.toObject().ratingCount * obj.toObject().avgRating - doc.review) /
          (obj.toObject().ratingCount - 1)
      }
    });
  });

  // ratingCount
  await Restaurant.findByIdAndUpdate(doc.restaurant, {
    $inc: { ratingCount: -1 }
  });
  next();
});

PostSchema.plugin(autopopulate);

// Create a post model
mongoose.model('post', PostSchema);
