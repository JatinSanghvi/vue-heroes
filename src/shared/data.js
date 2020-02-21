import * as axios from 'axios';
import { format, parse } from 'date-fns';
import { API } from './config';
import { inputDateFormat } from './constants';

const getHeroes = async function () {
  try {
    const response = await axios.get(`${API}/heroes.json`);
    const data = parseList(response);

    const heroes = data.map(h => {
      h.originDate = format(parse(h.originDate, "MM/dd/yyyy", new Date()), inputDateFormat);
      return h;
    });

    return heroes;
  }
  catch (error) {
    console.error(error);
    return [];
  }
}

const parseList = function (response) {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];

  const list = response.data;
  if (typeof list !== "object") return []
  return list;
}

export const data = {
  getHeroes
}