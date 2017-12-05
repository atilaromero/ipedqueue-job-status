import Joi from 'joi';
import putMaterial from './put-material';
import assert from 'assert';

const states = ['todo', 'hold', 'done', 'failed', 'running'];
const parameters = path => ({
  parameters: {
    state: {
      options: states.map(x => ({_id: x, value: x})),
      type: 'options',
      error: 'choose one',
    },
    path: {
      value: path
    },
  }
});

async function handler (req, reply) {
  (async () => {
    try {
      let { path } = req.params;
      if ( 'path' in req.payload ) {
        assert(path === req.payload.path);
      }
      if (! ('state' in req.payload)) {
        return reply(parameters(path)).code(400);
      }
      const { state } = req.payload;
      if (! (states.indexOf(state) > -1)) {
        return reply(parameters(path)).code(400);
      }
      await putMaterial(path, {state});
      reply().code(204);
    } catch (error) {
      console.log({error});
      reply({error}).code(500);
    }
  })();
}

export const materialStatePut = {
  method: 'PUT',
  path: '/material/{path*}',
  config: {
    tags: ['api'], // ADD THIS TAG
    validate: {
      params: {
        path: Joi.string().required()
      },
      payload: {
        path: Joi.string(),
        state: Joi.string()
      },
    },
    handler,
  }
};
