import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { releases } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { uid, title, artwork, id, artist } = await req.json();

    const [release] = await db
      .insert(releases)
      .values({
        id,
        uid,
        artist,
        title,
        artwork,
      })
      .returning();

    revalidatePath(`/dashboard/${uid}/release`);
    revalidatePath(`/${uid}`);

    return NextResponse.json({ release: release }, { status: 201 });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
