<script>
  import { tick, onDestroy } from 'svelte';
  import { mutate, getClient } from 'svelte-apollo';
  import { navigate } from "svelte-routing";
  import Alert from '../components/Alert.svelte';
  import Card from "../components/Card.svelte";
  import Button from "../components/Button.svelte";
  import { user } from "../stores.js";
  import { Mlogin } from "../queries.js";
  const client = getClient();
  let email = '';
  let password = '';
  let hideWrongCredentials = true;

  function goToNext() {
    let args = window.location.search;
    if (args.length === 0) {
      navigate("/")
    }
    args = args.substring(1)
    args.split("&").forEach(arg=>{
      const parts = arg.split("=")
      if (parts.length !== 2) {
        return
      }
      if (parts[0] === "next") {
        navigate(parts[1])
      }
    })
  }
  // Here, onDestroy execute the unsubscribe fonction when destroying the component (user.subscribe returns the unsubscription function)
  onDestroy(user.subscribe(u=>{
    if (u.loggedin) {
      goToNext()
    }
  }))
  function doLogin() {
    hideWrongCredentials = true;
    mutate(client, {
      mutation: Mlogin,
      variables: { email, password }
    }).then(result=>{
      user.set({
        loggedin: true,
        email: result.data.login.email
      })
    }, (err)=>{
      if (err.message === "GraphQL error: Wrong email or password") {
        hideWrongCredentials = false;
      }
      user.set({loggedin: false})
    })
  }
</script>
<div class="w-4/5 max-w-md mx-auto">
  <Card>
    <Alert bind:hidden={hideWrongCredentials}>Wrong username or password</Alert>
    <form on:submit|preventDefault={doLogin}>
      <label class="font-bold block mb-4 mx-4">
        Email address
        <input class="block w-full shadow-md border rounded py-2 px-4" type="text" name="email" placeholder="Email address" bind:value={email} on:input={()=>{hideWrongCredentials=true}}>
      </label>
      <label class="font-bold block mb-4 mx-4">
        Password
        <input class="block w-full shadow-md border rounded py-2 px-4" type="password" name="password" placeholder="Password" bind:value={password} on:input={()=>{hideWrongCredentials=true}}>
      </label>
      <div class="mx-4">
        <Button text="Login" wfull/>
      </div>
    </form>
  </Card>
</div>