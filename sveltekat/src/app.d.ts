// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
    auth: {
      userId: string;
      claims: {
        azp: string;
        exp: number;
        iat: number;
        iss: string;
        nbf: number;
        sid: string;
        sub: string;
      }
    },
    pb_user: {
      id: string;
      sub: string;
      email: string;
      stripe_id: string;
      clerk_id: string;
    } | null
  }
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
