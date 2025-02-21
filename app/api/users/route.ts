import { v4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("post account");

    const [user] = await db
      .insert(users)
      .values({
        uid: data?.uid,
        displayName: data?.displayName,
        email: data.email,
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
