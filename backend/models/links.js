import mongoose from 'mongoose';

const LinksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
});

export default mongoose.model('Links', LinksSchema);
