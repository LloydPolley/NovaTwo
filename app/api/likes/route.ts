import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { users, tracks, releases } from "@/db/schema";

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

    const userLikes = await db
      .select({
        id: tracks.id,
        title: tracks.title,
        audio: tracks.audio,
        uid: tracks.uid,
        artist: users.artist,
        artwork: releases.artwork,
      })
      .from(likes)
      .leftJoin(tracks, eq(likes.trackId, tracks.id))
      .leftJoin(users, eq(tracks.uid, users.id))
      .leftJoin(releases, eq(tracks.releaseId, releases.id))
      .where(eq(likes.uid, uid));

    return NextResponse.json({ likes: userLikes }, { status: 201 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
