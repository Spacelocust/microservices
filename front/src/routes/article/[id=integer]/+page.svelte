<script lang="ts">
    import { UserRole } from '$api/stubs/user/v1alpha/message.js';

    export let data;

    $: isGranted = data.user && (data.user.id === data.article.userId.toString() || data.user.role === UserRole.ADMIN);
</script>

<h1>{data.article.title}</h1>

<p>{data.article.content}</p>

{#if isGranted}
    <div class="flex gap-4">
        <a href={`/article/${data.article.id}/edit`}>Edit</a>
    </div>
{/if}
