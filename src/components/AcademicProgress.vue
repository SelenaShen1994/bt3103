<template>
  <div>
    <br /><br />
    <div
      class="academicProgress"
      :style="{ 'padding-left': '210px', width: '95%' }"
    >
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="teal lighten-3" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://pbs.twimg.com/media/C9XyZz0VYAElz7z.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ personalInfo.name }}</div>
                        <div>
                          <v-icon>fas fa-birthday-cake</v-icon>
                          {{ personalInfo.birthday }}
                        </div>
                        <div>
                          <v-icon>fas fa-at</v-icon> {{ personalInfo.email }}
                        </div>
                        <div>
                          <v-icon>fas fa-mobile</v-icon>
                          {{ personalInfo.contactNumber }}
                        </div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-text class="pa-3">
                  <v-spacer></v-spacer>
                  <div>
                    <p>Cohort: {{ degreeInfo.cohortYear }}</p>
                    <p>Home Faculty: {{ degreeInfo.homeFaculty1 }}</p>
                    <p>Academic Major: {{ degreeInfo.academicMajor1 }}</p>
                    <p>Degree: {{ degreeInfo.academicDegree1 }}</p>
                    <p v-if="!degreeInfo.academicMajor2 == ''">
                      Second Major: {{ degreeInfo.academicMajor2 }}
                    </p>
                    <p v-if="!degreeInfo.academicMinor == ''">
                      Academic Minor: {{ degreeInfo.academicMinor }}
                    </p>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <button class="collapsible" @click="clickOverallProgress">
        Overall Progress
      </button>
      <v-card class="mx-auto" max-width="980" v-if="showOverall">
        <v-card-title>
          <div class="subheading font-weight-light grey--text">
            By Semester CAP
          </div>
        </v-card-title>
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan lighten-3"
          max-width="calc(100% - 72px)"
        >
          <v-sparkline
            :labels="bySemCAP[0]"
            :value="bySemCAP[1]"
            color="white"
            line-width="2"
            padding="16"
            show-labels
            auto-draw
          ></v-sparkline>
        </v-sheet>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small> mdi-clock </v-icon>
        <v-card-text class="pt-0">
          <div class="subheading font-weight-light grey--text">
            Current CAP
            <div class="container">
              <div
                :style="{
                  'background-color': someRandomColor[1],
                  width: (currentCAP / 5.0) * 100 + '%'
                }"
              >
                {{ currentCAP }}/5.0
              </div>
            </div>
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="mr-2" small> mdi-clock </v-icon>
          <div class="subheading font-weight-light grey--text">
            Degree Progress
            <div class="container">
              <div
                :style="{
                  'background-color': someRandomColor[0],
                  width: (totalMCEarned / totalMCRequired) * 100 + '%'
                }"
              >
                {{ totalMCEarned }}/{{ totalMCRequired }} Modular Credits
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <br /><br />

      <button class="collapsible" @click="clickRequirements">
        Requirements Breakdown
      </button>
      <div class="text-xs-center" v-if="showRequirements">
        <v-container fluid>
          <v-layout row>
            <v-flex xs4 v-for="reqtype of byModuleTypeProgress" :key="type">
              {{ reqtype.type }}<br /><br />
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="reqtype.percentage"
                color="teal"
              >
                {{ reqtype.earned }}/{{ reqtype.number }} MC
              </v-progress-circular>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <br /><br />
      <div class="moduleInfo">
        <button class="collapsible" @click="clickGrades">
          Grades Breakdown
        </button>
        <v-container fluid>
          <v-data-table
            :headers="moduleCats"
            :items="modulesTaken"
            class="elevation-1"
            v-if="showGrades"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.moduleCode }}</td>
              <td class="text-xs-right">{{ props.item.moduleName }}</td>
              <td class="text-xs-right">{{ props.item.modularCredits }}</td>
              <td class="text-xs-right">{{ props.item.gradeEarned }}</td>
              <td class="text-xs-right">{{ props.item.whetherSU }}</td>
              <td class="text-xs-right">{{ props.item.moduleType }}</td>
              <td class="text-xs-right">{{ props.item.semesterTaken }}</td>
            </template>
          </v-data-table>
        </v-container>
        <button class="collapsible" @click="clickWhatIf">
          What-If Analysis
        </button>
        <div v-if="showWhatIf">
          <span class="form-style-2-heading">
            Choose Modules for What-If Analysis
          </span>
          <v-container fluid grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  v-model="whatIf.newModuleCode"
                  label="Enter Module Code"
                  placeholder="BT1101"
                  box
                  @keyup.enter="addModule"
                ></v-text-field>
                <v-select
                  v-model="whatIf.newModuleExpectedGrade"
                  :menu-props="{ auto: true }"
                  :items="[
                    'A+',
                    'A',
                    'A-',
                    'B+',
                    'B',
                    'B-',
                    'C+',
                    'C',
                    'D',
                    'E'
                  ]"
                  label="Choose an Expected Grade"
                  placeholder="A+"
                  attach="dropdown"
                  box
                  @keyup.enter="addModule"
                ></v-select>

                <v-btn fab dark color="#42C3FF" @click="addModule();">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark color="#5ADFFF" @click="removeModule();">
                  <v-icon dark>remove</v-icon>
                </v-btn>
                <v-btn fab dark color="#9CFFED" @click="runWhatIf">
                  <v-icon dark>check_circle</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <v-data-table
                  v-model="selected"
                  :headers="[
                    { text: 'Module Code', value: 'moduleCode' },
                    { text: 'Expected Grade', value: 'expectedGrade' }
                  ]"
                  :items="whatIf.moduleList"
                  select-all
                  class="elevation-1"
                  v-if="showWhatIfTable"
                >
                  <template slot="items" slot-scope="props">
                    <tr
                      :active="props.selected"
                      @click="props.selected = !props.selected;"
                    >
                      <td>
                        <v-checkbox
                          v-model="props.selected"
                          primary
                          hide-details
                        ></v-checkbox>
                      </td>
                      <td>{{ props.item.moduleCode }}</td>
                      <td class="text-xs-right">
                        {{ props.item.expectedGrade }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid>
            <p v-if="whatIfClicked">
              Graduation Requirements: <b>{{ graduationStatus }}</b> <br />
              Expected Grade: <b>{{ expectedGrade }}</b>
            </p>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from "/function/chart.js";
import SortedTablePlugin from "vue-sorted-table";
import Vue from "vue";
Vue.use(SortedTablePlugin);

export default {
  name: "AcademicProgress",
  data() {
    return {
      showOverall: true,
      showRequirements: false,
      showGrades: false,
      showWhatIf: false,
      showWhatIfTable: false,
      tableMessage: "Click to sort",
      whatIfClicked: false,
      graduationStatus: "Unsatisfied",
      expectedGrade: 0,
      selected: [],
      personalInfo: {
        name: "Kris Wu",
        metricNumber: "",
        email: "kris.wu@u.nus.edu",
        contactNumber: "9123 4567",
        address: "",
        birthday: "06 November 1990"
      },
      degreeInfo: {
        cohortYear: "AY 2015/2016",
        homeFaculty1: "School of Computing",
        homeFaculty2: "",
        academicMajor1: "Business Analytics",
        academicMajor2: "",
        academicDegree1: "Bachelor of Science (Honors)",
        academicDegree2: "",
        academicMinor: "",
        requiredMC: [
          { type: "University Level Requirements", number: 20 },
          { type: "Degree Requirements", number: 120 },
          { type: "Unrestricted Electives", number: 20 }
        ],
        graduated: false
      },
      moduleCats: [
        { text: "Module Code", value: "moduleCode" },
        { text: "Module Name", value: "moduleName" },
        { text: "Modular Credits", value: "modularCredits" },
        { text: "Grade Obtained", value: "gradeEarned" },
        { text: "S/U Exercised?", value: "whetherSU" },
        { text: "Module Type", value: "moduleType" },
        { text: "Semester Taken", value: "semesterTaken" }
      ],
      moduleTableSortKey: "semesterTaken",
      moduleTableSortOrder: "asc",
      modulesTaken: [
        {
          moduleCode: "BT1101",
          moduleName: "Introduction to Business Analytics",
          modularCredits: 4,
          gradeEarned: 4.5,
          whetherSU: "N",
          moduleType: "Degree Requirements",
          semesterTaken: "Y1 S1"
        },
        {
          moduleCode: "GEH1001",
          moduleName: "Globalization and New Media",
          modularCredits: 4,
          gradeEarned: 4.0,
          whetherSU: "N",
          moduleType: "University Level Requirements",
          semesterTaken: "Y1 S1"
        },
        {
          moduleCode: "EC2101",
          moduleName: "Microeconomics I",
          modularCredits: 4,
          gradeEarned: 5.0,
          whetherSU: "N",
          moduleType: "Unrestricted Electives",
          semesterTaken: "Y1 S1"
        },
        {
          moduleCode: "CS1010S",
          moduleName: "Programming Methodology",
          modularCredits: 4,
          gradeEarned: 5.0,
          whetherSU: "N",
          moduleType: "Degree Requirements",
          semesterTaken: "Y1 S1"
        },
        {
          moduleCode: "MKT1003X",
          moduleName: "Principles of Marketing",
          modularCredits: 4,
          gradeEarned: 4.0,
          whetherSU: "Y",
          moduleType: "Degree Requirements",
          semesterTaken: "Y1 S1"
        },
        {
          moduleCode: "BT2101",
          moduleName: "Decision Making Methods and Tools",
          modularCredits: 4,
          gradeEarned: 4.5,
          whetherSU: "N",
          moduleType: "Degree Requirements",
          semesterTaken: "Y1 S2"
        },
        {
          moduleCode: "IS1103",
          moduleName: "IT Innovation in Organisation and Society",
          modularCredits: 4,
          gradeEarned: 3.5,
          whetherSU: "N",
          moduleType: "Degree Requirements",
          semesterTaken: "Y1 S2"
        },
        {
          moduleCode: "GES1002",
          moduleName: "Global EC Dimension of Singapore",
          modularCredits: 4,
          gradeEarned: 4.0,
          whetherSU: "N",
          moduleType: "University Level Requirements",
          semesterTaken: "Y1 S2"
        }
      ],
      whatIf: [
        { newModuleCode: "" },
        { newModuleExpectedGrade: "" },
        {
          moduleList: []
        }
      ]
    };
  },
  computed: {
    totalMCRequired() {
      var count = 0.0;
      for (var item in this.degreeInfo.requiredMC) {
        count += this.degreeInfo.requiredMC[item].number;
      }
      console.log(count);
      return count;
    },
    totalMCEarned() {
      var count = 0.0;
      for (var item in this.modulesTaken) {
        count += this.modulesTaken[item].modularCredits;
      }
      console.log(count);
      return count;
    },
    currentCAP() {
      var count = 0;
      var mc = 0;
      for (var item in this.modulesTaken) {
        var currMod = this.modulesTaken[item];
        if (currMod.whetherSU != "Y") {
          count +=
            this.modulesTaken[item].modularCredits *
            this.modulesTaken[item].gradeEarned;
          mc += this.modulesTaken[item].modularCredits;
        }
      }
      var cap = count / mc;
      console.log(cap);
      return cap.toFixed(2);
    },
    byModuleTypeProgress() {
      var dic = this.degreeInfo.requiredMC;
      for (var index in dic) {
        var currType = dic[index].type;
        var count = 0;
        for (var id in this.modulesTaken) {
          var currMod = this.modulesTaken[id];
          if (currMod.moduleType == currType) {
            count += currMod.modularCredits;
          }
        }
        dic[index].earned = count;
        dic[index].percentage = (dic[index].earned / dic[index].number) * 100;
      }
      console.log(dic);
      return dic;
    },
    bySemCAP() {
      var res = {
        "Y1 S1": [],
        "Y1 S2": [],
        "Y2 S1": [],
        "Y2 S2": [],
        "Y3 S1": [],
        "Y3 S2": [],
        "Y4 S1": [],
        "Y4 S2": []
      };
      for (var index in this.modulesTaken) {
        var currMod = this.modulesTaken[index];
        var currSem = currMod.semesterTaken;
        var currCAP = currMod.gradeEarned;
        var currMC = currMod.modularCredits;
        res[currSem].push([currCAP, currMC]);
      }
      console.log(res);

      var res2 = [];
      for (var id in res) {
        var currSem = res[id];
        var totalGrade = 0;
        var totalMC = 0;
        for (var index in currSem) {
          var currMod = currSem[index];
          totalGrade += currMod[0] * currMod[1];

          totalMC += currMod[1];
        }
        if (totalMC != 0) {
          var currSAP = totalGrade / totalMC;
        } else {
          var currSAP = 0;
        }

        res2.push([id, currSAP.toFixed(2)]);
      }
      console.log(res2);
      var res3 = [[], []];
      for (var index in res2) {
        if (res2[index][1] != 0) {
          res3[0].push(res2[index][0]);
          res3[1].push(parseFloat(res2[index][1])).toFixed(2);
        }
      }
      console.log(res3);
      return res3;
    },
    randomColor() {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return "#" + randomColor;
    },
    someRandomColor() {
      var brightness = 150;
      function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | (Math.random() * r + brightness);
        var s = n.toString(16);
        return s.length == 1 ? "0" + s : s;
      }
      return [
        "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness),
        "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness),
        "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness)
      ];
    }
  },
  methods: {
    clickOverallProgress() {
      if (this.showOverall == true) {
        this.showOverall = false;
      } else {
        this.showOverall = true;
      }
    },
    clickRequirements() {
      if (this.showRequirements == true) {
        this.showRequirements = false;
      } else {
        this.showRequirements = true;
      }
    },
    clickGrades() {
      if (this.showGrades == true) {
        this.showGrades = false;
      } else {
        this.showGrades = true;
      }
    },
    clickWhatIf() {
      if (this.showWhatIf == true) {
        this.showWhatIf = false;
      } else {
        this.showWhatIf = true;
      }
    },
    updateSort(sortKey) {
      if (sortKey == this.moduleTableSortKey) {
        if (this.moduleTableSortOrder == "asc") {
          this.moduleTableSortOrder = "desc";
        } else {
          this.moduleTableSortOrder = "asc";
        }
      } else {
        this.moduleTableSortKey == sortKey;
        this.moduleTableSortOrder = "asc";
      }
    },
    addModule() {
      if (this.whatIf.moduleList) {
        var count = 0;
        for (var module of this.whatIf.moduleList) {
          if (module.moduleCode === this.whatIf.newModuleCode) {
            count += 1;
          }
        }
        if (count === 0) {
          this.whatIf.moduleList.push({
            moduleCode: this.whatIf.newModuleCode,
            expectedGrade: this.whatIf.newModuleExpectedGrade
          });
        } else {
          alert("You have already added this moduel!");
        }
      } else {
        this.whatIf.moduleList = [
          {
            moduleCode: this.whatIf.newModuleCode,
            expectedGrade: this.whatIf.newModuleExpectedGrade
          }
        ];
      }
      this.whatIf.newModuleCode = "";
      this.whatIf.newModuleExpectedGrade = "";
      // show what-if module table only when there is module added
      this.showWhatIfTable = true;
      console.log(this.whatIf.moduleList);
      if (this.whatIfClicked) {
        this.runWhatIf();
      }
    },
    removeModule() {
      if (!this.whatIf.moduleList) {
        alert("You have not added any modules yet.");
      } else {
        var hasMod = false;
        for (var index in this.whatIf.moduleList) {
          if (
            this.whatIf.moduleList[index].moduleCode ===
            this.whatIf.newModuleCode
          ) {
            hasMod = true;
            this.whatIf.moduleList.splice(index, 1);
            console.log(!this.whatIf.moduleList);
            // hide what-if module table if all modules have been removrd
            if (!this.whatIf.moduleList.length) {
              this.showWhatIfTable = false;
            }
          }
        }
        if (!hasMod) {
          alert("You have not added this module.");
        }
      }
      this.whatIf.newModuleCode = "";
      this.whatIf.newModuleExpectedGrade = "";
      console.log(this.showWhatIfTable);
      if (this.whatIfClicked) {
        this.runWhatIf();
      }
    },
    runWhatIf() {
      //some simple logic here that decides whether graduatable using only MCs taken
      this.whatIfClicked = true;
      this.expectedGrade = this.currentCAP;
      var creditsTaken = 0;
      for (var module of this.modulesTaken) {
        creditsTaken += module.modularCredits;
      }
      var whatifMC = 0;
      for (var module of this.whatIf.moduleList) {
        whatifMC += 4; //assumption here that all modules are 4MC, adjust later
      }
      if (creditsTaken + whatifMC >= 160) {
        this.graduationStatus = "Satisfied";
      }
      if (this.whatIf.moduleList) {
        //still assume that all modules are 4 mc first
        var gradeDic = {
          "A+": 5,
          A: 5,
          "A-": 4.5,
          "B+": 4,
          B: 3.5,
          "B-": 3.0,
          "C+": 2.5,
          C: 2.0,
          D: 1.5
        };
        var whatifGrade = 0;
        for (var module of this.whatIf.moduleList) {
          var currGrade = module.expectedGrade;
          whatifGrade += 4 * gradeDic[currGrade];
        }
        var finalExpectedGrade =
          (this.currentCAP * creditsTaken + whatifGrade) /
          (creditsTaken + whatifMC);
        this.expectedGrade = finalExpectedGrade.toFixed(2);
      }
    }
  },
  components: {
    chart
  }
};
</script>

<style>
.collapsible {
  background-color: #defcf3;
  color: dimgray;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.form-style-2 {
  max-width: 500px;
  padding: 20px 12px 10px 20px;
}
.form-style-2-heading {
  font-weight: bold;
  font-style: italic;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
  font-size: 15px;
  padding-bottom: 3px;
}
</style>
