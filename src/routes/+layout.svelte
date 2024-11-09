<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import Toasts from '$lib/components/toasts/Toasts.svelte';
	import ThemeToggler from '$lib/components/theme/ThemeToggler.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Spinner } from '@sveltestrap/sveltestrap';

	let isThemeLoaded = false;

	$: theme = $page.data.theme;

	onMount(() => {
		document.body.classList.add(theme);
		isThemeLoaded = true;
	});
</script>

<!-- Evita da tela piscar com o tema errado. -->
{#if isThemeLoaded}
	<div class="position-absolute w-100 h-100" style="z-index: -1">
		<Toasts />

		<div class="position-absolute top-0 end-0 m-1">
			<ThemeToggler />
		</div>

		<slot />
	</div>
{:else}
	<div class="d-flex justify-content-center align-items-center" style="height: 100vh; width: 100vw">
		<Spinner />
	</div>
{/if}
