import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || supabaseUrl === "https://your-project-id.supabase.co") {
  console.error("❌ VITE_SUPABASE_URL is not configured properly")
  console.error("Please update your .env.local file with your actual Supabase URL")
}

if (!supabaseAnonKey || supabaseAnonKey === "your-anon-key-here") {
  console.error("❌ VITE_SUPABASE_ANON_KEY is not configured properly")
  console.error("Please update your .env.local file with your actual Supabase anon key")
}

// Create Supabase client with fallback values for development
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
)

export type User = {
  id: string
  email: string
  user_metadata: {
    role?: "admin" | "user"
  }
}

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error("Supabase connection error:", error)
      return false
    }
    console.log("✅ Supabase connection successful")
    return true
  } catch (err) {
    console.error("❌ Failed to connect to Supabase:", err)
    return false
  }
}
