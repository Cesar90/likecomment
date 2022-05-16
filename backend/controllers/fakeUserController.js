import asyncHandler from 'express-async-handler'
import FakeUser from '../models/fakeUserModel.js'

const getFakeUser = asyncHandler(async (req, res) => {
  await FakeUser.random((err, fakeUser) => {
    res.json({ fakeUser })
  })
})

export { getFakeUser }
