import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import Player from "@/database/models/Player";
import { Team } from "@/database/models/Team";
import { Generate } from "@/database/models/Generate";
import { IServerTeam, IServerGenerate } from "@/types";
import { generateBalancedTeams } from "@/app/utils/algorithm";
import mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";

function transformTeam(team: IServerTeam) {
    return {
        id: team._id,
        name: team.name,
        players: team.players,
    };
}

function transformMatch(match: IServerGenerate) {
    return {
        matchId: match.matchId,
        title: match.title,
        teamCount: match.teamCount,
    };
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await dbConnect();
        
        const { title } = await request.json();

        if (!title || typeof title !== "string" || title.trim() === "") {
            return NextResponse.json(
                { success: false, error: "Title must be a non-empty string" },
                { status: 400 }
            );
        }

        const players = await Player.find({});
        const existingTeams = await Team.find({}, { _id: 1, name: 1 });
        
        const numberOfTeams = existingTeams.length;

        if (numberOfTeams < 2 || players.length < 2) {
            return NextResponse.json(
                { success: false, error: "At least 2 players and 2 teams must be added!" },
                { status: 400 }
            );
        }

        if (players.length < numberOfTeams) {
            return NextResponse.json(
                { success: false, error: "Number of players must be greater than or equal to the number of teams" },
                { status: 400 }
            );
        }

        const balancedTeams = generateBalancedTeams(players, numberOfTeams);
        
        const savedTeams = await Promise.all(
            balancedTeams.map(async (teamPlayers, index) => {
                const existingTeam = existingTeams[index];
                
                if (existingTeam) {
                    const team = await Team.findById(existingTeam._id);
                    team.players = teamPlayers;
                    return await team.save();
                } else {
                    const newTeam = new Team({
                        _id: new mongoose.Types.ObjectId(),
                        id: uuidV4(),
                        name: `Team ${index + 1}`,
                        players: teamPlayers,
                    });
                    return await newTeam.save();
                }
            })
        );

        const matchData = {
            _id: new mongoose.Types.ObjectId(),
            matchId: new mongoose.Types.ObjectId().toHexString(),
            title,
            teamCount: savedTeams.length,
            playerCount: players.length,
            balancedTeams: savedTeams,
        };

        const match = new Generate(matchData);
        await match.save();

        return NextResponse.json(
            {
                success: true,
                data: {
                    match: transformMatch(match.toObject()),
                    teams: savedTeams.map((team) => transformTeam(team.toObject())),
                },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request): Promise<NextResponse> {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const matchId = searchParams.get("matchId");

        if (!matchId) {
            return NextResponse.json(
                { success: false, error: "Match ID is required" },
                { status: 400 }
            );
        }

        const match = await Generate.findOne({ matchId });

        if (!match) {
            return NextResponse.json(
                { success: false, error: "Match not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    match: {
                        matchId: match.matchId,
                        title: match.title,
                        teamCount: match.teamCount,
                        playerCount: match.playerCount
                    },
                    teams: match.balancedTeams.map((team: IServerTeam) => ({
                        id: team._id,
                        name: team.name,
                        players: team?.players,
                    })),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching match details:", error);
        return NextResponse.json(
            { success: false, error: "Error fetching match details: Internal server error" },
            { status: 500 }
        );
    }
}