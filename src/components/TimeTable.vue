<template>
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
</template>

<script>
export default {
  name: "TimeTable",
  data: () => ({
    active: false
  })
};
</script>
