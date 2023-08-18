# Development Notes

###

Add command:

```shell
oclif generate command NAME
```

Add hook:

```shell
oclif generate hook NAME
```

### Todos May 28th

#### [A] Adjust the CL function:

1. Customer does init command via the CLI. This CLI creates a custom role in the customer's account.
2. The CLI stores the signup parameters in a users table in Xata to keep developing fast. For the API call we need (targetAccountId, roleName, targetExternalId, targetRegion).
3. Once the role has been created, a second request is executed (all in the same API call) to create the bucket in the target account. This bucket name is also stored in the users table database
   —-------

#### [B] NextJS API:

4. On the front-end web application, we make an API call to the users table, and check if there is a key present for the user’s bucket. If that key is present, a second request is made with an assumed role to check if the bucket exists (with the head http method).
5. If the bucket exists in the other account, we return “bucket verified status”

## AWS Switching Profile Notes

- aws sts get-caller-identity
-
