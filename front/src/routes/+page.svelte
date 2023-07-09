<script lang="ts">
    import { flip } from 'svelte/animate';
    import { quadOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    export let data;

    let search = '';

    $: filteredArticles = data.articles.filter((article) => {
        return article.title.toLowerCase().includes(search.toLowerCase());
    });
</script>

<h1>Homepage</h1>

<div class="flex flex-col gap-3 p-5">
    {#if data.articles.length > 0}
        <div class="form-control">
            <label for="article-search">Search articles</label>
            <input
                type="text"
                bind:value={search}
                id="article-search"
                class="rounded-xl bg-gray-100 p-4 shadow-md transition-all duration-500 hover:bg-gray-200"
            />
        </div>

        <h2>
            {#key filteredArticles.length}
                <span class="inline-block" in:fly={{ y: -20, duration: 250, easing: quadOut }}>{filteredArticles.length}</span>
            {/key}
            article{filteredArticles.length > 1 ? 's' : ''} found
        </h2>

        {#each filteredArticles as article (article.id)}
            <a
                href={`/article/${article.id}`}
                class="rounded-xl bg-gray-100 p-4 shadow-md transition-all duration-500 hover:bg-gray-200"
                animate:flip={{ duration: 200 }}
            >
                <span>{article.title}</span>
            </a>
        {:else}
            <p in:fade>No article matched your search.</p>
        {/each}
    {:else}
        <p>No article available yet.</p>
    {/if}
</div>
