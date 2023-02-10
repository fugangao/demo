<template>
  <el-aside width="400px" style="height: 100%">
    <el-col :span="12" style="max-width: 100%">
      <el-menu router class="el-menu-vertical-demo" :default-openeds="['1']" active-text-color="#ffd04b"
        @open="handleOpen" @close="handleClose">
        <template v-for="(item, index) in routes" :key="index">
          <el-sub-menu :index="index + 1 + ''">
            <template #title>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(value, subIndex) in item.children" :index="value.path" :key="subIndex + ''">
              {{ value.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
    };
  },
  created() {
    const array = this.$router.options.routes.filter((item) => !item.hidden);
    this.routes = [...array];
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getName() {
      console.log(this.$router);
      console.log(this.routes);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
