<script>
  import { fade } from 'svelte/transition'; 
  import Fa from 'svelte-fa';
  import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

  export let hidden=false;
</script>
<div class="bg-red-200 text-red-800 p-3 rounded shadow-md mb-4" class:hidden transition:fade="{{duration: 250}}">
  <Fa class="inline-block align-top" icon={faExclamationTriangle}/>
  <div class="inline-block align-top">
    <slot></slot>
  </div>
  <button class="float-right" on:click={()=>{hidden=true}}>
    <Fa class="inline-block" icon={faTimes}/>
  </button>
</div>