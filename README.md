# TOWER migrations

## Running migrations:

Production setup:

```bash
yarn deploy:mainnet # For mainnet deployment
# or
yarn deploy:rinkeby # For rinkeby deployment
# or
yarn deploy:localhost # For ganache deployment
```

Test setup (fast QA settings):

```bash
yarn deploy:rinkeby_qa # For rinkeby deployment
# or
yarn deploy:rinkeby_qa2 # For rinkeby deployment
# or
yarn deploy:localhost_qa # For ganache deployment
```

See `.env.example` for usage of environment variables.
