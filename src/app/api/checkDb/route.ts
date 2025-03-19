import { NextResponse } from "next/server";
import { checkDbConnection } from "@/database/checkDbConnect";

type DbConnectionResponse = {
  success: boolean;
  message: string;
};

export async function GET(): Promise<NextResponse<DbConnectionResponse>> {
  try {
    const isConnected = await checkDbConnection();

    if (isConnected) {
      return NextResponse.json(
        { success: true, message: "Database is connected." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Database connection failed." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error checking database connection:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(): Promise<NextResponse<DbConnectionResponse>> {
  return NextResponse.json(
    { success: false, message: "Invalid request method." },
    { status: 400 }
  );
}