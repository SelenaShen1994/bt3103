<template lang="html">
  <div>
    <div class="parentx-static">
      <vs-sidebar
        static-position
        default-index="1"
        color="primary"
        class="sidebarx"
        spacer
        v-model="active"
      >
        <div class="header-sidebar" slot="header">
          <vs-avatar
            size="70px"
            src="https://randomuser.me/api/portraits/men/85.jpg"
          />
          <h4>
            My Semester Modules
            <vs-button color="primary" type="flat"></vs-button>
          </h4>
        </div>

        <vs-sidebar-item index="1"> TimeTable </vs-sidebar-item>
        <vs-sidebar-item index="2"> Module Infomation </vs-sidebar-item>
        <vs-sidebar-item index="3"> Recommendation </vs-sidebar-item>

        <div class="footer-sidebar" slot="footer">
          <vs-button color="danger" type="flat">log out</vs-button>
          <vs-button color="primary" type="border"></vs-button>
        </div>
      </vs-sidebar>
    </div>

    <div style="margin-left:25%" id="content">
      <h1>Content</h1>
      <p>This is the content</p>
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
.parentx-static
  overflow hidden
  height 500px
  position relative

.header-sidebar
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  h4
    display flex
    align-items center
    justify-content center
    width 100%
    > button
      margin-left 10px
.footer-sidebar
  display flex
  align-items center
  justify-content space-between
  width 100%
  > button
      border 0px solid rgba(0,0,0,0) !important
      border-left 1px solid rgba(0,0,0,.07) !important
      border-radius 0px !important
</style>

<style scoped>
#content {
  background-color: #ffffff;
  border: 1px solid #cccccc;
}
</style>
