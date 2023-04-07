<template>
  <HeroesForm
    :heroes="HEROES"
  />
  <HeroesTable 
    :heroes="HEROES"
  />
	<a href="" target="_blank"></a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeroesTable from '/components/HeroesTable'
import HeroesForm from '/components/HeroesForm'

export default {
  name: 'App',
  components: { HeroesTable, HeroesForm },
  data() {
    return {
      heroes: [],
      id: null,
      name: null,
      comics: null,
      favourite: Boolean,
    }
  },
  computed: {
    ...mapGetters(['HEROES'])
  },
  methods: {
    ...mapActions(['GET_HEROES']),
  },
  mounted() {
    this.GET_HEROES()
  }
}
</script>

<style>
.heroes__form {
	background: #F8F8F8;
    display: inline-flex;
    padding: 10px 20px;
    border-radius: 3px;
    margin-bottom: 10px;
}

.heroes__form label {
	display: flex;
	align-items: center;
	margin-right: 15px;
}

.heroes__form input, .heroes__form select {
	margin-left: 5px;
}

.heroes__table {
	border-collapse: collapse;
}

th, td {
	border: 1px solid #F8F8F8;
	padding: 5px 8px;
}

button {
	background: #8EA7FF;
	border: none;
	border-radius: 3px;
	padding: 10px 40px;
	color: white;
	cursor: pointer;
}

label.heroFavouriteInput {
	display: flex;
	align-items: center;
}

label {
  position: relative;
}

.--required {
  position: absolute;
  font-size: 10px;
  bottom: -4px;
  right: 0;
  color: red;
}
</style>
