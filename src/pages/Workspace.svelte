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
<Card overflow>
  <table class="border-collapse">
    <thead>
      <tr>
        <th class="border-gray-500 border-b px-1"></th>
        <th class="border-gray-500 border px-1">Tot</th>
        <th class="border-gray-500 border px-1">Avg</th>
        <th class="border-gray-500 border px-1">Jan</th>
        <th class="border-gray-500 border px-1">Feb</th>
        <th class="border-gray-500 border px-1">Mar</th>
        <th class="border-gray-500 border px-1">Apr</th>
        <th class="border-gray-500 border px-1">May</th>
        <th class="border-gray-500 border px-1">Jun</th>
        <th class="border-gray-500 border px-1">Jul</th>
        <th class="border-gray-500 border px-1">Aug</th>
        <th class="border-gray-500 border px-1">Sep</th>
        <th class="border-gray-500 border px-1">Oct</th>
        <th class="border-gray-500 border px-1">Nov</th>
        <th class="border-gray-500 border px-1">Dec</th>
      </tr>
    </thead>
    <tbody>
      {#each result.data.workspace.categories as sup}
        <tr class="bg-gray-200">
          <td class="font-bold border-gray-500 border-r border-b border-t px-1">{sup.name}</td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
          <td class="border-gray-500 border px-1"></td>
        </tr>
        {#each sup.categories as cat}
          <tr>
            <td class="border-gray-500 border-r border-b border-t">{cat.name}</td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
            <td class="border-gray-500 border px-1"></td>
          </tr>
          {:else}
            <tr colspan="13">
              <th>Empty</th>
            </tr>
          {/each}
        {:else}
            <tr colspan="13">
              <th>No category</th>
            </tr>
        {/each}
    </tbody>
  </table>
</Card>
{/await}
