import { Context } from 'probot';
import { SAMPLE_CONFIG } from '../constants';
import { getDeployTronConfig } from '../utils/ghutils';
import { architectureMessage } from '../utils/messages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const architecture = async (context: Context): Promise<any> => {
  let config = null;
  try {
    config = await getDeployTronConfig(context);
  } catch(e) {
    config = SAMPLE_CONFIG;
  }

  return architectureMessage(context, config);
};
