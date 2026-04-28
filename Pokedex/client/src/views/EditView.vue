<template>
  <v-container>
    <v-card class="mx-auto pa-6" max-width="600" elevation="8" rounded="xl">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        <v-icon icon="mdi-pencil-circle" class="mr-2" color="warning"></v-icon>
        Edytuj Pokemona
      </v-card-title>
      
      <v-form @submit.prevent="save" v-model="isFormValid" v-if="pkm.id">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="pkm.name" label="Nazwa Pokemona" required variant="outlined" :rules="[v => !!v || 'Nazwa jest wymagana']"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="pkm.imageUrl" label="Link do zdjęcia (URL)" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select v-model="pkm.type" :items="['Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Electric', 'Poison', 'Rock', 'Ghost', 'Fairy']" label="Typ" variant="outlined"></v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="pkm.description" label="Opis" variant="outlined" rows="3"></v-textarea>
          </v-col>

          <v-divider class="my-4"></v-divider>
          <v-col cols="12"><h3 class="text-subtitle-1 font-weight-bold">Statystyki (0-200)</h3></v-col>

          <v-col cols="12">
            <v-text-field v-model.number="pkm.hp" label="HP" type="number" step="1" variant="filled" density="compact" hide-details></v-text-field>
            <v-slider v-model.number="pkm.hp" min="0" max="200" step="1" color="red" class="mt-1"></v-slider>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model.number="pkm.attack" label="Atak" type="number" step="1" variant="filled" density="compact" hide-details></v-text-field>
            <v-slider v-model.number="pkm.attack" min="0" max="200" step="1" color="orange" class="mt-1"></v-slider>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model.number="pkm.defense" label="Obrona" type="number" step="1" variant="filled" density="compact" hide-details></v-text-field>
            <v-slider v-model.number="pkm.defense" min="0" max="200" step="1" color="blue" class="mt-1"></v-slider>
          </v-col>
        </v-row>

        <v-btn type="submit" color="warning" block size="x-large" class="mt-6 font-weight-bold" :disabled="!isFormValid">
          Zaktualizuj w bazie danych
        </v-btn>
      </v-form>
      <v-progress-circular v-else indeterminate class="ma-auto" color="primary"></v-progress-circular>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isFormValid = ref(false);

const pkm = ref({}); // Pusty obiekt na start

// Pobieramy dane istniejącego pokemona
onMounted(async () => {
  try {
    const res = await axios.get(`https://pokedexab.onrender.com${route.params.id}`);
    pkm.value = res.data;
  } catch (e) {
    console.error(e);
    alert("Błąd wczytywania danych");
  }
});

const save = async () => {
  try {
    // Uwaga: używamy axos.put (zgodnie z nowym endpointem w server.js)
    await axios.put(`https://pokedexab.onrender.com${pkm.value.id}`, pkm.value);
    router.push(`/pokemon/${pkm.value.id}`); // Wracamy do detali po edycji
  } catch (e) {
    console.error(e);
    alert("Wystąpił błąd podczas aktualizacji!");
  }
}
</script>
