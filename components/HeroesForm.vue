<template>
    <form class="heroes__form" @submit.prevent="addHero">
		<label>
			Name Surname: 
			<input 
				v-model.trim="name"
				@input="validateName"
				type="text" 
				placeholder="Iron Man"
			>
			<span v-show="showNameError" class="--required">Required field</span>
			<span v-show="duplicate" class="--duplicate --required">Hero with this name already exists</span>
		</label>
		<label>
			Comics: <select v-model.trim="comics" @input="validateComics">
			<option value="">Choose comics</option>
					<option value="Marvel">Marvel</option>
					<option value="DC">DC</option>
				</select>
			<span v-show="showComicsError" class="--required">Required field</span>
		</label>
		<label>
			Favourite: 
			<div class="heroFavouriteInput">
				<input type="checkbox" v-model="favourite">
			</div>
		</label>
		<BlueButton type="submit">Add Hero</BlueButton>
	</form>
</template>

<script>
import store from '@/store'
import BlueButton from '/components/buttons/BlueButton'
import { mapActions } from 'vuex'

export default {
	name: 'HeroesForm',
	components: { BlueButton },
	data() {
		return {
			name: '',
			comics: '',
			favourite: false,
			showNameError: false,
			showComicsError: false,
			duplicate: false,
		}
	},
	props: { 
		heroes: {
			type: Array,
			default: () => { return [] }
		},
	},
	methods: {
		...mapActions(['CREATE_HERO']),
		addHero() {
			this.showNameError = this.name.trim().length === 0
			this.showComicsError = this.comics.trim().length === 0

			if (this.showNameError || this.showComicsError) {
				return
			}

			const isDuplicate = this.heroes.some(
				(hero) => hero.name.toLowerCase() === this.name.toLowerCase()
			)

			if (isDuplicate) {
				this.duplicate = true
				return
			}

			const hero = {
				id: Date.now(),
				name: this.name,
				comics: this.comics,
				favourite: this.favourite,
			}

			store.dispatch('CREATE_HERO', hero)
			this.name = ''
			this.comics = ''
			this.favourite = false

			this.showNameError = false
			this.showComicsError = false
			this.duplicate = false
		},
		validateName() {
			this.showNameError = this.name.trim().length === 0
			this.duplicate = this.heroes.some(
				(hero) => hero.name.toLowerCase() === this.name.toLowerCase()
			)
		},
		validateComics() {
			this.showComicsError = this.comics.trim().length === 0
		},
	},
	watch: {
		name() {
			this.validateName();
		},
		comics() {
			this.validateComics();
		},
	},
}
</script>