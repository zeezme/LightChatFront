import { Storage } from '$lib/utils/Storage';

export interface ILoadingStorageInitialState {
	isLoading: boolean;
}

export const LoadingStorage = new Storage<ILoadingStorageInitialState>({
	isLoading: false
});
