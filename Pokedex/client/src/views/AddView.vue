<template>
  <v-container>
    <v-card class="mx-auto pa-6" max-width="600" elevation="8" rounded="xl">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        <v-icon icon="mdi-plus-circle" class="mr-2" color="primary"></v-icon>
        Nowy wpis do Pokedexu
      </v-card-title>
      
      <v-form @submit.prevent="save" v-model="isFormValid">
        <v-row>
          <v-col cols="12">
            <v-text-field 
              v-model="pkm.name" 
              label="Nazwa Pokemona" 
              required 
              variant="outlined"
              :rules="[v => !!v || 'Nazwa jest wymagana']"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field v-model="pkm.imageUrl" label="Link do zdjęcia (URL)" variant="outlined"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select 
              v-model="pkm.type" 
              :items="['Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Electric', 'Poison', 'Rock', 'Ghost', 'Fairy']" 
              label="Typ" 
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-textarea v-model="pkm.description" label="Opis" variant="outlined" rows="3"></v-textarea>
          </v-col>

          <v-divider class="my-4"></v-divider>
          <v-col cols="12"><h3 class="text-subtitle-1 font-weight-bold">Statystyki (0-200)</h3></v-col>

          <v-col cols="12">
            <v-text-field
              v-model.number="pkm.hp"
              label="HP"
              type="number"
              step="1"
              variant="filled"
              density="compact"
              hide-details
              :rules="integerRules"
            ></v-text-field>
            <v-slider
              v-model.number="pkm.hp"
              min="0"
              max="200"
              step="1"
              color="red"
              class="mt-1"
            ></v-slider>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model.number="pkm.attack"
              label="Atak"
              type="number"
              step="1"
              variant="filled"
              density="compact"
              hide-details
              :rules="integerRules"
            ></v-text-field>
            <v-slider
              v-model.number="pkm.attack"
              min="0"
              max="200"
              step="1"
              color="orange"
              class="mt-1"
            ></v-slider>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model.number="pkm.defense"
              label="Obrona"
              type="number"
              step="1"
              variant="filled"
              density="compact"
              hide-details
              :rules="integerRules"
            ></v-text-field>
            <v-slider
              v-model.number="pkm.defense"
              min="0"
              max="200"
              step="1"
              color="blue"
              class="mt-1"
            ></v-slider>
          </v-col>
        </v-row>

        <v-btn 
          type="submit" 
          color="success" 
          block 
          size="x-large" 
          class="mt-6 font-weight-bold"
          :disabled="!isFormValid"
        >
          Zapisz w bazie danych
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const isFormValid = ref(false);

const pkm = ref({ 
  name: '', 
  imageUrl: '', 
  type: 'Normal', 
  description: '', 
  hp: 50, 
  attack: 50, 
  defense: 50 
});

// Reguły sprawdzające, czy liczba jest całkowita i w zakresie
const integerRules = [
  v => v !== null && v !== '' || 'Wartość jest wymagana',
  v => Number.isInteger(Number(v)) || 'To musi być liczba całkowita',
  v => v >= 0 && v <= 200 || 'Zakres to 0 - 200'
];

const save = async () => {
  try {
    // Wysyłamy dane do serwera
    await axios.post('https://pokedexab.onrender.com', pkm.value);
    router.push('/'); 
  } catch (e) {
    console.error(e);
    alert("Wystąpił błąd podczas dodawania pokemona!");
  }
}
</script>
