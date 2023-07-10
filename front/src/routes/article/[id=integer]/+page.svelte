<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';
    import { superForm } from 'sveltekit-superforms/client';

    import { UserRole } from '$api/stubs/user/v1alpha/message.js';
    import { commentSchema } from '$schemas/comment.js';
    import { toast } from '$utils/toast.js';

    export let data;

    const { form, errors, constraints, submitting, delayed, timeout, message, enhance } = superForm(data.form, {
        delayMs: 500,
        timeoutMs: 5000,
        validators: commentSchema,
        resetForm: true,
        onError: (e) => {
            toast.error(
                (e.result.status ?? 500) >= 500
                    ? 'Something went wrong while trying to post your comment. Please try again later or contact support.'
                    : e.result.error.message,
            );
        },
        onResult(event) {
            if (event.result.status === 400) {
                toast.error('Invalid form. Please fix the errors and try again.');
            }
        },
    });

    $: isGranted = data.user && (data.user.id === data.article.userId.toString() || data.user.role === UserRole.ADMIN);
</script>

<div class="container mx-auto flex flex-grow flex-col py-10">
    <h1 class="text-center">{data.article.title}</h1>

    <p>{data.article.content}</p>

    {#if isGranted}
        <div class="flex gap-4">
            <a class="button" href={`/article/${data.article.id}/edit`}>Edit</a>
        </div>
    {/if}

    <h2>Comments</h2>

    {#if data.user}
        <form
            aria-busy={$submitting}
            method="post"
            action={`/article/${data.article.id}?/comment`}
            class="flex flex-grow flex-col items-center justify-center gap-10"
            use:enhance
        >
            {#if $message}
                <div transition:fade class="rounded-lg bg-red-800 p-4 text-center text-white shadow-md" role="alert">
                    <p>{$message}</p>
                </div>
            {/if}

            <div class="form-control">
                <label for="content">Add a comment</label>
                <textarea
                    id="content"
                    name="content"
                    aria-invalid={$errors.content ? 'true' : undefined}
                    aria-errormessage="content-error"
                    rows="10"
                    bind:value={$form.content}
                    {...$constraints.content}
                />

                {#if $errors.content}
                    <span id="content-error" class="text-red-500">{$errors.content.at(0)}</span>
                {/if}
            </div>
            <button class="button" type="submit" disabled={$submitting}>
                <span>Post comment</span>

                {#if $delayed || $timeout}
                    <span in:fade>
                        <svg
                            aria-hidden="true"
                            class="h-5 w-5 animate-spin fill-white text-gray-200"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </span>
                {/if}
            </button>
        </form>
    {:else}
        <p><a href="/login">Login</a> to comment that article.</p>
    {/if}
</div>

<div class="flex flex-col gap-4">
    {#each data.article.comments as comment (comment.id)}
        <div class="flex gap-4 rounded-md border border-gray-400 bg-gray-50 p-4" animate:flip={{ duration: 200 }}>
            <p>{comment.content}</p>
        </div>
    {:else}
        <p>No comments yet. Be the first!</p>
    {/each}
</div>
