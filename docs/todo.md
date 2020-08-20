## TODO

-    Main
     -    [ ] cache (maybe?)
          -    [ ] add caching for the responses from databases
          -    [ ] add a flag thats saying data is stale and its currently loading
     -    [ ] add provider element for hooks to utilise. The idea is to create a custom provider that has access to firebase functions wrapped with hooks, so the user has to only wrap his `<App/>` with provider, then hooks will be configured to consume that context.
-    Firestore hooks
     -    [x] read all documents in the collection
     -    [ ] get document by id
-    Auth hooks
     -    [ ] Login user
     -    [ ] STRETCH GOAL: add support for Concurrent mode: when checking for user there is a time period where current user is being loaded in and there can be a burst of unloaded content shown to the user, which is ofc bad UX
     -    [ ] Add current user lookup function
     -    [ ] Sign up user
     -    [ ] Hooks for all signup methods
-    Realtime DB hooks
-    Storage hooks

Stretch goals:

-    Static type checking for queries by asking user to input his db structure
-    Dynamic imports of for only needed firebase parts, ie only `import "firebase/firestore"` when actually using firestore