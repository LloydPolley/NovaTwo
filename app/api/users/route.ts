import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { uid, artist, email } = await req.json();

    const [user] = await db
      .insert(users)
      .values({
        id: uid,
        artist,
        email,
      })
      .returning();

    return NextResponse.json({ user: user }, { status: 201 });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
