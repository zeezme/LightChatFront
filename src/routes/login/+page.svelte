<script lang="ts">
	import { LoadingStorage } from './../../lib/components/loading/LoadingStorage';
	import Cookies from 'js-cookie';
	import { ToastType } from './../../lib/components/toasts/toastsStorage';
	import Input from '$lib/components/inputs/Input.svelte';
	import { addToast } from '$lib/components/toasts/toastsStorage';
	import AuthService from '$lib/services/Auth';
	import { Card, CardBody, Container, Form, Icon, Row, Spinner } from '@sveltestrap/sveltestrap';
	import { loginStorage } from './loginStorage';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import Loading from '$lib/components/loading/Loading';

	let iconName = writable('lock-fill');

	onMount(() => {
		if (Cookies.get('sb_session')) goto('/');
	});

	const handleSubmit = async (event: any) => {
		Loading.start();

		event.preventDefault();

		const { username, password } = $loginStorage;

		if (!username || !password) {
			return;
		}

		const auth = new AuthService();

		const { success } = await auth.signIn(username, password);

		if (!success) {
			addToast({
				message: 'Usuário ou senha inválidos',
				type: ToastType.Error
			});

			Loading.stop();

			return;
		}
		Loading.stop();

		addToast({
			message: 'Login efetuado com sucesso',
			type: ToastType.Success
		});

		goto('/');
	};
</script>

<Container fluid class="d-flex flex-column justify-content-center align-items-center h-100">
	<h1 class="text-center mb-5">LightChat</h1>
	<div class="d-flex flex-column">
		<Card class="mb-3">
			<CardBody>
				<form class="container" on:submit={handleSubmit}>
					<Row>
						<Input name="username" storage={loginStorage} placeholder="Login" />
					</Row>
					<Row class="mt-3">
						<Input name="password" storage={loginStorage} placeholder="Senha" type="password" />
					</Row>
					<button type="submit" aria-label="Submit" style="display: none;"></button>
				</form>
			</CardBody>
		</Card>

		<Card
			class="d-flex justify-content-center align-items-center"
			style="
				background-position: 100% 0;
				transition: background-position 0.4s ease;
			"
		>
			<div
				role="button"
				tabindex="0"
				on:mouseenter={() => {
					get(iconName) === 'unlock-fill' ? iconName.set('lock-fill') : iconName.set('unlock-fill');
				}}
				on:mouseleave={() => {
					get(iconName) === 'unlock-fill' ? iconName.set('lock-fill') : iconName.set('unlock-fill');
				}}
			>
				<CardBody>
					<button
						class="button-wrapper"
						color="transparent"
						disabled={!$loginStorage.username || !$loginStorage.password}
						on:click={handleSubmit}
					>
						{#if $LoadingStorage.isLoading}
							<Spinner />
						{:else}
							Entrar <Icon name={$iconName} style="font-size: 20px" />
						{/if}
					</button>
				</CardBody>
			</div>
		</Card>
	</div>
</Container>

<style>
	.button-wrapper {
		width: 100%;
		height: 100%;
		cursor: pointer;
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		outline: inherit;
		margin: 0;
		width: 100%;
		display: block;
		margin-bottom: 10px;
	}
</style>
