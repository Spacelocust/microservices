<script lang="ts">
    import '../app.postcss';

    import '$lib/scss/index.scss';

    import { SvelteToast } from '@zerodevx/svelte-toast';
    import { expoOut } from 'svelte/easing';
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

<header class="bg-svelte">
    <div class="container sticky mx-auto flex justify-between p-3 font-medium text-white">
        <a href="/">gRPC + SvelteKit</a>
        <div class="flex gap-4">
            {#if data.user}
                <span>Logged in as : {`${data.user.firstName} ${data.user.lastName}`}</span>
                <a href="/article/new">Create an article</a>
                <form use:enhance method="post" action="/logout">
                    <button type="submit">Logout</button>
                </form>
            {:else}
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            {/if}
        </div>
    </div>
</header>

{#key data.url}
    <main class="flex flex-grow flex-col" in:fly={{ duration: 750, easing: expoOut, opacity: 0, y: -25 }}>
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
