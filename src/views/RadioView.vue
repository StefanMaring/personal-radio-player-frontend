<template>
  <main class="radio-view">
    <RadioPlayer @song-started="songStarted" @song-played="songPlayed"/>
    <div class="bottom">
        <RecentlyPlayed ref="recentlyPlayed"/>
        <SongInfo ref="songInfo"/>
    </div>
  </main>
</template>
<script>
import RadioPlayer from '@/components/RadioPlayer.vue';
import RecentlyPlayed from '@/components/RecentlyPlayed.vue';
import SongInfo from '@/components/SongInfo.vue';

export default {
  name: 'RadioView',
  components: {
    RadioPlayer,
    RecentlyPlayed,
    SongInfo,
  },
  methods: {
    async songStarted() {
        this.$refs.songInfo.getSongInfo();
    },

    async songPlayed() {
      this.$refs.recentlyPlayed.loadRecentlyPlayed();
    },
  },
}
</script>
