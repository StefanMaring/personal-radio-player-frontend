<template >
    <section class="s-radio-player">
        <div class="content">
            <div class="radio-controls">
                <div class="control-button play-button"><i class="fas fa-play" @click="playAudioStream"></i></div>
                <div class="control-button pause-button"><i class="fas fa-stop" @click="pauseAudioStream"></i></div>
            </div>
            <div class="radio-info">
                <h2>Currently playing:</h2>
                <h3><i>{{ currentlyPlaying }}</i></h3>
            </div>
        </div>
        <audio :src=this.audioUrl @ended="onAudioEnded"></audio>
    </section>
</template>
<script>
import { radioService } from '@/services/radioService';
import toastr from 'toastr';

export default {
    name: 'RadioPlayer',
    data() {
        return {
            currentlyPlaying: "-",
            isPlaying: false,
            audioUrl: null,
        };
    },
    methods: {
        async getSong() {
            try {
                let filename = "Loading...";
                const response = await radioService.getSong(`/getSong?t=${Date.now()}`);
                const contentDisposition = response.headers.get("content-disposition");

                //Get the filename from the content-disposition header
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename\*\=utf-8''(.+)/i);
                    if (match && match[1]) {
                        filename = decodeURIComponent(match[1]);
                        filename = filename.replace(".mp3", " ");
                    }
                }

                if(response.ok) {
                    const data = await response.blob();
                    return {file: filename, audioURL: URL.createObjectURL(data)};
                } else {
                    toastr.error("Song not retrieved", "Error");
                    return;
                }
            } catch(error) {
                toastr.error("Song not retrieved", "Error");
                console.log(error);
                return;
            }
        },

        async startAudioStream() {
            const song = await this.getSong();
            const url = song.audioURL;
            let filename = song.file;

            if(url) {
                this.audioUrl = url;

                this.$nextTick(() => {
                    const audioEl = this.$el.querySelector("audio");
                    if (audioEl) {
                        audioEl.play();
                        this.currentlyPlaying = filename;
                        this.isPlaying = true;
                        return;
                    }
                });
            }
        },

        async playAudioStream() {
            const audioEl = this.$el.querySelector("audio");
            if (audioEl) {
                audioEl.play();
                this.isPlaying = true;
            }
        },

        async pauseAudioStream() {
            const audioEl = this.$el.querySelector("audio");
            if (audioEl) {
                audioEl.pause();
                this.isPlaying = false;
            }
        },

        async onAudioEnded() {
            this.audioUrl = null;
            this.currentlyPlaying = "-";
            this.startAudioStream();
        },
    },
    mounted() {
        this.startAudioStream();
    },
}
</script>
