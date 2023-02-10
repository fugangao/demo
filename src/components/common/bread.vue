<template>
  <el-card class="box-card" style="width: 90%">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index"
        ><a :href="item.path">{{ item.name }}</a></el-breadcrumb-item
      >
    </el-breadcrumb>
  </el-card>
</template>

<script>
export default {
  methods: {
    getName() {
      console.log(this.$route);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
