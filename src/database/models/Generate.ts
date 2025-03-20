import mongoose from "mongoose";

const generateSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    teamCount: {
        type: Number,
        default: 0
    },
    playerCount: {
        type: Number,
        default: 0
    },
    balancedTeams: [
        {
            id: String,
            name: String,
            players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
        },
    ],
});

export const Generate =
    mongoose.models.Generate || mongoose.model("Generate", generateSchema);