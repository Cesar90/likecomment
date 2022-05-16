import mongoose from 'mongoose'

// const PinSchema = new mongoose.Schema(
//   {
//     title: String,
//     content: String,
//     image: String,
//     latitude: Number,
//     longitude: Number,
//     author: { type: mongoose.Schema.ObjectId, ref: "User" },
//     comments: [
//       {
//         text: String,
//         createdAt: { type: Date, default: Date.now },
//         author: { type: mongoose.Schema.ObjectId, ref: "User" }
//       }
//     ]
//   },
//   { timestamps: true }
// );

const commentSchema = mongoose.Schema(
  {
    fakeUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'FakeUser',
    },
    comment: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
