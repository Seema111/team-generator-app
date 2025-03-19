import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

const teamSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidV4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Team || mongoose.model('Team', teamSchema);