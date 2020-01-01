<script>
  import { Link } from "svelte-routing";
  import { faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
  import Button from "./Button.svelte";
  import { user } from "../stores.js";
</script>
<nav class="bg-white p-2 rounded-b shadow-md fixed w-full flex justify-between px-2 md:py-3 py-2">
  <div>
  <Link to="/">
    BudBud
  </Link>
  </div>
  <div>
  {#if $user.loggedin}
    <Button href="/profile" icon={faUser} hollow/>
  {:else}
    <Button href="/login" color="green" icon={faSignInAlt} text="Login" hollow/>
  {/if}
  </div>
</nav>
