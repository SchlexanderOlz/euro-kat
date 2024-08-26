import type { HandleClientError } from '@sveltejs/kit'
// To use Clerk components:
import { initializeClerkClient } from 'clerk-sveltekit/client'
// Or for headless mode:
// import { initializeClerkClient } from 'clerk-sveltekit/headless'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { deDE } from '@clerk/localizations'

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
      afterSignInUrl: '/',
      afterSignUpUrl: '/',
      signInUrl: '/sign-in',
      signUpUrl: '/sign-up',
      localization: deDE
    })

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}

