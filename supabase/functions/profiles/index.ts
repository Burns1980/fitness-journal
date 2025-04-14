import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createDenoClient } from "./utils/client.ts";

Deno.serve(async (req) => {
  const supabase = createDenoClient(req);
  console.log("req", req);
  // const { data, error } = await supabase.from("user_profile").select("*");

  const { data, error } = await supabase
    .rpc("get_journal_entries_with_details");
  if (error) console.error(error);
  else console.log(data);

  // const { data, error } = await supabase.auth.getUser();
  const { userId } = await req.json();

  // console.log(req);
  // console.log("data", data);
  console.log("error", error);

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});
