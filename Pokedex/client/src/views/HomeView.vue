<template>
  <v-container>
    <v-row class="mb-6" align="center">
      
      <v-col cols="12" sm="5" md="4" lg="4">
        <v-text-field
          v-model="search"
          label="Szukaj pokemona..."
          variant="solo-filled"
          flat
          hide-details
          rounded="lg"
          prepend-inner-icon="mdi-magnify"
          bg-color="grey-darken-4"
          class="elevation-1"
        ></v-text-field>
      </v-col>

      <v-col cols="8" sm="4" md="3" lg="3">
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          item-title="title"
          item-value="value"
          label="Sortuj według"
          variant="solo-filled"
          flat
          hide-details
          rounded="lg"
          prepend-inner-icon="mdi-sort"
          bg-color="grey-darken-4"
          class="elevation-1"
        ></v-select>
      </v-col>

      <v-col cols="4" sm="3" md="3" lg="2">
        <v-btn
          color="primary"
          height="56"
          variant="elevated"
          rounded="lg"
          block
          @click="goToRandom"
          prepend-icon="mdi-dice-multiple"
        >
          Losuj
        </v-btn>
      </v-col>
      
    </v-row>

    <v-row v-if="pokemons.length">
      <v-col v-for="p in filtered" :key="p.id" cols="12" sm="6" md="4" lg="3">
        <v-card @click="$router.push('/pokemon/' + p.id)" hover class="text-center pa-3 rounded-lg">
          
          <v-img :src="p.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png?_=20161126061739'" height="150" contain>
            <template v-slot:error>
              <v-img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png?_=20161126061739" height="150" contain></v-img>
            </template>
          </v-img>
          
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
    
    <v-row v-else justify="center">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Potrzebne, żeby przenieść na stronę losowego

const router = useRouter();
const pokemons = ref([]);
const search = ref('');
const sortBy = ref('id-asc'); // Domyślne ustawienie sortowania po starcie

// Definicja opcji dla pola wyboru Select
const sortOptions = [
  { title: 'Index (Rosnąco)', value: 'id-asc' },
  { title: 'Index (Malejąco)', value: 'id-desc' },
  { title: 'Nazwa (A-Z)', value: 'name-asc' },
  { title: 'Nazwa (Z-A)', value: 'name-desc' },
  { title: 'Typ (A-Z)', value: 'type-asc' }
];

// Połączona logika wyszukiwania i sortowania
const filtered = computed(() => {
  let result = pokemons.value;

  // 1. Najpierw odrzucamy to, co nie pasuje do wpisanej frazy wyszukiwania
  if (search.value) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // 2. Następnie sortujemy przefiltrowaną listę i zwracamy "klona" tablicy ([...result]),
  // żeby uniknąć mutowania oryginalnego stanu w Vue
  return [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'id-asc': return a.id - b.id;
      case 'id-desc': return b.id - a.id;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'type-asc': return (a.type || '').localeCompare(b.type || '');
      default: return 0;
    }
  });
});

// Funkcja odpowiedzialna za losowanie Pokemona z obecnej, pełnej bazy
const goToRandom = () => {
  if (pokemons.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * pokemons.value.length);
    const randomPokemonId = pokemons.value[randomIndex].id;
    router.push('/pokemon/' + randomPokemonId);
  }
};

onMounted(async () => {
  try {
    const res = await axios.get('https://pokedexab.onrender.com/api/pokemons');
    if (Array.isArray(res.data)) {
      pokemons.value = res.data;
    } else {
      console.error("Błąd: Serwer nie zwrócił tablicy. Zwrócił:", res.data);
      pokemons.value = [];
    }
  } catch (e) { 
    console.error("Błąd połączenia z backendem:", e); 
    pokemons.value = [];
  }
});

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
