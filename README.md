# personal-radio-player-frontend
The frontend for a simple local radio player

## API Usage
This radio player uses my own API for fetching songs. The repository for the API/Backend can be found [here](https://github.com/StefanMaring/personal-radio-player-backend). 

### MusicBrainz API Integration
For the "SongInfo" feature the MusicBrainz API is being utilized. Based on the song title and artist this API will fetch a range of recordings. 
Then if one of the songs in the range matches, the info/metadata of that particular song will be displayed on screen while the song is playing. 
Link to the API: [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API).
