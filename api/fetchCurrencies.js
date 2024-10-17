export default async function handler(req, res) {
    try {
        // Get the API key from environment variables
        const apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;

        // Fetch the currencies data from Open Exchange Rates API
        const response = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`);
        const data = await response.json();

        // Send the data to the frontend
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching currency data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
