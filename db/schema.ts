import {
  pgTable,
  varchar,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  artist: varchar("artist", { length: 255 }).notNull(),
  artwork: varchar("artwork", { length: 500 }),
  email: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const releases = pgTable("releases", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  artist: varchar("artist", { length: 255 }).notNull(),
  artwork: varchar("artwork", { length: 255 }).notNull(),
  uid: varchar("uid", { length: 255 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  releaseDate: timestamp("release_date").defaultNow().notNull(),
});

export const tracks = pgTable("tracks", {
  id: varchar("id", { length: 500 }).primaryKey(),
  releaseId: varchar("release_id", { length: 500 })
    .references(() => releases.id, { onDelete: "cascade" })
    .notNull(),
  uid: varchar("uid", { length: 500 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  artist: varchar("artist", { length: 500 }).notNull(),
  artwork: varchar("artwork", { length: 500 }).notNull(),
  audio: varchar("audio", { length: 500 }).notNull(),
  mix: boolean("mix").notNull(),
  duration: varchar("duration").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likes = pgTable(
  "likes",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    uid: varchar("uid", { length: 255 })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    trackId: varchar("track_id", { length: 255 })
      .references(() => tracks.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueLike: uniqueIndex("unique_like").on(table.uid, table.trackId),
  })
);

export const followers = pgTable("followers", {
  id: varchar("id", { length: 255 }).primaryKey(),
  uid: varchar("uid", { length: 255 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  followingId: varchar("following_id", { length: 255 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
