import querystring from 'querystring';
import config from 'config';
import axios from 'axios';
import assert from 'assert';

const { evidenceURL } = config;

export default async function fetchMaterialList (properties) {
  const conditions = querystring.stringify({
    conditions: JSON.stringify(properties)
  });
  const url = evidenceURL + '/api/materials?' + conditions;
  const response = await axios.get(url);
  const data = response.data;
  assert(data.constructor === Array, 'invalid response' + data.toString());
  return data;
}
