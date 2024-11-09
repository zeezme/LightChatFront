import { get } from 'svelte/store';
import { LoadingStorage } from './LoadingStorage';

class LoadingService {
	async start(): Promise<void> {
		LoadingStorage.set({ isLoading: true });
	}

	async stop(): Promise<void> {
		LoadingStorage.set({ isLoading: false });
	}

	async get(): Promise<boolean> {
		const { isLoading } = get(LoadingStorage);

		return isLoading;
	}
}

export default new LoadingService();
