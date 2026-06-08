export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          email: string | null;
          enrolled_courses: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          enrolled_courses?: string[];
        };
        Update: {
          name?: string | null;
          phone?: string | null;
          enrolled_courses?: string[];
        };
      };
      enquiries: {
        Row: {
          id: number;
          name: string;
          email: string;
          phone: string;
          course: string | null;
          message: string | null;
          created_at: string;
          status: 'new' | 'contacted' | 'converted' | 'closed';
        };
        Insert: {
          name: string;
          email: string;
          phone: string;
          course?: string | null;
          message?: string | null;
        };
        Update: {
          status?: 'new' | 'contacted' | 'converted' | 'closed';
        };
      };
    };
  };
}
