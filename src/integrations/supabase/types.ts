export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          category: string
          content_de: string
          content_en: string
          content_es: string
          content_fr: string
          content_it: string
          created_at: string
          featured_image: string | null
          id: string
          is_published: boolean
          meta_description_de: string | null
          meta_description_en: string | null
          meta_description_es: string | null
          meta_description_fr: string | null
          meta_description_it: string | null
          published_at: string | null
          slug_de: string
          slug_en: string
          slug_es: string
          slug_fr: string
          slug_it: string
          title_de: string
          title_en: string
          title_es: string
          title_fr: string
          title_it: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category?: string
          content_de?: string
          content_en?: string
          content_es?: string
          content_fr?: string
          content_it?: string
          created_at?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean
          meta_description_de?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_description_fr?: string | null
          meta_description_it?: string | null
          published_at?: string | null
          slug_de?: string
          slug_en?: string
          slug_es?: string
          slug_fr?: string
          slug_it?: string
          title_de?: string
          title_en?: string
          title_es?: string
          title_fr?: string
          title_it?: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string
          content_de?: string
          content_en?: string
          content_es?: string
          content_fr?: string
          content_it?: string
          created_at?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean
          meta_description_de?: string | null
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_description_fr?: string | null
          meta_description_it?: string | null
          published_at?: string | null
          slug_de?: string
          slug_en?: string
          slug_es?: string
          slug_fr?: string
          slug_it?: string
          title_de?: string
          title_en?: string
          title_es?: string
          title_fr?: string
          title_it?: string
          updated_at?: string
        }
        Relationships: []
      }
      datasheet_requests: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          model_id: string | null
          phone: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          model_id?: string | null
          phone: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          model_id?: string | null
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "datasheet_requests_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      interventions: {
        Row: {
          application_type: string | null
          client_name: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          location: string | null
          model_used: string | null
          problem: string | null
          sector: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          updated_by: string | null
          video_url: string | null
        }
        Insert: {
          application_type?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          location?: string | null
          model_used?: string | null
          problem?: string | null
          sector?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
          video_url?: string | null
        }
        Update: {
          application_type?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          location?: string | null
          model_used?: string | null
          problem?: string | null
          sector?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interventions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interventions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          ambiti_ideali: Json | null
          applicazioni_compatibili: Json | null
          created_at: string
          created_by: string | null
          datasheet_url: Json | null
          description: string | null
          diameter: string | null
          id: string
          model_id: string
          name: string
          photos: Json | null
          settori_utilizzo: Json | null
          specifications: Json | null
          tagline: string | null
          updated_at: string
          updated_by: string | null
          videos: Json | null
        }
        Insert: {
          ambiti_ideali?: Json | null
          applicazioni_compatibili?: Json | null
          created_at?: string
          created_by?: string | null
          datasheet_url?: Json | null
          description?: string | null
          diameter?: string | null
          id?: string
          model_id: string
          name: string
          photos?: Json | null
          settori_utilizzo?: Json | null
          specifications?: Json | null
          tagline?: string | null
          updated_at?: string
          updated_by?: string | null
          videos?: Json | null
        }
        Update: {
          ambiti_ideali?: Json | null
          applicazioni_compatibili?: Json | null
          created_at?: string
          created_by?: string | null
          datasheet_url?: Json | null
          description?: string | null
          diameter?: string | null
          id?: string
          model_id?: string
          name?: string
          photos?: Json | null
          settori_utilizzo?: Json | null
          specifications?: Json | null
          tagline?: string | null
          updated_at?: string
          updated_by?: string | null
          videos?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "models_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "models_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_url: string
          id: string
          sort_order: number
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          file_url: string
          id?: string
          sort_order?: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_url?: string
          id?: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_locations: {
        Row: {
          address: string | null
          city: string | null
          country: string
          created_at: string
          description: string | null
          email: string | null
          id: string
          is_active: boolean
          latitude: number
          longitude: number
          name: string
          phone: string | null
          sort_order: number
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          latitude: number
          longitude: number
          name: string
          phone?: string | null
          sort_order?: number
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          latitude?: number
          longitude?: number
          name?: string
          phone?: string | null
          sort_order?: number
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      partner_price_lists: {
        Row: {
          created_at: string
          description: string | null
          file_url: string
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_url: string
          id?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_url?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      partner_pricing: {
        Row: {
          created_at: string
          custom_price_cents: number | null
          discount_percent: number
          id: string
          model_id: string | null
          notes: string | null
          partner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_price_cents?: number | null
          discount_percent?: number
          id?: string
          model_id?: string | null
          notes?: string | null
          partner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_price_cents?: number | null
          discount_percent?: number
          id?: string
          model_id?: string | null
          notes?: string | null
          partner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_pricing_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_pricing_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shop_orders: {
        Row: {
          created_at: string
          currency: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          items: Json
          shipping_address: Json | null
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          total_cents: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          items?: Json
          shipping_address?: Json | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          total_cents?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          items?: Json
          shipping_address?: Json | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          total_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      shop_products: {
        Row: {
          category: string
          created_at: string
          currency: string
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean
          name: string
          price_cents: number
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean
          name: string
          price_cents: number
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean
          name?: string
          price_cents?: number
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_content_editor: { Args: never; Returns: boolean }
      is_contributor: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "contributor" | "partner"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "contributor", "partner"],
    },
  },
} as const
