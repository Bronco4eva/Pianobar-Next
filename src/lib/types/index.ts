import type { Database } from './database';

export type Show = Database['public']['Tables']['shows']['Row'];
export type SongRequest = Database['public']['Tables']['song_requests']['Row'];
export type PianistProfile = Database['public']['Tables']['pianist_profiles']['Row'];
export type SongHistory = Database['public']['Tables']['song_history']['Row'];
export type ShowStats = Database['public']['Tables']['show_stats']['Row'];

export type RequestStatus = 'pending' | 'claimed' | 'completed';

export interface ShowWithStats extends Show {
  stats?: ShowStats;
}

export interface SongWithHistory extends SongRequest {
  history?: SongHistory;
} 