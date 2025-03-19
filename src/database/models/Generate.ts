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
    balancedTeams: [
        {
            teamId: String,
            id: String,
            name: String,
            players: [String],
        },
    ],
});

export const Generate =
    mongoose.models.Generate || mongoose.model("Generate", generateSchema);