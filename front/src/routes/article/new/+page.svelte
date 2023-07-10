<script lang="ts">
    import ArticleForm from '$components/form/ArticleForm.svelte';

    export let data;
</script>

<div class="container mx-auto flex flex-grow flex-col py-10">
    <h1 class="text-center">Create article</h1>

    <ArticleForm data={data.form} />
</div>
