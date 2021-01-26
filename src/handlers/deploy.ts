import { Context } from 'probot';
import {
  extractDeployCommandValues,
  getEnvFromSynonym,
} from '../utils/stringutils';
import {
  getRepoAndOwnerFromContext,
  getHeadRefFromPr,
  getDeployTronConfig,
} from '../utils/ghutils';
import {
  createDeployment,
  isTherePendingDeploymentForEnvironment,
  getLatestEnvironmentStatusesForRef,
  isEnvironmentAllowedToDeploy,
} from '../utils/deployment';
import { MESSAGES } from '../constants/messages';
import {
  pendingDeploymentsExistMessage,
  dependantDeploymentsMessage,
  deploymentCreatedMessage,
  badConfigMessage,
} from '../utils/messages';

export const deploy = async (context: Context): Promise<void> => {
  try {
    const config = await getDeployTronConfig(context);

    const commentBody = context.payload.comment.body;
    const commentOwner = context.payload.comment.user.login;
    const deployValues = extractDeployCommandValues(commentBody, config);

    if (deployValues === null) {
      context.log(MESSAGES.badDeployCommand(commentOwner, commentBody));
      return;
    }

    const environment: string = getEnvFromSynonym(
      deployValues.environment,
      config,
    );

    const { repo, owner } = getRepoAndOwnerFromContext(context);
    // check for pending deployments in that environment for another ref
    // get head ref from pr
    const ref = await getHeadRefFromPr(context);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const allowsMultipleDeploysToEnv = config.environmentsThatAllowConcurrentDeploys ?
      config.environmentsThatAllowConcurrentDeploys.findIndex(
        (env) => env === environment,
      ) > -1 : false;

    const pendingDeployments = await isTherePendingDeploymentForEnvironment(
      context,
      ref,
      environment,
      repo,
      owner,
      config
    );
    const pendingDeploymentsExist = pendingDeployments.length > 0;
    const deploymentStatuses = await getLatestEnvironmentStatusesForRef(
      context,
      ref,
      repo,
      owner,
    );

    if (pendingDeploymentsExist && !allowsMultipleDeploysToEnv) {
      await pendingDeploymentsExistMessage(context, pendingDeployments);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const requiredEnvironments = config.requiredEnvironments[environment];
    const canDeploy = isEnvironmentAllowedToDeploy(
      requiredEnvironments,
      deploymentStatuses,
    );

    if (!canDeploy) {
      await dependantDeploymentsMessage(context, environment);
      return;
    }

    const requiredContexts = config.requiredContexts ? config.requiredContexts[environment] : null;
    // check if previous deployments in train have completed
    const response = await createDeployment(
      context,
      repo,
      owner,
      environment,
      deployValues.microservice,
      ref,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
       requiredContexts || [],
    );

    await deploymentCreatedMessage(context, response.data);
  } catch (e) {
    console.error(e);
    badConfigMessage(context);
  }
};
