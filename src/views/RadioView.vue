<template>
  <main class="radio-view">
    <RadioPlayer />
    <RecentlyPlayed />
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
  }
}
</script>
