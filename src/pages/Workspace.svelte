<script>
  import { query, getClient } from 'svelte-apollo';
  import { Qworkspace } from '../queries'

  import Card from "../components/Card.svelte";

  // export let id="";
  export let ownerEmail="";
  export let name="";
  const workspace = query(getClient(), {
    query: Qworkspace,
    variables: { ownerEmail, name }
  });
</script>
{#await $workspace}
...
{:then result}
<h1>{result.data.workspace.name}</h1>
<Card>
</Card>
{/await}
