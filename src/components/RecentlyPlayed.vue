<template >
    <section class="s-recently-played">
        <div class="content">
            <h2>Recently played:</h2>
            <div class="recently-played-list">
                <div class="recently-played-item" v-for="(song, index) in recentlyPlayed" :key="index">
                    <div class="recently-played-info">
                        <p>{{ song.timestamp }}</p>
                        <i>{{ song.filename }}</i>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { radioService } from '@/services/radioService'

export default {
    name: 'RecentlyPlayed',
    data() {
        return {
            recentlyPlayed: [],
        }
    },
    methods: {
        async loadRecentlyPlayed() {
            try {
                const response = await radioService.getRecentlyPlayed("/recentlyPlayed");
                if (response.ok) {
                    const data = await response.json();
                    this.recentlyPlayed = data.data.reverse();
                } else {
                    toastr.error("Failed to send recently played song.", "Error");
                }
            } catch (error) {
                toastr.error("Error sending recently played song:", "Error");
            }
        },
    },
    mounted() {
        this.loadRecentlyPlayed()
    },
}
</script>
