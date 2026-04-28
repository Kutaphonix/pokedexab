<template>
  <v-container v-if="pokemon" fluid class="py-8">
    
    <v-row>
      <v-col cols="12" class="px-md-8 mb-4">
        <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="$router.push('/')">
          Powrót do listy
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" style="min-height: 600px;">
      
      <v-col cols="6" md="auto" class="text-left text-md-right px-md-6">
        <v-btn v-if="neighbors.prev" width="160" prepend-icon="mdi-chevron-left" @click="$router.push(`/pokemon/${neighbors.prev.id}`)" variant="tonal" rounded="pill">
          #{{ neighbors.prev.id }} {{ neighbors.prev.name }}
        </v-btn>
        <div v-else style="width: 160px; height: 36px;"></div>
      </v-col>

      <v-col cols="12" md="8" lg="7">
        <v-card elevation="10" rounded="xl" class="overflow-hidden" min-height="600">
          <v-row no-gutters class="fill-height">
            
            <v-col cols="12" sm="6" class="bg-grey-darken-3 d-flex align-center justify-center pa-10">
              <v-img :src="pokemon.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png?_=20161126061739'" width="100%" height="300" contain></v-img>
            </v-col>

            <v-col cols="12" sm="6" class="pa-8 d-flex flex-column position-relative">
              
              <div class="d-flex justify-end mb-4" style="min-height: 32px;">
                <v-btn size="small" color="warning" class="mr-2" @click="$router.push(`/edit/${pokemon.id}`)" prepend-icon="mdi-pencil">
                  Edytuj
                </v-btn>
                <v-btn size="small" color="error" @click="deletePokemon" prepend-icon="mdi-delete">
                  Usuń
                </v-btn>
              </div>

              <div class="d-flex align-center justify-space-between mb-4" style="min-height: 50px;">
                <h1 class="text-h3 font-weight-black text-capitalize text-truncate">{{ pokemon.name }}</h1>
                <span class="text-h5 text-grey-lighten-1">#{{ pokemon.id }}</span>
              </div>

              <div style="min-height: 40px;" class="mb-2">
                <v-chip v-if="pokemon.type" :color="getTypeColor(pokemon.type)" variant="flat" size="large" class="align-self-start px-6 font-weight-black text-white">
                  <v-icon :icon="getTypeIcon(pokemon.type)" start></v-icon>
                  {{ pokemon.type.toUpperCase() }}
                </v-chip>
              </div>

              <div class="flex-grow-1 mb-4" style="min-height: 100px;">
                <p class="text-body-1 text-grey-darken-2">{{ pokemon.description || 'Brak opisu dla tego Pokemona.' }}</p>
              </div>

              <div class="mt-auto">
                <h3 class="text-h6 mb-4 font-weight-bold">Statystyki bazowe</h3>
                <div v-for="stat in [['HP', pokemon.hp, 'red'], ['ATAK', pokemon.attack, 'orange'], ['OBRONA', pokemon.defense, 'blue']]" :key="stat[0]" class="mb-4">
                  <div class="d-flex justify-space-between mb-1">
                    <span class="text-caption font-weight-bold">{{ stat[0] }}</span>
                    <span class="text-caption">{{ stat[1] }} / 200</span>
                  </div>
                  <v-progress-linear :model-value="(stat[1] / 200) * 100" :color="stat[2]" height="8" rounded></v-progress-linear>
                </div>
              </div>
              
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="6" md="auto" class="text-right text-md-left px-md-6">
        <v-btn v-if="neighbors.next" width="160" append-icon="mdi-chevron-right" @click="$router.push(`/pokemon/${neighbors.next.id}`)" variant="tonal" rounded="pill">
          {{ neighbors.next.name }} #{{ neighbors.next.id }}
        </v-btn>
        <div v-else style="width: 160px; height: 36px;"></div>
      </v-col>

    </v-row>
  </v-container>

  <v-container v-else class="fill-height">
    <v-row justify="center" align="center">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const pokemon = ref(null);
const neighbors = ref({ prev: null, next: null });

const typeConfig = {
  grass: { color: 'green-darken-1', icon: 'mdi-leaf' }, fire: { color: 'orange-darken-2', icon: 'mdi-fire' }, water: { color: 'blue-darken-1', icon: 'mdi-water' }, bug: { color: 'light-green-darken-2', icon: 'mdi-bug' }, normal: { color: 'grey-darken-1', icon: 'mdi-paw' }, electric: { color: 'yellow-darken-2', icon: 'mdi-flash' }, poison: { color: 'purple-darken-1', icon: 'mdi-skull' }, psychic: { color: 'pink-darken-1', icon: 'mdi-eye' }, rock: { color: 'brown-darken-1', icon: 'mdi-image-filter-hdr' }, ghost: { color: 'deep-purple-darken-2', icon: 'mdi-ghost' }, ground: { color: 'orange-lighten-2', icon: 'mdi-earth' }, ice: { color: 'cyan-lighten-2', icon: 'mdi-snowflake' }, dragon: { color: 'indigo-darken-2', icon: 'mdi-dragon' }, fairy: { color: 'pink-lighten-2', icon: 'mdi-auto-fix' }, fighting: { color: 'red-darken-4', icon: 'mdi-sword-cross' }
};

const getTypeColor = (type) => typeConfig[type?.toLowerCase()]?.color || 'grey';
const getTypeIcon = (type) => typeConfig[type?.toLowerCase()]?.icon || 'mdi-help-circle';

// Funkcja pobierająca wszystko dla danego ID
const fetchData = async (id) => {
  pokemon.value = null; // Animacja ładowania
  try {
    const res = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
    pokemon.value = res.data;
    
    // Pobieramy sąsiadów
    const neighRes = await axios.get(`http://localhost:3000/api/pokemons/${id}/neighbors`);
    neighbors.value = neighRes.data;
  } catch (error) {
    console.error("Błąd pobierania:", error);
  }
};

// Funkcja usuwania
const deletePokemon = async () => {
  if(confirm("Czy na pewno chcesz usunąć tego Pokemona?")) {
    try {
      await axios.delete(`https://pokedexab.onrender.com${pokemon.value.id}`);
      router.push('/');
    } catch (error) {
      alert("Błąd podczas usuwania");
    }
  }
};

// Uruchamiane przy pierwszym wejściu
onMounted(() => {
  fetchData(route.params.id);
});

// Gdy zmieniasz URL (np. klikasz "Następny"), odśwież dane
watch(() => route.params.id, (newId) => {
  if (newId) fetchData(newId);
});
</script>
