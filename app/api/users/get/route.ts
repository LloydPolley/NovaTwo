import { NextResponse } from "next/server";
import { adminDb } from "@/utils/firebaseAdmin";

export async function GET(req: Request) {
  // const { searchParams } = new URL(req.url);
  // const userId = searchParams.get("id");

  // if (!userId) {
  //   return NextResponse.json(
  //     { success: false, error: "Missing user ID" },
  //     { status: 400 }
  //   );
  // }

  try {
    const docRef = adminDb.collection("users").doc();
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: docSnap.data() });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
