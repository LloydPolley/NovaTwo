import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { tracks } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { title, releaseId, audio, id, mix, duration, uid, artist, artwork } =
      await req.json();

    const [track] = await db
      .insert(tracks)
      .values({
        id,
        releaseId,
        uid,
        title,
        artist,
        artwork,
        audio,
        mix,
        duration,
      })
      .returning();

    revalidatePath(`/${uid}`);

    return NextResponse.json({ track: track }, { status: 201 });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
