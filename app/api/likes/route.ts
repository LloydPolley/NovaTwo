import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { id, uid, trackId } = await req.json();
    const [like] = await db
      .insert(likes)
      .values({
        id,
        uid,
        trackId,
      })
      .returning();

    return NextResponse.json({ like }, { status: 201 });
  } catch (error) {
    console.error("Error inserting like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { trackId, uid } = await req.json();
    if (!trackId || !uid) {
      return NextResponse.json(
        { error: "Missing trackId or uid" },
        { status: 400 }
      );
    }

    const data = await db
      .delete(likes)
      .where(and(eq(likes.trackId, trackId), eq(likes.uid, uid)))
      .returning();

    return NextResponse.json({ like: data }, { status: 200 });
  } catch (error) {
    console.error("Error deleting like:", error);
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

    const userLikes = await db.query.likes.findMany({
      where: eq(likes.uid, uid),
      with: {
        tracks: true,
      },
    });

    const tracksOnly = userLikes.map((like) => like.tracks);

    return NextResponse.json({ likes: tracksOnly }, { status: 201 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
