<script>

  import ApolloClient from 'apollo-boost';
  import { gql } from 'apollo-boost';
  import { query, setClient } from 'svelte-apollo'; 
  import { navigate } from 'svelte-routing';
  
  let hideGraphqlErrors = true;
  let networkErr = undefined;
  let graphqlErrs = [];
  const client = new ApolloClient({
    uri: 'http://localhost:8080/query',
    credentials: 'include',
    onError: ({ networkError, graphQLErrors }) => {
      const filteredGraphqlErrors = [];
      if (graphQLErrors) {
        graphQLErrors.forEach(err => {
          const msg = err.message;
          if (msg === "Unauthenticated") {
            navigate(`/login?next=${window.location.pathname}`)
            return
          } else if (msg === "Wrong email or password") {
            return
          }
          filteredGraphqlErrors.push(err)
        });
      }
      graphqlErrs = filteredGraphqlErrors;
      networkErr = networkError;
      if (graphqlErrs.length > 0 || networkErr) {
        hideGraphqlErrors = false;
      }
    }
  });
  setClient(client);

  import { user } from "./stores.js";
  query(client, { query: gql`{me{email}}` }).refetch().then(resp=>{
    user.set({loggedin: true, email:resp.data.me.email})
  }, err=>{
    user.set({loggedin: false})
  })

  import Css from './Css.svelte';
  import Alert from './components/Alert.svelte';
  import Navbar from './components/Navbar.svelte';

  import { Router, Route } from 'svelte-routing';

  import Index from './pages/Index.svelte';
  import Login from './pages/Login.svelte';
  import Profile from './pages/Profile.svelte';

  import Workspace from './pages/Workspace.svelte';

  import NotFound from './pages/NotFound.svelte';

</script>
<Css/>
<Router>
  <Navbar/>
  <div class="container md:pt-16 md:px-4 pt-12 px-2">
    <Alert bind:hidden={hideGraphqlErrors}>
      {#if graphqlErrs && graphqlErrs.length>0}
        <ul>
          {#each graphqlErrs as error}
            <li>{error.message}</li>
          {/each}
        </ul>
      {:else}
        {networkErr}
      {/if}
    </Alert>
    <!-- Meta etc -->
    <Route path="/" component={Index} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <!-- Ownership -->
    <Route path="/ws/:id" component={Workspace} />
    <!-- Error -->
    <Route component={NotFound} />
  </div>
</Router>
