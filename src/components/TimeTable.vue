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
      <v-btn color="teal lighten-2" dark @click="changeLayout();"
        >Change Layout</v-btn
      >
      <v-btn color="teal lighten-2" dark @click="switchTable();"
        >{{table.text}}</v-btn
      >
      <v-btn color="teal lighten-2" dark @click="clearTable();"
        >Clear TimeTable</v-btn
      >
    </div>
    <div class="horizontal_timetable" v-show="empty_horizontal">
      <img src=../assets//horizontal_timetable.png width="850px" height="400px" />
    </div>
    <div class="vertical_timetable" v-show="!horizontal">
      <img src=../assets//vertical_timetable.png width="700px" height="500px" />
    </div>
    <div class="horizontal_timetable_withmodule" v-show="moduleAdded">
      <img src=../assets/horizontal_timetable_3103.png width="850px" height="400px" />
    </div>
    <div class="exam_table" v-show="examtable">
      <img src=../assets/examtable.png width="600px" height="150px" />
    </div>
 

  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "time_table",
  data() {
    return {
      table:{
        text:"Exam Table"
      },
      horizontal: true,
      moduleAdded: false,
      examtable:false,
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
    },
    changeLayout: function() {
      this.horizontal = !this.horizontal;
    },
    switchTable: function(){
      this.examtable = !this.examtable;
      this.table.text = this.examtable ? 'Time Table' : 'Exam Table';
      this.moduleAdded = !this.moduleAdded;
    },
    clearTable: function(){
      this.horizontal = true;
      this.moduleAdded = false;
    }
  },
  computed:{
    empty_horizontal(){
      return this.horizontal && !this.moduleAdded && !this.examtable
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
