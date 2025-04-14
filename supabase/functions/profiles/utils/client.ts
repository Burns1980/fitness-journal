import "jsr:@std/dotenv/load";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supUrl = Deno.env.get("SUP_URL") ?? "";
const anonKey = Deno.env.get("SUP_ANON_KEY") ?? "";

export const createDenoClient = (req: Request) => {
  return createClient(
    supUrl,
    anonKey,
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    },
  );
};
