<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="dropdown">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              v-model="e1"
              :menu-props="{ auto: true }"
              :items="internship"
              label="Time for compulsory internship"
              placeholder="Year 3 Sem 1"
              attach="dropdown"
            ></v-select>
            <v-select
              v-model="e2"
              :menu-props="{ auto: true }"
              :items="sep"
              label="Time for SEP"
              placeholder="Year 3 Sem 1"
              attach="dropdown"
            ></v-select>
            <v-select
              v-model="e3"
              :menu-props="{ auto: true }"
              :items="minors"
              label="Minor to take"
              placeholder="Finance"
              attach="dropdown"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="studyplan">
    <img src="./assets/studyplan_blank.png" />
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "four_year_plan",
  components: {
    sidebar
  },
  data() {
    return {
      e1: [],
      e2: [],
      e3: [],
      internship: [
        "Year 2 Sem 2",
        "Year 3 Sem 1",
        "Year 3 Sem 2",
        "Year 4 Sem 1"
      ],
      sep: [
        "Year 2 Sem 1",
        "Year 2 Sem 2",
        "Year 3 Sem 1",
        "Year 3 Sem 2",
        "Year 4 Sem 1"
      ],
      minors: [
        "Business",
        "Computer Science",
        "Economics",
        "Math",
        "Finance",
        "Statistics",
        "No plan"
      ]
    };
  }
};
</script>

<style scoped>
#four_year_plan {
  background-color: #ffffff;
  margin: auto;
  width: 100%;
}
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}
.dropdown {
  width: 20%;
  float: left;
}
.studyplan {
  width: 50%;
  float: left;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
