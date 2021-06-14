import config from '@common/config/env';
import { toUpper } from '@common/dataMappers';

// controllers
import auth from '../controllers/auth';
import skills from '../controllers/skills';
import requests from '../controllers/requests';
import requestSkills from '../controllers/requestSkills';
import userSkills from '../controllers/userSkills';

const controllerCreators = [
  auth,
  skills,
  requests,
  requestSkills,
  userSkills,
];

/**
 * Filter controllers by environments
 * @param {Controller[]} controllers Available controllers
 */
export const filterByEnvironment = (controllers = [], currEnvironment = '') =>
  controllers.filter((controller) => {
    // if there is no environment defined it shall not pass.
    if (!controller.environments) {
      return false;
    }

    const availableEnvironments = controller.environments;

    // if there is only one available and it is defined as a string
    if (toUpper(availableEnvironments) === toUpper(currEnvironment)) {
      return true;
    }

    // if it is defined as array of strings
    return availableEnvironments.find((env) => toUpper(env) === toUpper(currEnvironment));
  });

/**
 * Create controllers by injecting use cases.
 * @param {UseCase[]} useCases Available use cases.
 * @param middlewares
 * @param infrastructure
 */
const controllersFactory = (useCases, middlewares, infrastructure) => {
  try {
    // create actual controllers
    const controllers = controllerCreators.reduce((acc, controllerCreator) => {
      const partial = controllerCreator(useCases, middlewares, infrastructure);

      return [...acc, ...partial];
    }, []);

    // filter controllers by environment that it is available in
    return filterByEnvironment(controllers, config.General.ENVIRONMENT);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    throw error;
  }
};

export default controllersFactory;
