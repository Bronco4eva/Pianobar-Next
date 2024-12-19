export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      requests: {
        Row: {
          id: string
          song_title: string
          requester_name: string
          created_at: string
          status: 'pending' | 'accepted' | 'completed' | 'rejected'
        }
      }
    }
  }
} 