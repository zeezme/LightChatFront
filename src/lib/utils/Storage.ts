import { writable, get as getStoreValue, type Writable } from 'svelte/store';

export class Storage<T extends object> {
	public _state: Writable<T>;

	constructor(initialValue: T) {
		this._state = writable(initialValue);
	}

	setField<K extends keyof T>(fieldName: K, value: T[K]): void {
		this._state.update((currentState) => ({
			...currentState,
			[fieldName]: value
		}));
	}

	get(): T {
		return getStoreValue(this._state);
	}

	subscribe(run: (value: T) => void): () => void {
		return this._state.subscribe(run);
	}

	set(value: T): void {
		this._state.set(value);
	}

	update(updater: (value: T) => T): void {
		this._state.update(updater);
	}
}
