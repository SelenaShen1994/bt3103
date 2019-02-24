<template>
  <div
    class="information"
    :style="{ 'padding-left': '200px', margin: auto, width: '95%' }"
  >
    <p>Name: {{ personalInfo.name }}</p>
    <p>Date of Birth: {{ personalInfo.birthday }}</p>
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
    <p></p>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo",
  data() {
    return {
      showRequirements: false,
      showGrades: false,
      tableMessage: "Click to sort",
      personalInfo: {
        name: "Kris Wu",
        metricNumber: "",
        email: "",
        contactNumber: "",
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
        ]
      }
    };
  }
};
</script>
