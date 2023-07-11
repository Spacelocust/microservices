<script lang="ts">
    import { expoOut } from 'svelte/easing';
    import { fade, fly, slide } from 'svelte/transition';

    export let data;

    let search = '';

    $: filteredArticles = data.articles.filter((article) => {
        return article.title.toLowerCase().includes(search.toLowerCase());
    });
</script>

<div class="flex flex-col gap-3 p-5">
    <h1 class="text-center">Homepage</h1>

    {#if data.articles.length > 0}
        <div class="form-control">
            <label for="article-search">Search articles</label>
            <input type="text" bind:value={search} id="article-search" />
        </div>
        <h2 class="mt-6">
            {#key filteredArticles.length}
                <span class="inline-block" in:fly={{ y: -20, duration: 150, easing: expoOut }}>{filteredArticles.length}</span>
            {/key}

            article{filteredArticles.length > 1 ? 's' : ''} found
        </h2>

        {#each filteredArticles as article (article.id)}
            <a
                href={`/article/${article.id}`}
                class="rounded-full bg-gray-100 px-6 py-4 shadow transition-all hover:bg-gray-200"
                in:slide={{ delay: 200, easing: expoOut, axis: 'x' }}
            >
                <span class="font-medium">{article.title}</span>
            </a>
        {:else}
            <p in:fade>No article matched your search.</p>
        {/each}
    {:else}
        <p>No article available yet.</p>
    {/if}
</div>
