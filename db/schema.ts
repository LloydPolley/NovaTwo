import {
  pgTable,
  bigint,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const releases = pgTable("releases", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  artistId: bigint("artist_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  releaseDate: timestamp("release_date").defaultNow().notNull(),
});

export const tracks = pgTable("tracks", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  artistId: bigint("artist_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  releaseId: bigint("release_id", { mode: "number" }).references(
    () => releases.id,
    { onDelete: "cascade" }
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likes = pgTable("likes", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  userId: bigint("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  trackId: bigint("track_id", { mode: "number" })
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const followers = pgTable("followers", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  followerId: bigint("follower_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  followingId: bigint("following_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
