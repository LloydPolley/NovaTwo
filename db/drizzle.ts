import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { users, releases, tracks, likes, followers } from "./schema";
import {
  followersRelations,
  likesRelations,
  releasesRelations,
  tracksRelations,
  usersRelations,
} from "./relations";

config({ path: ".env" });
export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    users,
    releases,
    tracks,
    likes,
    followers,
    releasesRelations,
    tracksRelations,
    usersRelations,
    likesRelations,
    followersRelations,
  },
});
