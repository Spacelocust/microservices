<script lang="ts">
    import ArticleForm from '$components/form/ArticleForm.svelte';

    export let data;
</script>

<h1>Create article</h1>

<ArticleForm data={data.form} />
