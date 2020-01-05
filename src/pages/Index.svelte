<script>
  // API
  import { gql } from 'apollo-boost';
  import { query, getClient } from 'svelte-apollo';
  import { Link } from "svelte-routing";
  import { user } from "../stores.js";
  const workspaces = query(getClient(), { query: gql`{workspaces{id name owner { email }}}` });

  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import Badge from "../components/Badge.svelte";
  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";

</script>
<Card>
  <ul>
    {#await $workspaces}
      ...
    {:then result}
      {#each result.data.workspaces as workspace}
        <li><Link to="/ws/{workspace.id}">{workspace.name}</Link> {#if $user.email != workspace.owner.email}<Badge color="gray">{workspace.owner.email}</Badge>{/if}</li>
      {:else}
        You don't have any workspace
      {/each}
    {/await}
  </ul>
</Card>
<div class="float-right">
  <Button icon={faPlus} color="green" text="Create a workspace"/>
</div>
