import config from '../config/index.json';

export const COMMANDS = {
  help: 'help',
  deploy: 'deploy',
  architecture: 'architecture',
  configuration: 'configuration',
};

export const ULTRA_SECRET_COMMANDS = {
  knockknock: 'knockknock',
};

export const ENVIRONMENTS = {
  staging: 'staging',
  production: 'production',
  development: 'development',
};

export const DEFAULT_SYNONYMS = {
  test: ENVIRONMENTS.staging,
  prod: ENVIRONMENTS.production,
  dev: ENVIRONMENTS.development,
};

export const CONFIG = {
  ...config,
};

export const SAMPLE_CONFIG = {
  "validGithubRoles": ["maintain", "admin", "write"],
  "microservices": ["postgres", "redis"],
  "environments": ["production", "development", "staging"],
  "environmentSynonyms": {
    "prod": "production",
    "dev": "development",
    "test": "staging"
  },
  "requiredEnvironments": {
    "development": [],
    "staging": ["development"],
    "production": ["staging", "development"]
  },
  "environmentsThatAllowConcurrentDeploys": ["development"]
}
