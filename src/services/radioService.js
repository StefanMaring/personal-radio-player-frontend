export const radioService = {
    async getSong(url) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}` + url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Cache-Control': 'no-store'
                }
            });

            if (!response.ok) {
                const status = response.status;
                throw new Error(`Network response was not ok: ${status}`);
            }

            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    async sendRecentlyPlayed(url, timestamp, filename) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}` + url + `?timestamp=${encodeURIComponent(timestamp)}&filename=${encodeURIComponent(filename)}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const status = response.status;
                throw new Error(`Network response was not ok: ${status}`);
            }

            return response;
        } catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }
    },

    async getRecentlyPlayed(url) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}` + url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Cache-Control': 'no-store'
                }
            });

            if (!response.ok) {
                const status = response.status;
                throw new Error(`Network response was not ok: ${status}`);
            }

            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    async getSongInfo(songTitle, songArtist) {
        try {
            const response = await fetch(`http://musicbrainz.org/ws/2/recording/?query=recording:${songTitle}&artist:${songArtist}&inc=releases&fmt=json`);

            if (!response.ok) {
                const status = response.status;
                throw new Error(`Network response was not ok: ${status}`);
            }

            return response;
        } catch (error) {
            console.error('Error fetching song info data:', error);
            throw error;
        }
    },
}