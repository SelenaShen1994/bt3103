<template>
  <div class = "sidebar">
      <sidebar />
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "four_year_plan",
  components: {
    sidebar
  }
}
</script>

<style scoped>
#four_year_plan {
  background-color: #ffffff;
}
#sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
