import asyncHandler from 'express-async-handler'
import Comment from '../models/commentModel.js'
import FakeUser from '../models/fakeUserModel.js'

const createUpvote = asyncHandler(async (req, res) => {
  let commentInfo = await Comment.findById(req.body.commentId)
  let upvoteCount = 0
  if (!Number.isInteger(commentInfo.upvote)) {
    upvoteCount = 0
  } else {
    upvoteCount = commentInfo.upvote + 1
  }
  commentInfo.upvote = upvoteCount
  commentInfo = await commentInfo.save()
  res.json(commentInfo)
})

const createComment = asyncHandler(async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    fakeUser: req.body.userId,
    upvote: 0,
  })

  const createdComment = await comment.save()
  const commentUser = await Comment.findById(createdComment._id).populate(
    'fakeUser'
  )
  res.status(201).json(commentUser)
})

const getComments = asyncHandler(async (req, res) => {
  // const fakeUser = new FakeUser({
  //   name: 'Cesar',
  //   avatar:
  //     'https://gravatar.com/avatar/1ad8b09b225046d0fc1f268af47edc71?s=400&d=robohash&r=x',
  // })
  // const createdFakeUser = await fakeUser.save()
  // console.log(fakeUser)
  //   const comment = new Comment({
  //     comment: 'Sample name',
  //     fakeUser: '627eb60cce89d42b9d43ff8b',
  //   })

  //   const createdComment = await comment.save()
  //   console.log(createdComment)

  // const pins = await Pin.find({})
  //       .populate("author")
  //       .populate("comments.author");

  const comments = await Comment.find({}).populate('fakeUser')
  res.json({ comments })
})

export { createComment, getComments, createUpvote }
