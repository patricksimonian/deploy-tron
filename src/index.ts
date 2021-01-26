import { Probot } from 'probot';
import { handlePrComment, handlePrOpened } from './handlers';

export = (app: Probot): void => {
  app.on('issue_comment.created', handlePrComment);

  app.on('pull_request.opened', handlePrOpened);
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
