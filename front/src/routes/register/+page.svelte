<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import { superForm } from 'sveltekit-superforms/client';

    import { registerSchema } from '$schemas/register';
    import { toast } from '$utils/toast';

    export let data;

    const { form, errors, constraints, submitting, delayed, timeout, message, enhance } = superForm(data.form, {
        taintedMessage: null,
        delayMs: 500,
        timeoutMs: 5000,
        validators: registerSchema,
        onError: () => {
            toast.error('Something went wrong while trying to register you. Please try again later or contact support.');
        },
        onResult(event) {
            if (event.result.status === 400) {
                toast.error('Invalid form. Please fix the errors and try again.');
            }
        },
    });
</script>

<div class="container mx-auto flex flex-grow flex-col py-10">
    <h1 class="text-center">Register</h1>
    <form aria-busy={$submitting} method="post" action="?/register" class="flex flex-grow flex-col items-center justify-center gap-10" use:enhance>
        {#if $message}
            <div transition:fade class="rounded-lg bg-red-800 p-4 text-center text-white shadow-md" role="alert">
                <p>{$message}</p>
            </div>
        {/if}

        <div class="form-control">
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                aria-invalid={$errors.email ? 'true' : undefined}
                aria-errormessage="email-error"
                bind:value={$form.email}
                {...$constraints.email}
            />

            {#if $errors.email}
                <span id="email-error" class="text-red-500">{$errors.email.at(0)}</span>
            {/if}
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                aria-invalid={$errors.password ? 'true' : undefined}
                aria-errormessage="password-error"
                bind:value={$form.password}
                {...$constraints.password}
            />

            {#if $errors.password}
                <span id="password-error" class="text-red-500">{$errors.password.at(0)}</span>
            {/if}
        </div>
        <div class="form-control">
            <label for="password-confirmation">Confirm password</label>
            <input
                type="password"
                id="password-confirmation"
                name="passwordConfirmation"
                aria-invalid={$errors.passwordConfirmation ? 'true' : undefined}
                aria-errormessage="password-confirmation-error"
                bind:value={$form.passwordConfirmation}
                {...$constraints.passwordConfirmation}
            />

            {#if $errors.passwordConfirmation}
                <span id="password-confirmation-error" class="text-red-500">{$errors.passwordConfirmation.at(0)}</span>
            {/if}
        </div>
        <div class="form-control">
            <label for="first-name">First name</label>
            <input
                type="text"
                id="first-name"
                name="firstName"
                aria-invalid={$errors.firstName ? 'true' : undefined}
                aria-errormessage="first-name-error"
                bind:value={$form.firstName}
                {...$constraints.firstName}
            />

            {#if $errors.firstName}
                <span id="first-name-error" class="text-red-500">{$errors.firstName.at(0)}</span>
            {/if}
        </div>
        <div class="form-control">
            <label for="last-name">Last name</label>
            <input
                type="text"
                id="last-name"
                name="lastName"
                aria-invalid={$errors.lastName ? 'true' : undefined}
                aria-errormessage="last-name-error"
                bind:value={$form.lastName}
                {...$constraints.lastName}
            />

            {#if $errors.firstName}
                <span id="last-name-error" class="text-red-500">{$errors.firstName.at(0)}</span>
            {/if}
        </div>
        <button class="button" type="submit" disabled={$submitting}>
            <span>Register</span>

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

        {#if $timeout}
            <span role="status" transition:slide>Sorry, this is taking longer than expected...</span>
        {/if}
    </form>
    <a href="/login" class="text-center underline">Already have an account? Login here</a>
</div>
