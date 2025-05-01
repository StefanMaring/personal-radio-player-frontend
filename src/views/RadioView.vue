<template>
  <main class="radio-view">
    <RadioPlayer @song-played="songPlayed"/>
    <RecentlyPlayed ref="recentlyPlayed"/>
  </main>
</template>
<script>
import RadioPlayer from '@/components/RadioPlayer.vue';
import RecentlyPlayed from '@/components/RecentlyPlayed.vue';

export default {
  name: 'RadioView',
  components: {
    RadioPlayer,
    RecentlyPlayed,
  },
  methods: {
    async songPlayed() {
      this.$refs.recentlyPlayed.loadRecentlyPlayed();
    },
  },
}
</script>
