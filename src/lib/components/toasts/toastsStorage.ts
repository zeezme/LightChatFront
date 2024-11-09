import { Storage } from '$lib/utils/Storage';

export interface IAddToast {
	message: string;
	title?: string;
	type: ToastType;
}

export enum ToastType {
	Success = 'text-bg-success',
	Info = 'text-bg-info',
	Error = 'text-bg-danger',
	Warning = 'text-bg-warning'
}

export interface ItoastsStorageInitialState {
	toasts: Array<{ id: number; message: string; title?: string; type?: ToastType }>;
}

export const toastsStorage = new Storage<ItoastsStorageInitialState>({
	toasts: []
});

export function addToast({ message, title, type }: IAddToast) {
	toastsStorage.update((state) => {
		const id = Date.now();
		return {
			...state,
			toasts: [...state.toasts, { id, message, title, type }]
		};
	});
}

export function removeToast(id: number) {
	toastsStorage.update((state) => ({
		...state,
		toasts: state.toasts.filter((toast) => toast.id !== id)
	}));
}
