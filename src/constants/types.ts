export type synonyms = {
  [any: string]: ENVIRONMENTS;
};

export interface ParsedDeployCommand {
  microservice: string;
  environment: string;
}

export interface LatestStatus {
  node: {
    latestStatus: string;
    ref: {
      name: string;
    };
  };
}

export interface Deployment {
  id: string | number;
  environment: string;
}

export interface DeploymentStatusGroup {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface DeploymentGroup {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface DeploymentStatus {
  node: {
    payload: string;
    latestStatus:
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state: string;
        }
      | string;
    ref: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: string;
    };
  };
}

export interface PrStatusMessage {
  state: string;
  pr: number;
  branch: string;
}

export interface RepoOwner {
  repo: string;
  owner: string;
}

export type ENVIRONMENTS = 'production' | 'development' | 'staging' | 'qa';

export interface DeployTronConfig {
  microservices: string[];
  environmentSynonyms: {
    [key in string]?: ENVIRONMENTS | string;
  };
  requiredEnvironments: {
    development: string[];
    staging: string[];
    production: string[];
  };
  environmentsThatAllowConcurrentDeploys?: string[];
  environments: string[];
  requiredContexts?: {
    [key in ENVIRONMENTS]?: string[];
  };
  maxDeploymentsToLookupForPending?: number;
}
