import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const fakeUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

fakeUserSchema.statics.random = function (cb) {
  this.count(
    function (err, count) {
      if (err) return cb(err)
      var rand = Math.floor(Math.random() * count)
      this.findOne().skip(rand).exec(cb)
    }.bind(this)
  )
}

const FakeUser = mongoose.model('FakeUser', fakeUserSchema)

export default FakeUser
