<script>
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { Container } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!Cookies.get('sb_session')) {
			goto('/login');
		}
	});
</script>

<Container class="d-flex justify-content-center align-items-center h-100">
	<h1>Home</h1>
</Container>
