<script>
  import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

  import { mutate, getClient } from 'svelte-apollo';
  import { navigate } from "svelte-routing";
  import { user } from "../stores.js";
  import { Mlogout } from "../queries.js";

  import Card from "../components/Card.svelte";
  import Button from "../components/Button.svelte";

  function doLogout() {
    mutate(getClient(), {
      mutation: Mlogout,
    }).then(()=>{
      user.set({loggedin: false})
      navigate("/")
    })
  }
</script>
<div class="w-4/5 max-w-md mx-auto">
  <Card>
    Email: {$user.email}
    <Button onclick={doLogout} icon={faSignOutAlt} text="Logout" color="red" wfull></Button>
  </Card>
</div>