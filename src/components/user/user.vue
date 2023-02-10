<template>
  <el-tree :data="menus" :props="props"  show-checkbox @check-change="handleCheckChange" ref="tree">
  </el-tree>
  <el-button type="primary" size="large" @click="power"
    style="position: absolute;bottom: 100px;left: 50%;">分配权限</el-button>

</template>

<script>
export default {
  data() {
    return {
      menus: [],
      props: {
        label: 'name',
        children: 'children'
      },
      count: 1
    };
  },
  created() {
    let data = [...this.$router.options.routes]
    this.menus = data.filter(item => !item.hidden)
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    power() {
      let a = this.$refs.tree.getCheckedNodes()
    }

  }
};
</script>

<style lang="scss" scoped>

</style>
