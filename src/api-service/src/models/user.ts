import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true // Enable automatic timestamps
});
userSchema.index({ id: 1 }, { unique: true });

const UserModel = mongoose.model('UserModel', userSchema);
export default UserModel;
