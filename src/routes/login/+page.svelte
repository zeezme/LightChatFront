<script lang="ts">
	import Cookies from 'js-cookie';
	import { ToastType } from './../../lib/components/toasts/toastsStorage';
	import Input from '$lib/components/inputs/Input.svelte';
	import { addToast } from '$lib/components/toasts/toastsStorage';
	import AuthService from '$lib/services/Auth';
	import { Card, CardBody, Container, Form, Icon, Row } from '@sveltestrap/sveltestrap';
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

<Container fluid class="d-flex justify-content-center align-items-center h-100">
	<div class="d-flex flex-row">
		<Card>
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
				width: 120px;
				background-position: 100% 0;
				transition: background-position 0.4s ease;
			"
		>
			<div
				role="button"
				tabindex="0"
				on:mouseenter={() => {
					get(iconName) === 'lock-fill' ? iconName.set('unlock-fill') : iconName.set('lock-fill');
				}}
				on:mouseleave={() => {
					get(iconName) === 'lock-fill' ? iconName.set('unlock-fill') : iconName.set('lock-fill');
				}}
			>
				<CardBody>
					<button
						class="button-wrapper"
						color="transparent"
						disabled={!$loginStorage.username || !$loginStorage.password}
						on:click={handleSubmit}
					>
						<Icon name={$iconName} style="font-size: 50px" />
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
