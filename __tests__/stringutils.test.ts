import {
  getCommandFromComment,
  extractDeployCommandValues,
} from '../src/utils/stringutils';
import config from '../__fixtures__/config.json';
import deployTronConfig from '../__fixtures__/deployTronConfig.json';

describe('String Utilities', () => {
  test('returns null if command is invalid', () => {
    expect(
      extractDeployCommandValues('/bot build react to uat', deployTronConfig),
    ).toBe(null);
    expect(
      extractDeployCommandValues('/bot deploy react to uat', deployTronConfig),
    ).toBe(null);
    expect(
      extractDeployCommandValues(
        `/bot deploy ${deployTronConfig.microservices[0]} to uat`,
        deployTronConfig,
      ),
    ).toBe(null);
    expect(
      extractDeployCommandValues(
        `/bot deploy ${deployTronConfig.microservices[0]} to ${deployTronConfig.environments[0]}`,
        deployTronConfig,
      ),
    ).toBe(null);
    // extra white spaces
    expect(
      extractDeployCommandValues(
        `${config.botCommand}   deploy ${deployTronConfig.microservices[0]}   to ${deployTronConfig.environments[0]}`,
        deployTronConfig,
      ),
    ).toBe(null);
    // extra words
    expect(
      extractDeployCommandValues(
        `${config.botCommand} deploy ${deployTronConfig.microservices[0]} to ${deployTronConfig.environments[0]} right now`,
        deployTronConfig,
      ),
    ).toBe(null);

    expect(
      extractDeployCommandValues(
        `${config.botCommand} deploy ${deployTronConfig.microservices[0]} to ${deployTronConfig.environments[0]}`,
        deployTronConfig,
      ),
    ).not.toBe(null);
    // trailing and leading white spaces should be okay
    expect(
      extractDeployCommandValues(
        ` ${config.botCommand} deploy ${deployTronConfig.microservices[0]} to ${deployTronConfig.environments[0]}   `,
        deployTronConfig,
      ),
    ).not.toBe(null);
  });

  test('returns object of values for environment and microservice when parsed', () => {
    expect(
      extractDeployCommandValues(
        `${config.botCommand} deploy ${deployTronConfig.microservices[0]} to ${deployTronConfig.environments[0]}`,
        deployTronConfig,
      ),
    ).toEqual({
      microservice: deployTronConfig.microservices[0],
      environment: deployTronConfig.environments[0],
    });
  });

  test('returns command from comment', () => {
    expect(getCommandFromComment(`${config.botCommand} help`)).toBe('help');
    expect(getCommandFromComment(`${config.botCommand}   help  me  `)).toBe(
      'help',
    );
  });
});
