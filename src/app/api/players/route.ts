import { NextResponse } from "next/server";// Ensure correct path
import Player from "@/database/models/Player"; // Ensure correct path
import { validatePlayerInput } from "@/app/utils/validation";
import { v4 as uuidV4 } from "uuid";
import { IServerPlayer } from "@/types";
import dbConnect from "@/database/dbConnect";

function transformPlayer(player: IServerPlayer) {
    return {
        playerId: player._id.toString(),
        id: player.id,
        name: player.name,
        skill: player.skill,
    };
}

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();
        const players = await Player.find({}).select("_id id name skill").lean();
        const transformedPlayers = players.map((player) => transformPlayer(player as IServerPlayer));

        return NextResponse.json({ success: true, data: transformedPlayers }, { status: 200 });
    } catch (error) {
        console.error("Error fetching players:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch players" }, { status: 500 });
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await dbConnect();
        const { name, skill } = await request.json();

        const validation = validatePlayerInput(name, skill);
        if (!validation.isValid) {
            return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
        }

        const id = uuidV4();
        const newPlayer = new Player({ id, name, skill });
        const savedPlayer = await newPlayer.save();

        return NextResponse.json({ success: true, data: transformPlayer(savedPlayer.toObject() as IServerPlayer) }, { status: 201 });
    } catch (error) {
        console.error("Error saving player:", error);
        return NextResponse.json({ success: false, error: "Failed to save player" }, { status: 500 });
    }
}


export async function PUT(request: Request): Promise<NextResponse> {
    try {
        await dbConnect();
        const { id, name, skill } = await request.json();

        if (!id || !name || skill === undefined) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const updatedPlayer = await Player.findOneAndUpdate(
            { _id: id },
            { name, skill },
            { new: true }
        ).select("_id id name skill");

        if (!updatedPlayer) {
            return NextResponse.json({ success: false, error: "Player not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: transformPlayer(updatedPlayer.toObject() as IServerPlayer) }, { status: 200 });
    } catch (error) {
        console.error("Error updating player:", error);
        return NextResponse.json({ success: false, error: "Failed to update player" }, { status: 500 });
    }
}

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "Player ID is required" }, { status: 400 });
        }

        const deletedPlayer = await Player.findByIdAndDelete(id).select("_id id name skill");

        if (!deletedPlayer) {
            return NextResponse.json({ success: false, error: "Player not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Player deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting player:", error);
        return NextResponse.json({ success: false, error: "Failed to delete player" }, { status: 500 });
    }
}

