<script>
  // Color of the button
  export let color='blue';

  $: cls = `bg-${color}-500 text-white rounded-full text-xs px-2 py-1 align-top`;
</script>
<span class={cls}>
  <slot></slot>
</span>