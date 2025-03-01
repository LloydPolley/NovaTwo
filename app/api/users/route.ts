import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    console.log("uid inside", uid);

    const user = await db.query.users.findFirst({
      where: eq(users.id, uid),
    });

    console.log("user", user);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
