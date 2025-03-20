import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export const playerSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidV4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  skill: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

export default mongoose.models.Player || mongoose.model('Player', playerSchema);