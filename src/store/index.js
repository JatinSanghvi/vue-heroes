import Vue from "vue";
import Vuex from "vuex";

import { dataService } from "@/shared";
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO
} from "@/store/mutation-types";

Vue.use(Vuex);

const state = {
  heroes: []
};

const mutations = {
  [ADD_HERO](state, hero) {
    state.heroes.push(hero); // mutable addition
  },
  [DELETE_HERO](state, heroId) {
    state.heroes = [...state.heroes.filter(p => p.id !== heroId)];
  },
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [UPDATE_HERO](state, hero) {
    const index = state.heroes.findIndex(h => h.id === hero.id);
    state.heroes.splice(index, 1, hero);
    state.heroes = [...state.heroes];
  }
};

const actions = {
  // actions let us get to ({ state, getters, commit, dispatch }) {
  async addHeroAction({ commit }, hero) {
    const addedHero = await dataService.addHero(hero);
    commit(ADD_HERO, addedHero);
  },
  async deleteHeroAction({ commit }, hero) {
    const deletedHeroId = await dataService.deleteHero(hero);
    commit(DELETE_HERO, deletedHeroId);
  },
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes();
    commit(GET_HEROES, heroes);
  },
  async updateHeroAction({ commit }, hero) {
    const updatedHero = await dataService.updateHero(hero);
    commit(UPDATE_HERO, updatedHero);
  }
};

const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id)
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV === "development",
  state,
  mutations,
  actions,
  getters
});
