<script>
  // API
  import { gql } from 'apollo-boost';
  import { query, getClient } from 'svelte-apollo';
  const workspacesOwned = query(getClient(), { query: gql`{workspacesOwned{id name}}` });
  const workspacesGuest = query(getClient(), { query: gql`{workspacesGuest{id name owner { email }}}` });

  // Icon
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";

  
</script>
<Card>
  <ul>
    {#await $workspacesOwned}
      ...
    {:then result}
      {#each result.data.workspacesOwned as workspace}
        <li>{workspace.name}</li>
      {/each}
    {/await}
    {#await $workspacesGuest}
      ...
    {:then result}
      {#each result.data.workspacesGuest as workspace}
        <li>[{workspace.owner.email}] {workspace.name}</li>
      {/each}
    {/await}
  </ul>
</Card>
<div class="float-right">
  <Button icon={faPlus} text="Create a workspace"/>
</div>
