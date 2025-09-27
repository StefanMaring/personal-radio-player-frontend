<template>
    <section class="s-song-info">
        <div class="content">
            <h2>Song Info:</h2>
            <div class="song-details">
                <div><span>Title:</span><span>{{ songInfo.title }}</span></div>
                <div><span>Artist:</span><span>{{ songInfo.artist }}</span></div>
                <div><span>Album:</span><span>{{ songInfo.album }}</span></div>
                <div><span>Released:</span><span>{{ songInfo.releaseDate }}</span></div>
                <div><span>Genre:</span><span>{{ songInfo.genre }}</span></div>
            </div>
        </div>
    </section>
</template>
<script>
import { radioService } from '@/services/radioService';

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
            let currentSongSplit = currentSong.split("-"); //Returns "Artist - Songtitle"

            let response = await radioService.getSongInfo(currentSongSplit[1], currentSongSplit[0])

            if (response.ok) {
                let data = await response.json();

                if(data.recordings.length > 0) {
                    let recordings = data.recordings;

                    for (let i = 0; i < recordings.length; i++) {
                        const recording = recordings[i];
                        
                        if (
                            recording.title.trim().toLowerCase() === currentSongSplit[1].trim().toLowerCase() &&
                            recording['artist-credit'][0].name.trim().toLowerCase() === currentSongSplit[0].trim().toLowerCase()
                        ) {
                            this.recording = recording;
                            this.setSongInfo(recording);
                            break;
                        } else {
                            this.clearSongInfo();
                        }
                    }
                }
            } else {
                console.log("Error fetching song info");
            }
        },

        async setSongInfo(recording) {
            this.songInfo.title = recording.title;
            this.songInfo.artist = recording['artist-credit'][0].name;
            this.songInfo.album = recording.releases[0].title;

            if(recording['first-release-date']) {
                this.songInfo.releaseDate = recording['first-release-date'];
            } else {
                this.songInfo.releaseDate = "-";
            }

            if(recording.tags && recording.tags.length > 0) {
                //Make sure the genre names start with a capitalized letter, since the API doesn't deliver them that way
                recording.tags.map(tag => tag.name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1));

                let output = "";

                //Allow for up to two genre tags to be shown
                if(recording.tags[1] !== "") {
                    output += recording.tags[0].name + "/" + recording.tags[1].name;
                } else {
                    output += recording.tags[0].name;
                }

                this.songInfo.genre = output;
            } else {
                this.songInfo.genre = "-";
            }
        },

        clearSongInfo() {
            this.recording = "";
            this.songInfo.title = "-";
            this.songInfo.artist = "-";
            this.songInfo.album = "-";
            this.songInfo.releaseDate = "-";
            this.songInfo.genre = "-";
        }
    }
}
</script>
