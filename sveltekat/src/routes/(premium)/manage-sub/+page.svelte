<script>

	import { PUBLIC_CUSTOMER_PORTAL } from "$env/static/public";
	import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";

</script>

<div class="w-full h-full flex flex-col items-center p-8">
  <h1 class="h2 mb-8">Premium Abo verwalten</h1>
  <SignedIn let:user>
    <a href="{PUBLIC_CUSTOMER_PORTAL}?prefilled_email={user?.emailAddresses[0]}" target="_blank">
      <button class="btn variant-ghost-primary">
        Zum Kundenportal
      </button>
    </a>
  </SignedIn>
 
</div>
