<template>
  <div>
      <sidebar />
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  name: "four_year_plan",
  components: {
    SideBar
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Timetable', icon: 'calendar-alt' },
        { title: 'Study Plan', icon: 'book-open'},
        { title: 'Profile', icon: 'question_answer' }
        ],
        right: null
    };
  }
};
</script>

<style scoped>
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
