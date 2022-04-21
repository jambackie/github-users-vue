<template>
  <h1>home</h1>
  <user-item
    v-for="user in users"
    :key="user.id"
    :userItem="user"
    @click="$router.push(`/${user.name}`)"
  ></user-item>
</template>

<script>
import UserItem from '@/components/UserItem.vue';
import { mapState } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    UserItem,
  },
  computed: {
    ...mapState(['users']),
  },
};
</script>
