import { v4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const data = await db
      .insert(users)
      .values({ id: v4(), name: "test", email: "test123" })
      .returning();

    return NextResponse.json({ user: "newUser" }, { status: 201 });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
