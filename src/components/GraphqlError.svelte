<script>
	import { fade } from 'svelte/transition';
  import { navigate } from 'svelte-routing';
  import Fa from 'svelte-fa';
  import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons'
  export let networkError = undefined;
  export let graphqlErrors = [];
  $: {
    if (graphqlErrors && graphqlErrors.length == 1 && graphqlErrors[0].message == "Unauthenticated") {
      graphqlErrors = [];
      if (window.location.pathname !== "/login") {
        navigate(`/login?next=${window.location.pathname}`)
      }
    }
    if (networkError) {
      console.error(networkError)
    }
    if (graphqlErrors) {
      graphqlErrors.forEach((err)=>{
        console.error(err)
      })
    }
  }
  function close() {
    networkError = undefined;
    graphqlErrors = [];
  }
</script>
{#if networkError || graphqlErrors.length > 0}
<div class="bg-red-200 text-red-800 p-3 rounded shadow-md mb-4" transition:fade="{{duration: 250}}">
  <Fa class="inline-block" icon={faExclamationTriangle}/>
  {#if graphqlErrors}
    {#each graphqlErrors as error}
      {error.message}
    {/each}
  {:else}
    {networkError}
  {/if}
  <button class="float-right" on:click={close}>
    <Fa class="inline-block" icon={faTimes}/>
  </button>
</div>
{/if}