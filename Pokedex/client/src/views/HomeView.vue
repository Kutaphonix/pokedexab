<template>
<v-container>
    <v-row>
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-text-field
          v-model="search"
          label="Szukaj pokemona..."
          variant="solo-filled"
          flat
          hide-details
          rounded="lg"
          prepend-inner-icon="mdi-magnify"
          class="mb-8 elevation-1"
          bg-color="grey-darken-4"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="pokemons.length">
      <v-col v-for="p in filtered" :key="p.id" cols="12" sm="6" md="4" lg="3">
<v-card @click="$router.push('/pokemon/' + p.id)" hover class="text-center pa-3 rounded-lg">
  <v-img :src="p.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png?_=20161126061739'" height="150" contain></v-img>
  
  <v-card-title class="text-capitalize d-flex align-center justify-center">
    {{ p.name }}
    <v-icon 
      :icon="getTypeIcon(p.type)" 
      :color="getTypeColor(p.type)" 
      size="x-small" 
      class="ml-2"
    ></v-icon>
  </v-card-title>

  <v-card-subtitle class="text-overline">{{ p.type || 'unknown' }}</v-card-subtitle>
</v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center"><v-progress-circular indeterminate></v-progress-circular></v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const pokemons = ref([]);
const search = ref('');

onMounted(async () => {
  try {
    const res = await axios.get('https://https://pokedexab.onrender.com/api/pokemons');
    pokemons.value = res.data;
  } catch (e) { console.error(e); }
});

const filtered = computed(() => 
  pokemons.value.filter(p => p.name.toLowerCase().includes(search.value?.toLowerCase() || ''))
);

const typeConfig = {
  grass: { color: 'green-darken-1', icon: 'mdi-leaf' },
  fire: { color: 'orange-darken-2', icon: 'mdi-fire' },
  water: { color: 'blue-darken-1', icon: 'mdi-water' },
  bug: { color: 'light-green-darken-2', icon: 'mdi-bug' },
  normal: { color: 'grey-darken-1', icon: 'mdi-paw' },
  electric: { color: 'yellow-darken-2', icon: 'mdi-flash' },
  poison: { color: 'purple-darken-1', icon: 'mdi-skull' },
  psychic: { color: 'pink-darken-1', icon: 'mdi-eye' },
  rock: { color: 'brown-darken-1', icon: 'mdi-image-filter-hdr' },
  ghost: { color: 'deep-purple-darken-2', icon: 'mdi-ghost' },
  ground: { color: 'orange-lighten-2', icon: 'mdi-earth' },
  ice: { color: 'cyan-lighten-2', icon: 'mdi-snowflake' },
  dragon: { color: 'indigo-darken-2', icon: 'mdi-dragon' },
  fairy: { color: 'pink-lighten-2', icon: 'mdi-auto-fix' },
  fighting: { color: 'red-darken-4', icon: 'mdi-sword-cross' }
};

// Funkcje pomocnicze
const getTypeColor = (type) => typeConfig[type?.toLowerCase()]?.color || 'grey';
const getTypeIcon = (type) => typeConfig[type?.toLowerCase()]?.icon || 'mdi-help-circle';
</script>
