import { createStore } from 'vuex'
import axios from 'axios'

const URL = 'https://641ac4a6c152063412e08cbb.mockapi.io/heroes/'

export default createStore({
    state: {},
    actions: {
        async GET_HEROES({commit}, hero) {
            const response = await axios.get(URL, hero)
            commit('NEW_HEROES', response.data)
        },
        async CREATE_HERO({commit}, hero) {
            const response = await axios.post(URL, hero)
            commit('ADD_HERO', response.data)
        },
        async REMOVE_HERO({commit}, hero) {
            const response = await axios.delete(URL+hero.id, hero)
            commit('DELETE_HERO', response.data)
        },
        async UPDATE_HERO({commit}, hero) {
            const response = await axios.put(URL+hero.id, hero)
            commit('CHANGE_HERO', response.data)
        }
    },
    mutations: {
        NEW_HEROES: (state, heroes) => {
            state.heroes = heroes
        },
        ADD_HERO: (state, hero) => {
            state.heroes.push(hero)
        },
        DELETE_HERO: (state, hero) => {
            state.heroes = state.heroes.filter(h => h.id !== hero.id)
        },
        CHANGE_HERO: (state, updatedHero) => {
            const idx = state.heroes.findIndex(h => h.id === updatedHero.id) 
            if(idx !== -1) {
                state.heroes.splice(idx, 1, updatedHero)
            }
        }
    },
    getters: {
        HEROES(state) {
            return state.heroes
        }
    }
})