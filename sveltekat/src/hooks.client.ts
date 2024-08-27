import type { HandleClientError } from '@sveltejs/kit'
// To use Clerk components:
// Or for headless mode:
import { initializeClerkClient } from 'clerk-sveltekit/client'
// import { initializeClerkClient } from 'clerk-sveltekit/headless'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { deDE } from '@clerk/localizations'

initializeClerkClient( {
      publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY,
      localization: deDE,
      afterSignInUrl: '/',
      afterSignUpUrl: '/',
      signInUrl: '/sign-in',
      signUpUrl: '/sign-up'
    })

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}

