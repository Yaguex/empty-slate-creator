import type { Database } from './types';
export declare const supabase: import("@supabase/supabase-js").SupabaseClient<Database, "public", {
    Tables: {
        portfolios: {
            Row: {
                created_at: string;
                id: string;
                name: string;
                updated_at: string;
                user_id: string;
            };
            Insert: {
                created_at?: string;
                id?: string;
                name?: string;
                updated_at?: string;
                user_id: string;
            };
            Update: {
                created_at?: string;
                id?: string;
                name?: string;
                updated_at?: string;
                user_id?: string;
            };
            Relationships: [{
                foreignKeyName: "portfolios_user_id_fkey";
                columns: ["user_id"];
                isOneToOne: false;
                referencedRelation: "profiles";
                referencedColumns: ["id"];
            }];
        };
        profiles: {
            Row: {
                created_at: string;
                email: string | null;
                id: string;
            };
            Insert: {
                created_at?: string;
                email?: string | null;
                id: string;
            };
            Update: {
                created_at?: string;
                email?: string | null;
                id?: string;
            };
            Relationships: [];
        };
    };
    Views: { [_ in never]: never; };
    Functions: { [_ in never]: never; };
    Enums: { [_ in never]: never; };
    CompositeTypes: { [_ in never]: never; };
}>;
