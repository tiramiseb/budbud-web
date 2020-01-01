<script>
import { tick } from 'svelte';
import { navigate } from 'svelte-routing';
tick().then(()=>{navigate("/");})
</script>