import { Storage } from '$lib/utils/Storage';

export interface ILoginStorageInitialState {
	username: string;
	password: string;
}

export const loginStorage = new Storage<ILoginStorageInitialState>({
	username: '',
	password: ''
});
