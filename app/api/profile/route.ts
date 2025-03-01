import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  try {
    const { id, artwork } = await req.json();

    await db.update(users).set({ artwork }).where(eq(users.id, id));

    return NextResponse.json({ message: "Photo updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 }
    );
  }
}
