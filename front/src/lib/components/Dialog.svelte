<script context="module" lang="ts">
    let idCounter = 0;
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    export let dialog: HTMLDialogElement;
    export let title: string;
    export let description: string;
    export let hideDescription = false;

    let ariaLabelledby: string;
    let ariaDescribedby: string;

    onMount(() => {
        idCounter += 1;
        ariaLabelledby = `modal-title-${idCounter}`;
        ariaDescribedby = `modal-description-${idCounter}`;
    });
</script>

<dialog bind:this={dialog} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby} on:close>
    <slot {ariaLabelledby} {ariaDescribedby}>
        <slot name="title">
            <h2 id={ariaLabelledby}>{title}</h2>
        </slot>
        <slot name="description">
            <p class:sr-only={hideDescription} id={ariaDescribedby}>{description}</p>
        </slot>
        <slot name="content" />
        <slot name="actions">
            <button type="button" on:click={() => dialog.close()}>Close</button>
        </slot>
    </slot>
</dialog>
