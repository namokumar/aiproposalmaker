
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import config from './config.js';


const isValidUrl = (url) => {
    try { return Boolean(new URL(url)); } catch (e) { return false; }
};

let supabase;

if (isValidUrl(config.supabaseUrl) && config.supabaseKey !== 'INSERT_SUPABASE_ANON_KEY_HERE') {
    supabase = createClient(config.supabaseUrl, config.supabaseKey);
} else {
    // Mock client to prevent crash on landing page
    console.warn('Supabase credentials missing. Auth will not work.');
    supabase = {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            signInWithPassword: () => Promise.reject(new Error('Supabase not configured. Check config.js')),
            signUp: () => Promise.reject(new Error('Supabase not configured. Check config.js')),
            signOut: () => Promise.resolve()
        }
    };
}

export default supabase;
