import { createClient } from "@/utils/supabase/server";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

// This client ensures that the user is authenticated before running action server code.
export const authAction = createSafeActionClient({
  // Can also be a non async function.
  async middleware() {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    console.log('inside of middleware authAction', user)
    if (!user) {
      throw new Error("Session is not valid!");
    }

    return { user };
  },
});