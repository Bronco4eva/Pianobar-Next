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
      shows: {
        Row: {
          id: string
          pianist_id: string
          venue: string
          start_time: string
          end_time: string | null
          status: 'active' | 'completed' | 'cancelled'
          created_at: string
        }
      }
      song_requests: {
        Row: {
          id: string
          show_id: string
          song_title: string
          artist: string | null
          requested_by: string
          dedication: string | null
          tip_amount: number
          created_at: string
          claimed_at: string | null
          completed_at: string | null
          claimed_by: string | null
          status: 'pending' | 'claimed' | 'completed'
          queue_position: number | null
        }
      }
      pianist_profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string
          bio: string | null
          profile_image_url: string | null
          specialties: string[] | null
          created_at: string
          updated_at: string
        }
      }
      song_history: {
        Row: {
          id: string
          request_id: string
          played_at: string
          duration: number | null
          notes: string | null
        }
      }
      show_stats: {
        Row: {
          id: string
          show_id: string
          total_requests: number
          completed_requests: number
          total_tips: number
          peak_queue_length: number
          average_wait_time: number
        }
      }
    }
  }
} 