<script>
  export let overflow=false;
</script>
<div class="bg-white p-3 md:p-4 rounded shadow-md mb-2 md:mb-4" class:overflow-auto={overflow}>
  <slot></slot>
</div>
