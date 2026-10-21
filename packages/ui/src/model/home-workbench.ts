import type { Conversation, Project, SpaceEntry } from '@baocut/protocol';
import { buildSidebar } from './sidebar.ts';
import { recentVideos } from './space.ts';

/** Product design §3.2.1: reuse the sidebar's project ordering and Space's playable video filter. */
export function recentProjects(projects: readonly Project[], conversations: readonly Conversation[], entries: readonly SpaceEntry[]) {
  return buildSidebar(projects, conversations).projects.slice(0, 3).map((row) => {
    const videos = recentVideos(entries, [row.project.id], entries.length);
    return { ...row, video: videos[0] ?? null, videoCount: videos.length, conversation: row.conversations[0] ?? null };
  });
}
