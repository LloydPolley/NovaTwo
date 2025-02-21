import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  uid: varchar("uid", { length: 255 }).primaryKey(),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  email: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const likes = pgTable("likes", {
//   id: varchar().primaryKey(),
//   uid: varchar("uid", { length: 255 })
//     .references(() => users.uid, { onDelete: "cascade" })
//     .notNull(),
//   trackId: varchar().notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// export const releases = pgTable("releases", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   artistId: varchar("artist_id", { length: 255 })
//     .references(() => users.uid, { onDelete: "cascade" })
//     .notNull(),
//   releaseDate: timestamp("release_date").defaultNow().notNull(),
// });

// export const tracks = pgTable("tracks", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   artistId: varchar("artist_id", { length: 255 })
//     .references(() => users.uid, { onDelete: "cascade" })
//     .notNull(),
//   releaseId: varchar("release_id", { length: 255 }),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// export const followers = pgTable("followers", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   followerId: varchar("follower_id", { length: 255 })
//     .references(() => users.uid, { onDelete: "cascade" })
//     .notNull(),
//   followingId: varchar("following_id", { length: 255 })
//     .references(() => users.uid, { onDelete: "cascade" })
//     .notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });
