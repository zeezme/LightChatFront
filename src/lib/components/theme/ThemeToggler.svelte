<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { Button, Icon, ThemeToggler, useColorMode } from '@sveltestrap/sveltestrap';

	onMount(() => useColorMode(Cookies.get('colorMode') ?? 'light'));

	const toggleAndSaveColorMode = (toggleColorMode, currentColorMode) => {
		Cookies.set('colorMode', currentColorMode === 'light' ? 'dark' : 'light', { path: '/' });
		toggleColorMode();
	};
</script>

<div class="position-absolute top-0 end-0 m-1">
	<ThemeToggler let:currentColorMode let:toggleColorMode>
		<Button
			color="transparent"
			class="border-0"
			on:click={() => toggleAndSaveColorMode(toggleColorMode, currentColorMode)}
		>
			<Icon name={currentColorMode === 'light' ? 'moon-fill' : 'sun-fill'} />
		</Button>
	</ThemeToggler>
</div>
