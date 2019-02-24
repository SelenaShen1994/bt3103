<template>
  <v-card height="480px" width="200px" flat>
    <v-navigation-drawer v-model="drawer" floating light hide-overlay stateless>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://pbs.twimg.com/media/C9XyZz0VYAElz7z.jpg" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Kris Wu</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="{ name: item.name }"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Timetable",
          icon: "calendar_today",
          name: "first_page"
        },
        {
          title: "Study Plan",
          icon: "assignment",
          name: "four_year_plan"
        },
        { title: "Profile", icon: "account_circle", name: "profile_page" }
      ],
      right: null
    };
  }
};
</script>
