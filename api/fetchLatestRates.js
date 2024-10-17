export default async function handler(req, res) {
    try {
        const apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching latest exchange rates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
