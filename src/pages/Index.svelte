<script>
  // API
  import { gql } from 'apollo-boost';
  import { query, getClient } from 'svelte-apollo';
  const workspaces = query(getClient(), { query: gql`{workspaces{id name owner { email }}}` });

  // Icon
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";

  
</script>
<Card>
  <ul>
    {#await $workspaces}
      ...
    {:then result}
      {#each result.data.workspaces as workspace}
        <li>{workspace.name} [{workspace.owner.email}]</li>
      {:else}
        You don't have any workspace
      {/each}
    {/await}
  </ul>
</Card>
<div class="float-right">
  <Button icon={faPlus} text="Create a workspace"/>
</div>
