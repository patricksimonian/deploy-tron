import { Context } from 'probot';
import { SAMPLE_CONFIG } from '../constants';
import { getDeployTronConfig } from '../utils/ghutils';
import { helpMessage, configurationMessage } from '../utils/messages';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const help = async (context: Context): Promise<any> => {
  let config = null;
  try {
    config = await getDeployTronConfig(context);
    // validate config
  } catch(e) {
    config = SAMPLE_CONFIG;
  }
  return helpMessage(context, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configuration = (context: Context): any => {
  return configurationMessage(context);
};
