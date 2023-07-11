<script lang="ts">
    import Dialog from '$components/Dialog.svelte';
    import ArticleForm from '$components/form/ArticleForm.svelte';

    import { enhance } from '$app/forms';

    export let data;

    let dialog: HTMLDialogElement;
</script>

<div class="container mx-auto flex flex-grow flex-col py-10">
    <h1 class="text-center">Edit article {data.article.title}</h1>
    <ArticleForm data={data.form} articleId={data.article.id.toString()} />
    <div class="flex justify-center gap-4">
        <a class="button" href={`/article/${data.article.id}`}>View article</a>
        <form use:enhance method="post" action={`/article/${data.article.id}/edit?/delete`}>
            <button class="button | w-full" type="button" on:click={() => dialog.showModal()}>Delete</button>
            <Dialog bind:dialog title="Are you sure you want to delete this article?" description="This action cannot be undone.">
                <div class="flex justify-center gap-4" slot="actions">
                    <button class="button" type="button" on:click={() => dialog.close()}>Cancel</button>
                    <button class="button" type="submit" on:click={() => dialog.close()}>Delete</button>
                </div>
            </Dialog>
        </form>
    </div>
</div>
