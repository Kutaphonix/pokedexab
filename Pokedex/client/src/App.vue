<template>
  <v-app>
    <v-app-bar
      flat
      class="px-md-10"
      height="60"
      style="background: rgba(18, 18, 18, 0.8) !important; backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;"
    >
      <v-avatar size="40" class="mr-3">
        <v-img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"></v-img>
      </v-avatar>
      
      <v-app-bar-title class="font-weight-black text-h5 tracking-tight text-white">
        MOJE <span class="text-primary">POKEWIKI</span>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn 
          to="/" 
          prepend-icon="mdi-home" 
          variant="text" 
          class="mx-4 font-weight-bold rounded-lg"
          :color="$route.path === '/' ? 'primary' : 'white'"
        >
          Główna
        </v-btn>

        <v-btn 
          to="/add" 
          prepend-icon="mdi-plus" 
          variant="elevated" 
          color="primary" 
          class="ml-4 font-weight-bold rounded-lg px-6"
          elevation="4"
        >
          Dodaj Nowego
        </v-btn>
      </div>

      <template v-slot:extension>
        <div style="height: 2px; width: 100%; background: linear-gradient(90deg, transparent, #2196F3, transparent);"></div>
      </template>
    </v-app-bar>

    <v-main style="background-color: #121212;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
// Tu na razie nie potrzebujemy dodatkowej logiki
</script>

<style>
/* Dodatkowy sznyt: płynne przejścia przycisków i wyłączenie Caps Locka */
.v-btn {
  transition: all 0.3s ease !important;
  text-transform: none !important; 
  letter-spacing: 0.5px !important;
}

.v-btn:hover {
  transform: translateY(-2px);
}
</style>