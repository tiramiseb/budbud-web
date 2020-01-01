<script>
  // Color of the button
  export let color='blue';
  // Icon of the button (or no icon) (import from '@fortawesome/free-solid-svg-icons')
  export let icon=undefined;
  // Text of the button (or no text)
  export let text='';
  // Target of the button (optional, makes it a link)
  export let href='';
  // Action when clicking the button (optional, only without href)
  export let onclick=undefined;
  // Make the button use the whole width
  export let wfull=false;
  // Make the button hollow
  export let hollow=false;

  import Fa from 'svelte-fa';
  import { link } from "svelte-routing";
  let cls = "font-bold";
  if (icon && text==="") {
    // Icon-only button
    cls += " py-2 px-2 rounded-full";
  } else {
    cls += " py-2 px-3 rounded";
  }
  if (hollow) {
    cls += ` text-${color}-600 hover:text-${color}-700 hover:bg-${color}-200 hover:shadow-inner`;
  } else {
    cls += ` border border-${color}-600 shadow-md bg-${color}-500 text-white hover:bg-${color}-600 hover:border-${color}-700`;
  }
  if (wfull) {
    cls += " block w-full";
  }
</script>
{#if href}
  <a {href} class={cls} use:link>
    {#if icon}<Fa class="inline-block {text ? 'mr-2' : ''}" fw {icon}/>{/if}{#if text} {text}{/if}
  </a>
{:else if onclick}
  <button class={cls} on:click|preventDefault={onclick}>
    {#if icon}<Fa class="inline-block {text ? 'mr-2' : ''}" fw {icon}/>{/if}{#if text} {text}{/if}
  </button>
{:else}
  <button class={cls}>
    {#if icon}<Fa class="inline-block {text ? 'mr-2' : ''}" fw {icon}/>{/if}{#if text} {text}{/if}
  </button>
{/if}