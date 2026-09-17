export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Role = "admin" | "viewer"

export type BookingStatus = "pending" | "contacted" | "confirmed" | "completed" | "cancelled"

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
<<<<<<< HEAD
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [{ foreignKeyName: "profiles_id_fkey"; columns: ["id"]; isOneToOne: true; referencedRelation: "users"; referencedColumns: ["id"] }]
      }
      user_roles: {
        Row: {
          user_id: string
          role: Role
          created_at: string
        }
        Insert: {
          user_id: string
          role?: Role
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: Role
          created_at?: string
        }
        Relationships: [{ foreignKeyName: "user_roles_user_id_fkey"; columns: ["user_id"]; isOneToOne: true; referencedRelation: "users"; referencedColumns: ["id"] }]
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          short_description: string | null
          full_description: string | null
          category: string | null
          client_name: string | null
          project_date: string | null
          location: string | null
          services_provided: string[]
          cover_image: string | null
          video_url: string | null
          featured: boolean
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          short_description?: string | null
          full_description?: string | null
          category?: string | null
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          services_provided?: string[]
          cover_image?: string | null
          video_url?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          short_description?: string | null
          full_description?: string | null
          category?: string | null
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          services_provided?: string[]
          cover_image?: string | null
          video_url?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          id: string
          project_id: string
          type: "image" | "video" | "audio"
          url: string
          alt: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          type?: "image" | "video" | "audio"
          url: string
          alt?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          type?: "image" | "video" | "audio"
          url?: string
          alt?: string | null
          sort_order?: number
          created_at?: string
        }
        Relationships: [{ foreignKeyName: "project_media_project_id_fkey"; columns: ["project_id"]; isOneToOne: false; referencedRelation: "projects"; referencedColumns: ["id"] }]
      }
      gallery_items: {
        Row: {
          id: string
          title: string | null
          caption: string | null
          image_url: string
          category: string | null
          featured: boolean
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          caption?: string | null
          image_url: string
          category?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          caption?: string | null
          image_url?: string
          category?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
=======
      booking_requests: {
        Row: {
          audience_size: string | null
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          event_date: string | null
          event_location: string | null
          event_type: string | null
          full_name: string
          id: string
          message: string | null
          phone: string | null
          requirements: string | null
          service: string
          status: string
          updated_at: string
        }
        Insert: {
          audience_size?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          event_date?: string | null
          event_location?: string | null
          event_type?: string | null
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          requirements?: string | null
          service: string
          status?: string
          updated_at?: string
        }
        Update: {
          audience_size?: string | null
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          event_date?: string | null
          event_location?: string | null
          event_type?: string | null
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          requirements?: string | null
          service?: string
          status?: string
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
<<<<<<< HEAD
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      booking_requests: {
        Row: {
          id: string
          full_name: string
          company: string | null
          email: string
          phone: string
          service: string | null
          event_type: string | null
          event_date: string | null
          location: string | null
          audience: number | null
          budget: string | null
          requirements: string | null
          message: string | null
          status: BookingStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          company?: string | null
          email: string
          phone: string
          service?: string | null
          event_type?: string | null
          event_date?: string | null
          location?: string | null
          audience?: number | null
          budget?: string | null
          requirements?: string | null
          message?: string | null
          status?: BookingStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          company?: string | null
          email?: string
          phone?: string
          service?: string | null
          event_type?: string | null
          event_date?: string | null
          location?: string | null
          audience?: number | null
          budget?: string | null
          requirements?: string | null
          message?: string | null
          status?: BookingStatus
          created_at?: string
          updated_at?: string
=======
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          category: string
          created_at: string
          description: string | null
          featured: boolean
          id: string
          image_url: string
          published: boolean
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url: string
          published?: boolean
          title?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string
          published?: boolean
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          project_id: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          project_id: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          client_name: string | null
          cover_image_url: string | null
          created_at: string
          featured: boolean
          full_description: string
          id: string
          location: string | null
          project_date: string | null
          published: boolean
          services: string[]
          short_description: string
          slug: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string
          client_name?: string | null
          cover_image_url?: string | null
          created_at?: string
          featured?: boolean
          full_description?: string
          id?: string
          location?: string | null
          project_date?: string | null
          published?: boolean
          services?: string[]
          short_description?: string
          slug: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          client_name?: string | null
          cover_image_url?: string | null
          created_at?: string
          featured?: boolean
          full_description?: string
          id?: string
          location?: string | null
          project_date?: string | null
          published?: boolean
          services?: string[]
          short_description?: string
          slug?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
<<<<<<< HEAD
      is_admin: {
        Args: Record<PropertyKey, never>
=======
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const