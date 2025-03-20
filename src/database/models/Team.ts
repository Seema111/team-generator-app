import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

const teamSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidV4,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});


export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);