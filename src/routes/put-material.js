import config from 'config';
import axios from 'axios';
import assert from 'assert';
import fetchMaterialList from './fetch-material-list';
const { evidenceURL } = config;

export default async function putMaterial (path, properties) {
  const ids = await fetchMaterialList({path});
  assert(ids.length === 1);
  const id = ids[0]._id;
  const url = evidenceURL + '/api/materials/' + id;
  await axios.put(url, properties);
}
