<template>
  <v-app>
    <v-app-bar
      flat
      class="px-md-10"
      height="60"
      style="background: rgba(18, 18, 18, 0.8) !important; backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;"
    >
      <div 
        class="d-flex align-center" 
        style="cursor: pointer" 
        @click="$router.push('/')"
      >
        <v-avatar size="40" class="mr-3">
          <v-img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"></v-img>
        </v-avatar>
        
        <v-app-bar-title class="font-weight-black text-h5 tracking-tight text-white">
          MOJE <span class="text-primary">POKEWIKI</span>
        </v-app-bar-title>
      </div>

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

    <v-footer class="bg-grey-darken-4 text-center d-flex flex-column py-6">
      <div class="text-grey-lighten-1">
        {{ new Date().getFullYear() }} — <strong>Moje PokeWiki</strong>
      </div>
      <div class="text-caption text-grey-darken-1 mt-2">
        Wszystkie prawa zastrzeżone • Projekt zbudowany w oparciu o Vue 3 i Vuetify • Kamil Bilkiewicz • Józef Sawczuk • Akademia Bialska
      </div>
    </v-footer>
  </v-app>
</template>
