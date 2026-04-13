export interface Project {
  id: string;
  title: string;
  title_en: string | null;
  description: string;
  description_en: string | null;
  cover_url: string | null;
  demo_url: string | null;
  repo_url: string | null;
  tech_stack: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteConfig {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at" | "updated_at">>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Omit<SiteConfig, "id" | "updated_at">;
        Update: Partial<Omit<SiteConfig, "id" | "updated_at">>;
      };
    };
  };
}
