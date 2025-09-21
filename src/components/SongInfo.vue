<template>
    <section class="s-song-info">
        <div class="content">
            <h2>Song Info:</h2>
            <div v-if="recording" class="song-details">
                <div><span>Title:</span><span>{{ songInfo.title }}</span></div>
                <div><span>Artist:</span><span>{{ songInfo.artist }}</span></div>
                <div><span>Album:</span><span>{{ songInfo.album }}</span></div>
                <div v-if="songInfo.releaseDate"><span>Released:</span><span>{{ songInfo.releaseDate }}</span></div>
                <div v-if="songInfo.genre"><span>Genre:</span><span>{{ songInfo.genre }}</span></div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'SongInfo',
    data() {
        return {
            recording: "",
            songInfo: {
                title: "",
                artist: "",
                album: "",
                releaseDate: "",
                genre: "",
            }
        }
    },
    methods: {
        async getSongInfo() {
            await new Promise(resolve => setTimeout(resolve, 1000));

            let currentSong = document.querySelector("#currentlyPlaying").textContent;
            let currentSongSplit = currentSong.split("-");

            let response = await fetch(`http://musicbrainz.org/ws/2/recording/?query=recording:${currentSongSplit[1].trim()}&artist:${currentSongSplit[0].trim()}&inc=releases&fmt=json`);

            if (response.ok) {
                let data = await response.json();

                if(data.recordings.length > 0) {
                    let recordings = data.recordings;

                    recordings.forEach((recording) => {
                        if(recording.title === currentSongSplit[1].trim() && recording['artist-credit'][0].name === currentSongSplit[0].trim()) {
                            this.recording = recording;
                            this.setSongInfo(recording);
                            return; 
                        }
                    });
                }
            } else {
                console.log("Error fetching song info");
            }
        },

        async setSongInfo(recording) {
            this.songInfo.title = recording.title;
            this.songInfo.artist = recording['artist-credit'][0].name;
            this.songInfo.album = recording.releases[0].title;
            this.songInfo.releaseDate = recording['first-release-date'];

            if(recording.tags && recording.tags.length > 0) {
                this.songInfo.genre = recording.tags[0].name;
            }
        }
    }
}
</script>
