<template lang="html">
  <div>
    <header class="header"><h1>TimeTable!</h1></header>
    <div class="s-layout__sidebar">
      <a class="s-sidebar__trigger" href="#0"> <i class="fa fa-bars"></i> </a>

      <nav class="s-sidebar__nav">
        <ul>
          <li>
            <a class="s-sidebar__nav-link" href="#0">
              <i class="fa fa-Timetable"></i><em>Timetable</em>
            </a>
          </li>
          <li>
            <a class="s-sidebar__nav-link" href="#0">
              <i class="fa fa-moduleInfo"></i><em>Module Info</em>
            </a>
          </li>
          <li>
            <a class="s-sidebar__nav-link" href="#0">
              <i class="fa fa-user"></i><em>My Profile</em>
            </a>
          </li>
        </ul>
      </nav>
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
export default {
  name: "first_page",
  data: () => ({
    active: false
  })
};
</script>

<style lang="stylus">
*, *::before, *::after {
   box-sizing: border-box;
}

body {
   font-family: sans-serif;
   font-size: 1em;
   color: #333;
}

h1 {
  font-size: 1.4em;
}

em {
   font-style: normal;
}

a {
   text-decoration: none;
   color: inherit;
}

/* Layout */
.header {
  display:top;
}
.s-layout {
   display: left;
   width: 100%;
   min-height: 100vh;
   padding: 20px;
}

.timetable {
   display: flex;
   justify-content: center;
   align-items: center;
   flex: 1;
}

/* Sidebar */
.s-sidebar__trigger {
   z-index: 2;
   position: fixed;
   top: 20;
   left: 0;
   width: 100%;
   height: 4em;
   background: #192b3c;
}

.s-sidebar__trigger > i {
   display: inline-block;
   margin: 1.5em 0 0 1.5em;
   color: #f07ab0;
}

.s-sidebar__nav {
   position: fixed;
   top: 3em;
   left: -15em;
   overflow: hidden;
   transition: all .3s ease-in;
   width: 10em;
   height: 100%;
   background: #243e56;
   color: rgba(255, 255, 255, 0.7);
}

.s-sidebar__nav:hover,
.s-sidebar__nav:focus,
.s-sidebar__trigger:focus + .s-sidebar__nav,
.s-sidebar__trigger:hover + .s-sidebar__nav {
   left: 0;
}

.s-sidebar__nav ul {
   position: absolute;
   top: 4em;
   left: 0;
   margin: 0;
   padding: 0;
   width: 15em;
}

.s-sidebar__nav ul li {
   width: 100%;
}

.s-sidebar__nav-link {
   position: relative;
   display: inline-block;
   width: 100%;
   height: 4em;
}

.s-sidebar__nav-link em {
   position: absolute;
   top: 50%;
   left: 4em;
   transform: translateY(-50%);
}

.s-sidebar__nav-link:hover {
   background: #4d6276;
}

.s-sidebar__nav-link > i {
   position: absolute;
   top: 0;
   left: 0;
   display: inline-block;
   width: 4em;
   height: 4em;
}

.s-sidebar__nav-link > i::before {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}

/* Mobile First */
@media (min-width: 42em) {
   .s-layout__content {
      margin-left: 4em;
   }

   /* Sidebar */
   .s-sidebar__trigger {
      width: 4em;
   }

   .s-sidebar__nav {
      width: 4em;
      left: 0;
   }

   .s-sidebar__nav:hover,
   .s-sidebar__nav:focus,
   .s-sidebar__trigger:hover + .s-sidebar__nav,
   .s-sidebar__trigger:focus + .s-sidebar__nav {
      width: 10em;
   }
}

@media (min-width: 42em) {
   .s-layout__content {
      margin-left: 15em;
   }

   /* Sidebar */
   .s-sidebar__trigger {
      display: none
   }

   .s-sidebar__nav {
      width: 10em;
   }

   .s-sidebar__nav ul {
      top: 1.3em;
   }
}
</style>
