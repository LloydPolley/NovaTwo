import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request) {
  try {
    const {
      id,
      artwork,
      soundcloud,
      instagram,
      spotify,
    }: {
      id: string;
      artwork?: string;
      soundcloud?: string;
      instagram?: string;
      spotify?: string;
    } = await req.json();

    console.log("artwork", artwork);

    await db
      .update(users)
      .set({ artwork, soundcloud, instagram, spotify } as Partial<
        typeof users.$inferSelect
      >)
      .where(eq(users.id, id));

    revalidatePath(`/discover`, "layout");
    revalidatePath(`/discover/${id}`);
    revalidatePath(`/dashboard`, "layout");
    revalidatePath(`/dashboard`);

    return NextResponse.json({ message: "Photo updated successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
