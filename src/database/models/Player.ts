import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export const playerSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidV4,
  },
  name: {
    type: String,
    required: true,
  },
  skill: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Player || mongoose.model('Player', playerSchema);