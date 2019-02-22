<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
        Splanner
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    
  </v-toolbar>
</template>


<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #E9E;
}
</style>
