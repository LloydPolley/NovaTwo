import { v4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { likes } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { userId, trackId } = await req.json();

    const data = await db
      .insert(likes)
      .values({ id: v4(), userId, trackId })
      .returning();

    return NextResponse.json({ like: "newLike" }, { status: 201 });
  } catch (error) {
    console.error("Error inserting like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
