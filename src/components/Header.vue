<template>
  <div
    class="hide-overflow"
    style="position: relative;"
  >
    <v-toolbar
      absolute
      color="teal lighten-3"
      dark
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title class="mr-4">Splanner</v-toolbar-title>

      <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'four_year_plan'
        }">
        Study Plan
      </v-btn>
    </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container style="height: 100px;"></v-container>
  </div>
</template>
