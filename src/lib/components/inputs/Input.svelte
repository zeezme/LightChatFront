<script lang="ts">
	import { onMount } from 'svelte';
	import type { Storage } from '$lib/utils/Storage';
	import { Input, Spinner, type InputType } from '@sveltestrap/sveltestrap';
	import Loading from '../loading/Loading';
	import { LoadingStorage } from '../loading/LoadingStorage';
	import { get } from 'svelte/store';

	export let name: string = '';
	export let storage: Storage<Record<any, any>>;
	export let placeholder: string = '';
	export let type: InputType = 'text';
	export let showSpinner: boolean = false;

	let inputValue: string = '';

	onMount(() => {
		inputValue = (storage.get()[name] as string) || '';
	});

	$: {
		storage.setField(name, inputValue);
	}
</script>

<div class="input-wrapper">
	<Input {type} {placeholder} bind:value={inputValue} />
	{#if $LoadingStorage.isLoading && showSpinner}
		<div class="spinner-container">
			<Spinner size="sm" />
		</div>
	{/if}
</div>

<style>
	.input-wrapper {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.spinner-container {
		position: absolute;
		top: 50%;
		right: 25px;
		transform: translateY(-50%);
	}
</style>
