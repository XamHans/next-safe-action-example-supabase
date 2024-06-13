"use client";

import { signInAction, signUpAction } from '@/app/actions/auth';
import React, { useState } from 'react';

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSignUp) {
            const result = await signUpAction({ email, password });
            if (result.validationErrors) {
                console.log('validation errors', result.validationErrors)
            }
            if (result.serverError) {
                console.log('bad server error', result.serverError)
            }
            if (result.data?.failure) {
                setMessage(result.data.failure.message);
            }
            if (result.data?.success) {
                setMessage("Sign up successful");
            }
        }
        else {
            // sign in logic
            const result = await signInAction({ email, password });
            if (result.data?.failure) {
                console.log('signInAction error ', result.data.failure)
            }
            console.log(result.data)
            if (result.data?.success) {
                setMessage("Sign in successful");
            }
        }


    };

    return (
        <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            onSubmit={handleSubmit}
        >
            <label className="text-md" htmlFor="email">
                Email
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-md" htmlFor="password">
                Password
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {message}
                </p>
            )}

            <button type="submit" className="rounded-md px-4 py-2 bg-foreground text-background">
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-2 text-blue-500 underline"
            >
                {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </button>
        </form>
    );
};

export default AuthForm;
