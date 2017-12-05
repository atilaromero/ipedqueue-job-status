import Joi from 'joi';
import assert from 'assert';
import fetchMaterialList from './fetch-material-list';

export const materialStateByPath = {
  method: 'GET',
  path: '/material',
  config: {
    description: 'Get state',
    tags: ['api'], // ADD THIS TAG
    validate: {
      query: {
        path: Joi.string().required()
      },
    },
    response: {
      schema: Joi.object({
        state: Joi.string().required()
      })
    },
    handler: (req, reply) => {
      (async () => {
        try {
          const { path } = req.query;
          const data = await fetchMaterialList({path});
          if (data.length === 0) { return reply().code(404); }
          assert(data.length === 1, 'more than 1 material found');
          const evidence = data[0];
          reply({ state: evidence.state });
        } catch (error) {
          console.log({error});
          reply({message: error.message, error}).code(500);
        }
      })();
    }
  }
};
