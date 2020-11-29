<template>
  <div>我是个人中心</div>
</template>

<script>
import { getTables } from '../../api/api';

export default {
  async created() {
    const res = await getTables({
      parent: 100000,
      pageNum: 1,
      pageSize: 10,
    });
  },
};
</script>

<style></style>
