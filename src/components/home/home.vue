<template>
  <div class="common-layout" style="height: 100%">
    <el-container direction="vertical" style="height: 100%">
      <myHeader></myHeader>
      <el-container style="height: 100%">
        <myAside width="200px"></myAside>
        <el-container>
          <el-main>
            <bread></bread>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <myFooter></myFooter>
          </el-footer>

        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myHeader from "../common/header.vue";
import myAside from "../common/aside.vue";
import myFooter from "../common/footer.vue";
import bread from "../common/bread.vue";
export default {
  data() {
    return {};
  },
  components: {
    myHeader,
    myAside,
    myFooter,
  },
};
</script>

<style lang="scss" scoped>

</style>
