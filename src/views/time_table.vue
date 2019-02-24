<template lang="html">
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="selection">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              v-model="moduleList"
              :menu-props="{ auto: true }"
              :items="modules"
              label="Add Modules to TimeTable"
              placeholder="Module Code"
              attach="dropdown"
            ></v-select>
            <v-btn block color="teal lighten-2" dark @click="addModule();"
              >Add Module</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div class="timetable">
      <Schedule
        :time-ground="['08:00', '18:00']"
        :week-ground="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']"
        :task-detail="[
          [
            {
              dateStart: '08:00',
              dateEnd: '10:30',
              title: 'BT3103'
            }
          ],
          [
            {
              dateStart: '11:30',
              dateEnd: '13:30',
              title: 'BT3102'
            }
          ]
        ]"
      >
      </Schedule>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "time_table",
  data() {
    return {
      active: false,
      moduleAdded: false,
      moduleList: [],
      modules: [
        "BT3101 Business Analytics Capstone Project",
        "BT3102 Computational Methods for Business Analytics",
        "BT3103 Application Systems Development for Business Analytics"
      ]
    };
  },
  components: {
    sidebar
  },
  methods: {
    addModule: function() {
      this.moduleAdded = true;
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}

.timetable {
  display: flex;
  justify-content: left;
  align-items: left;
  list-style-type: none;
  flex: 1;
}
</style>
