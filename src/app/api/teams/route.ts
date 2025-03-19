import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { Team } from "@/database/models/Team";
import { IServerTeam } from "@/types";

function transformTeam(team: IServerTeam) {
  return {
    teamId: team._id,
    id: team.id,
    name: team.name,
  };
}

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();

    const teams = await Team.find({}).select("_id id name").lean();
    const transformedTeams = teams.map((eachTeam) => transformTeam((eachTeam as IServerTeam)));

    return NextResponse.json({ success: true, data: transformedTeams }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Team name is required" },
        { status: 400 }
      );
    }

    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return NextResponse.json(
        { success: false, error: "Team name already exists" },
        { status: 400 }
      );
    }

    const newTeam = new Team({ name });
    const savedTeam = await newTeam.save();

    const teamData = transformTeam(savedTeam.toObject());

    return NextResponse.json(
      { success: true, data: teamData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving team:", error);

    // Handle duplicate key error
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Team name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to save team" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const { id, name } = await request.json();

    if (!id || !name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedTeam = await Team.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true }
    ).select("_id id name");

    if (!updatedTeam) {
      return NextResponse.json(
        { success: false, error: "Team not found" },
        { status: 404 }
      );
    }

    const teamData = transformTeam(updatedTeam.toObject());

    return NextResponse.json(
      { success: true, data: teamData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Team ID is required" },
        { status: 400 }
      );
    }

    const deletedTeam = await Team.findByIdAndDelete(id).select("_id id name");

    if (!deletedTeam) {
      return NextResponse.json({ success: false, error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Team deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json({ success: false, error: "Failed to delete team" }, { status: 500 });
  }
}
