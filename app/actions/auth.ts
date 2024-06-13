"use server"; // don't forget to add this!

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { action, authAction } from "./safe-client";


const supabase = createClient();

// This schema is used to validate input from client.
const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});
const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

export const signInAction = action(signInSchema, async ({email, password }) => {
    console.log('inside sever sign in action')

   const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if(error) {
            console.log('signInAcition error ', error)
        return { failure: error };
    }

    // everything is okay user is signed in
    return { success: data };
});

export const signUpAction = action(signUpSchema, async ({email, password }) => {
    console.log('inside sever sign up action')
   const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if(error) {
            console.log('signUpAction error ', error)
        return { failure: error };
    }
                console.log('signUpAction success ', data)

    // everything is okay user is signed in
    return { success: data };
});

const schema = z.object({
  text: z.string(),
});


export const getSensitiveDataAction = authAction(schema, async ({ text }, { user }) => {
    console.log('inside sever getSensitiveDataAction for user ', user);
    return { success: 'sensitive data' };
});
