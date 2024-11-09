<script>
	import { Toast, ToastBody, ToastHeader } from '@sveltestrap/sveltestrap';
	import { removeToast, toastsStorage } from './toastsStorage';
</script>

{#if $toastsStorage.toasts.length > 0}
	<div class="position-fixed top-0 end-0 p-3" style="z-index: 1000; width: 300px;">
		{#each $toastsStorage.toasts as toast (toast.id)}
			<button class="toast-wrapper" on:click={() => removeToast(toast.id)}>
				<Toast
					class="{toast.type ?? 'text-bg-info'} border-0"
					autohide
					isOpen={true}
					header={toast.title}
					on:close={() => removeToast(toast.id)}
				>
					<ToastBody class="text-start">{toast.message}</ToastBody>
				</Toast>
			</button>
		{/each}
	</div>
{/if}

<style>
	.toast-wrapper {
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
