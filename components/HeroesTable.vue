<template>
    <table class="heroes__table" v-show="heroes.length">
		<thead>
			<tr>
				<th>Name Surname</th>
				<th>Comics</th>
				<th>Favourite</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="hero in heroes" v-bind:key="hero">
				<td>{{ hero.name }}</td>
				<td>{{ hero.comics }}</td>
				<td>
					<label class="heroFavouriteInput">
						Favourite: <input type="checkbox" :checked="hero.favourite" @click="updateHero(hero)">
					</label>
				</td>
				<td>
					<BlueButton @click="heroDelete(hero)">Delete</BlueButton>
				</td>
			</tr>
		</tbody>
	</table>
	<p v-show="!heroes.length">The list of heroes is currently empty. Enter a new hero.</p>
</template>

<script>
import store from '@/store'
import BlueButton from '/components/buttons/BlueButton'
import { mapActions } from 'vuex'

export default {
	name: 'HeroesTable',
	components: { BlueButton },
	props: { 
		heroes: {
			type: Array,
			default: () => { return [] }
		},
	},
	methods: {
		...mapActions(['UPDATE_HERO', 'REMOVE_HERO']),
		updateHero(hero) {
			const updated = {
				id: hero.id,
				name: hero.name,
				comics: hero.comics,
				favourite: !hero.favourite
			}
			store.dispatch('UPDATE_HERO', updated)
		},
		heroDelete(hero) {
			store.dispatch('REMOVE_HERO', hero)
		}
	}
}
</script>
