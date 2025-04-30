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
            return await response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    async sendRecentlyPlayed(url, timestamp, filename) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}` + url + `?timestamp=${timestamp}&filename=${filename}`, {
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
            return await response;
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
            return await response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
}