export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          adults: number
          amount: number
          booking_number: string
          check_in: string
          check_out: string
          children: number
          created_at: string
          guest_email: string | null
          guest_name: string
          guest_phone: string | null
          id: string
          notes: string | null
          payment_status: string
          room_id: string | null
          special_requests: string | null
          status: string
          updated_at: string
        }
        Insert: {
          adults?: number
          amount: number
          booking_number: string
          check_in: string
          check_out: string
          children?: number
          created_at?: string
          guest_email?: string | null
          guest_name: string
          guest_phone?: string | null
          id?: string
          notes?: string | null
          payment_status?: string
          room_id?: string | null
          special_requests?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          adults?: number
          amount?: number
          booking_number?: string
          check_in?: string
          check_out?: string
          children?: number
          created_at?: string
          guest_email?: string | null
          guest_name?: string
          guest_phone?: string | null
          id?: string
          notes?: string | null
          payment_status?: string
          room_id?: string | null
          special_requests?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaning_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          date: string
          id: string
          notes: string | null
          room_id: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          room_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          room_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_tasks_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          active: boolean | null
          body: string
          created_at: string
          id: string
          name: string
          subject: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          active?: boolean | null
          body: string
          created_at?: string
          id?: string
          name: string
          subject: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          active?: boolean | null
          body?: string
          created_at?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          id: string
          notes: string | null
          owner_id: string | null
          payment_method: string
          property_id: string | null
          receipt_url: string | null
          status: string
          updated_at: string
          vendor: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date: string
          description: string
          id?: string
          notes?: string | null
          owner_id?: string | null
          payment_method: string
          property_id?: string | null
          receipt_url?: string | null
          status?: string
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          notes?: string | null
          owner_id?: string | null
          payment_method?: string
          property_id?: string | null
          receipt_url?: string | null
          status?: string
          updated_at?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      general_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_group: string
          setting_key: string
          setting_type: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_group?: string
          setting_key: string
          setting_type?: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_group?: string
          setting_key?: string
          setting_type?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      owners: {
        Row: {
          created_at: string
          email: string
          id: string
          joined_date: string | null
          name: string
          occupancy: number | null
          payment_info: Json | null
          phone: string | null
          properties: number | null
          revenue: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          joined_date?: string | null
          name: string
          occupancy?: number | null
          payment_info?: Json | null
          phone?: string | null
          properties?: number | null
          revenue?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          joined_date?: string | null
          name?: string
          occupancy?: number | null
          payment_info?: Json | null
          phone?: string | null
          properties?: number | null
          revenue?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          active: boolean | null
          address: string
          city: string
          country: string
          created_at: string
          description: string | null
          email: string | null
          id: string
          name: string
          on_booking_sites: boolean | null
          phone: string | null
          state: string
          timezone: string | null
          total_rooms: number | null
          updated_at: string
          zip_code: string
        }
        Insert: {
          active?: boolean | null
          address: string
          city: string
          country?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          name: string
          on_booking_sites?: boolean | null
          phone?: string | null
          state: string
          timezone?: string | null
          total_rooms?: number | null
          updated_at?: string
          zip_code: string
        }
        Update: {
          active?: boolean | null
          address?: string
          city?: string
          country?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          name?: string
          on_booking_sites?: boolean | null
          phone?: string | null
          state?: string
          timezone?: string | null
          total_rooms?: number | null
          updated_at?: string
          zip_code?: string
        }
        Relationships: []
      }
      property_ownership: {
        Row: {
          commission_rate: number
          contract_end_date: string | null
          contract_start_date: string
          created_at: string
          id: string
          owner_id: string
          room_id: string
          updated_at: string
        }
        Insert: {
          commission_rate?: number
          contract_end_date?: string | null
          contract_start_date: string
          created_at?: string
          id?: string
          owner_id: string
          room_id: string
          updated_at?: string
        }
        Update: {
          commission_rate?: number
          contract_end_date?: string | null
          contract_start_date?: string
          created_at?: string
          id?: string
          owner_id?: string
          room_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_ownership_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_ownership_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_status: {
        Row: {
          created_at: string
          id: string
          last_cleaned: string | null
          next_cleaning: string | null
          notes: string | null
          room_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_cleaned?: string | null
          next_cleaning?: string | null
          notes?: string | null
          room_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_cleaned?: string | null
          next_cleaning?: string | null
          notes?: string | null
          room_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_status_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_types: {
        Row: {
          amenities: string[] | null
          base_rate: number
          capacity: number
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          base_rate: number
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          base_rate?: number
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          amenities: string[] | null
          capacity: number
          created_at: string
          description: string | null
          features: Json | null
          floor: string
          id: string
          last_cleaned: string | null
          next_check_in: string | null
          number: string
          property_id: string | null
          rate: number
          room_type_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          capacity?: number
          created_at?: string
          description?: string | null
          features?: Json | null
          floor: string
          id?: string
          last_cleaned?: string | null
          next_check_in?: string | null
          number: string
          property_id?: string | null
          rate: number
          room_type_id?: string | null
          status: string
          type: string
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          capacity?: number
          created_at?: string
          description?: string | null
          features?: Json | null
          floor?: string
          id?: string
          last_cleaned?: string | null
          next_check_in?: string | null
          number?: string
          property_id?: string | null
          rate?: number
          room_type_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          last_active: string | null
          name: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          last_active?: string | null
          name: string
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          last_active?: string | null
          name?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          permissions: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          permissions?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          last_active: string | null
          name: string
          role: string | null
          role_name: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          last_active?: string | null
          name: string
          role?: string | null
          role_name?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          last_active?: string | null
          name?: string
          role?: string | null
          role_name?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
