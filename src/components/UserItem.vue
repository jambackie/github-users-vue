<template>
  <h1>{{ userItem.name }}</h1>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    userItem: {
      type: Object,
    },
  },
};
</script>
