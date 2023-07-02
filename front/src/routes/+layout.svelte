<script lang="ts">
    import '../app.postcss';

    import { SvelteToast } from '@zerodevx/svelte-toast';
    import { fly } from 'svelte/transition';
    import { initFlash } from 'sveltekit-flash-message/client';

    import { toast } from '$utils/toast';

    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    export let data;

    const flash = initFlash(page);

    $: if ($flash) {
        toast[$flash.type]($flash.message);
    }
</script>

<header class="flex justify-between gap-2 p-3">
    <a href="/">gRPC + SvelteKit</a>
    <div class="flex flex-col gap-2 md:flex-row">
        {#if data.user}
            <span>Logged in as : {`${data.user.firstName} ${data.user.lastName}`}</span>
            <form use:enhance method="post" action="/logout">
                <button type="submit">Logout</button>
            </form>
        {:else}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {/if}
    </div>
</header>

{#key data.url}
    <main class="flex flex-grow flex-col" in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
        <slot />
    </main>
{/key}

<div class="wrap">
    <SvelteToast options={{ duration: 5000, pausable: true }} />
</div>

<style lang="scss">
    :root {
        --toastBorderRadius: 0.25rem;
    }

    .wrap {
        --toastContainerTop: auto;
        --toastContainerRight: 1rem;
        --toastContainerBottom: 1rem;
        --toastContainerLeft: auto;
    }
</style>
