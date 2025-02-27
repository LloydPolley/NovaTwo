import { relations } from "drizzle-orm";
import { releases, users, tracks, likes } from "./schema";

export const releasesRelations = relations(releases, ({ one, many }) => ({
  user: one(users, { fields: [releases.uid], references: [users.id] }),
  tracks: many(tracks),
}));

export const tracksRelations = relations(tracks, ({ one }) => ({
  release: one(releases, {
    fields: [tracks.releaseId],
    references: [releases.id],
  }),
  user: one(users, { fields: [tracks.uid], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  releases: many(releases),
  tracks: many(tracks),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  tracks: one(tracks, {
    fields: [likes.trackId],
    references: [tracks.id],
  }),
}));
