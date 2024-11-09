import { PUBLIC_IS_PRODUCTION } from '$env/static/public';
import { supabase } from '$lib/utils/SupabaseClient';
import { type Session, type AuthChangeEvent, type User } from '@supabase/supabase-js';
import Cookies from 'js-cookie';

export default class AuthService {
	async signIn(email: string, password: string): Promise<{ success: boolean }> {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) return { success: false };

		if (data.session) {
			Cookies.set('sb_session', JSON.stringify(data.session.access_token), {
				secure: PUBLIC_IS_PRODUCTION === 'true',
				expires: data.session.expires_in / 86400,
				sameSite: 'Lax'
			});
		}

		return { success: true };
	}

	async signOut(): Promise<void> {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		Cookies.remove('sb_session');
	}

	async getUser(): Promise<User | null> {
		const { data, error } = await supabase.auth.getUser();
		if (error) throw error;
		return data.user;
	}

	onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
		return supabase.auth.onAuthStateChange(callback);
	}
}
