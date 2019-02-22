<template>
  <div>
    <br /><br /><br />
    <div class="academicProgress">
      <p><b>Current CAP</b></p>
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

      <p><b>Degree Progress</b></p>
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
      <br /><br /><br />
      <chart
        :data="bySemCAP[1]"
        :label="bySemCAP[0]"
        :background="someRandomColor[2]"
        :options="{ responsive: true, maintainAspectRatio: false }"
      ></chart>
      <br /><br /><br />

      <button class="collapsible" @click="clickRequirements">
        Requirements Breakdown
      </button>
      <table v-if="showRequirements">
        <tr>
          <th>Module Type</th>
          <th>MCs Required</th>
          <th>MCs Earned</th>
        </tr>
        <tr v-for="(reqtype, index) in byModuleTypeProgress">
          <td>{{ reqtype.type }}</td>
          <td>{{ reqtype.number }}</td>
          <td>{{ reqtype.earned }}</td>
        </tr>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{{ totalMCRequired }}</td>
            <td>{{ totalMCEarned }}</td>
          </tr>
        </tfoot>
      </table>
      <br /><br /><br />
      <div class="moduleInfo">
        <button class="collapsible" @click="clickGrades">
          Grades Breakdown
        </button>
        <SortedTable :values="modulesTaken" v-if="showGrades">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="moduleCode">Module Code</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="moduleName">Module Name</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="modularCredits">Modular Credits</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="gradeEarned">Grades Earned</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="whetherSU">S/U Exercised?</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="moduleType">Module Type</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="semesterTaken">Semester Taken</SortLink>
              </th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="value in sort.values" :key="value.moduleCode">
              <td>{{ value.moduleCode }}</td>
              <td>{{ value.moduleName }}</td>
              <td>{{ value.modularCredits }}</td>
              <td>{{ value.gradeEarned }}</td>
              <td>{{ value.whetherSU }}</td>
              <td>{{ value.moduleType }}</td>
              <td>{{ value.semesterTaken }}</td>
            </tr>
          </tbody>
        </SortedTable>
        <br /><br /><br />
        <button class="collapsible" @click="clickWhatIf">
          What-If Analysis
        </button>
        <div v-if="showWhatIf">
          Enter Module Code: <input v-model="whatIf.newModuleCode" /> Enter
          Expected Grade: <input v-model="whatIf.newModuleExpectedGrade" />
          <br />
          <button @click="addModule();">Add Module</button><br />
          <button @click="removeModule();">Remove Module</button> <br />
          <br />
          <table>
            <tr>
              <th>Module Code</th>
              <th>Expected Grade</th>
            </tr>
            <tbody>
              <tr v-for="module in whatIf.moduleList" :key="module.moduleCode">
                <td>{{ module.moduleCode }}</td>
                <td>{{ module.expectedGrade }}</td>
              </tr>
            </tbody>
          </table>
          <button @click="performWhatIf">Run What-If</button>
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
      showRequirements: false,
      showGrades: false,
      showWhatIf: false,
      personalInfo: {
        name: "John Doh",
        metricNumber: "",
        email: "",
        contactNumber: "",
        address: "",
        profilePic:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcNusDQ1v1fI3iyILqAHNX7EAVw5UOVcYy_vmURFqUCjk3sR1IzA"
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
        "moduleCode",
        "MmoduleName",
        "modularCredits",
        "gradeEarned",
        "whetherSU",
        "moduleType",
        "semesterTaken"
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
          res3[1].push(res2[index][1]);
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
    },
    showWhatIfTable() {
      return !this.whatIf.moduleList;
    }
  },
  methods: {
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
      console.log(this.whatIf.moduleList);
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
          }
        }
        if (!hasMod) {
          alert("You have not added this module.");
        }
      }
    },
    runWhatIf() {}
  },
  components: {
    chart
  }
};
</script>

<style>
.collapsible {
  background-color: whitesmoke;
  color: dimgray;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}
</style>
