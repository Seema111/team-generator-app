import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { playerSchema } from './Player';

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
  players: [playerSchema],
});

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);