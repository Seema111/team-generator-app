import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import Player from "@/database/models/Player";
import { Team } from "@/database/models/Team";
import { Generate } from "@/database/models/Generate";
import { IServerTeam, IServerPlayer, IServerGenerate } from "@/types";
import { generateBalancedTeams } from "@/app/utils/algorithm";
import mongoose from "mongoose";

function transformTeam(team: IServerTeam) {
    return {
        teamId: team._id,
        id: team.id,
        name: team.name,
        players: team.players,
    };
}

function transformMatch(match: IServerGenerate) {
    return {
        matchId: match.matchId,
        id: match.matchId,
        title: match.title,
        balancedTeams: match.balancedTeams.map((team) => team._id),
    };
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await dbConnect();

        const { title } = await request.json();
        console.log("Received title:", title);

        if (!title || typeof title !== "string" || title.trim() === "") {
            return NextResponse.json(
                { success: false, error: "Title must be a non-empty string" },
                { status: 400 }
            );
        }

        const players: IServerPlayer[] = await Player.find({});
        console.log("Players found:", players.length);

        const numberOfTeams = await Team.countDocuments({});
        console.log("Number of teams:", numberOfTeams);

        if (numberOfTeams < 2 && players.length < 2) {
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
        console.log("Balanced teams generated:", balancedTeams);

        const savedTeams = await Promise.all(
            balancedTeams.map(async (teamPlayers, index) => {
                const team = new Team({
                    teamId: new mongoose.Types.ObjectId().toHexString(),
                    id: `team${index + 1}-id`,
                    name: `Team ${index + 1}`,
                    players: teamPlayers.map((player) => new mongoose.Types.ObjectId(player._id)),
                });
                return await team.save();
            })
        );
        console.log("Teams saved:", savedTeams);

        const matchData: IServerGenerate = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            matchId: new mongoose.Types.ObjectId().toHexString(),
            title,
            balancedTeams: savedTeams.map((team: IServerTeam) => ({
                teamId: team._id,
                id: team.id,
                name: team.name,
                players: team.players,
                _id: team._id,
            })),
        };

        const match = new Generate(matchData);
        await match.save();
        console.log("Match saved:", match);

        return NextResponse.json(
            {
                success: true,
                data: {
                    match: transformMatch(match.toObject() as IServerGenerate),
                    teams: savedTeams.map((team) => transformTeam(team.toObject() as IServerTeam)),
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error generating teams:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
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
                        id: match.matchId,
                        title: match.title,
                        balancedTeams: match.balancedTeams.map((team: IServerTeam) => team._id),
                    },
                    teams: match.balancedTeams.map((team: IServerTeam) => ({
                        teamId: team._id,
                        id: team.id,
                        name: team.name,
                        players: team.players,
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