## Deploying Deploy-Tron :fire:

You will first need to create a [Github App](https://docs.github.com/en/developers/apps/creating-a-github-app) prior to deploying these manifests. 

1. Create a Github App and Collect the relevant information such as: __Application Id__, __Webhook Secret__ (if configured), and your __private key__. 

2. Create the Secret which is needed for Deploy-Tron's runtime. 
`PRIVATE_KEY_CONTENTS=$(cat example.pem) && oc process -f secret.yaml -p APP_ID=<applicationId> -p WEBHOOK_SECRET=<webhook secret> -p PRIVATE_KEY=$PRIVATE_KEY_CONTENTS -p NAME=deploy-tron -p SUFFIX=prod | oc apply -f -`

3. Run the `app.yaml` to build and deploy deploy-tron
`oc process -f app.yaml -p NAME=deploy-tron -p SUFFIX=prod -p GIT_URL=https://github.com/patricksimonian/deploy-tron -p GIT_REF=develop -p ROUTE_HOST_NAME=deploy-tron.apps.pathfinder.aro.devops.gov.bc.ca | oc apply -f -`

> keep in mind the above example command does not include all the available parameters. Explore the available parameters inside of the `app.yaml` file. 