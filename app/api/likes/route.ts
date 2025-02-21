import { v4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { likes } from "@/db/schema";

export async function POST(req: Request) {
  try {
    console.log("post like");
    const data = await req.json();
    console.log("data", data);
    const a = await db
      .insert(likes)
      .values({
        id: v4(),
        uid: "TdoZ6leQFIWqYJD5S1yG1uE3y7S2",
        trackId: "5",
      })
      .returning();

    return NextResponse.json({ like: "data" }, { status: 201 });
  } catch (error) {
    console.error("Error inserting like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
