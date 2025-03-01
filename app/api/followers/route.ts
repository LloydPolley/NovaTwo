import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { followers, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { id, uid, followingId } = await req.json();
    const [follower] = await db
      .insert(followers)
      .values({
        id,
        uid,
        followingId,
      })
      .returning();

    return NextResponse.json({ follower }, { status: 201 });
  } catch (error) {
    console.error("Error inserting like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: Request) {
//   try {
//     const { trackId, uid } = await req.json();
//     if (!trackId || !uid) {
//       return NextResponse.json(
//         { error: "Missing trackId or uid" },
//         { status: 400 }
//       );
//     }

//     const data = await db
//       .delete(likes)
//       .where(and(eq(likes.trackId, trackId), eq(likes.uid, uid)))
//       .returning();

//     return NextResponse.json({ like: data }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting like:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    const followersData = await db
      .select({
        id: followers.id,
        uid: followers.uid,
        artist: users.artist,
        artwork: users.artwork,
        createdAt: followers.createdAt,
      })
      .from(followers)
      .where(eq(followers.uid, uid))
      .innerJoin(users, eq(followers.followingId, users.id));

    return NextResponse.json({ followers: followersData }, { status: 201 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
