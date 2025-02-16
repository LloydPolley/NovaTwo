import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const data = await db
      .insert(users)
      .values({ id: 123, name: "test", email: "test123" })
      .returning();

    console.log("hello");

    return NextResponse.json({ user: "newUser" }, { status: 201 });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
