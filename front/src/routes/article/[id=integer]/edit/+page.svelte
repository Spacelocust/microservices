<script lang="ts">
    import Dialog from '$components/Dialog.svelte';
    import ArticleForm from '$components/form/ArticleForm.svelte';

    import { enhance } from '$app/forms';

    export let data;

    let dialog: HTMLDialogElement;
</script>

<h1>Edit article {data.article.title}</h1>

<ArticleForm data={data.form} articleId={data.article.id.toString()} />

<div>
    <a href={`/article/${data.article.id}`}>View article</a>
    <form use:enhance method="post" action={`/article/${data.article.id}/edit?/delete`}>
        <button type="button" on:click={() => dialog.showModal()}>Delete</button>
        <Dialog bind:dialog title="Are you sure you want to delete this article?" description="This action cannot be undone.">
            <div slot="actions">
                <button type="button" on:click={() => dialog.close()}>Cancel</button>
                <button type="submit" on:click={() => dialog.close()}>Delete</button>
            </div>
        </Dialog>
    </form>
</div>
