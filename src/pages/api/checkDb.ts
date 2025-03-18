import { NextApiRequest, NextApiResponse } from 'next';
import { checkDbConnection } from '@/lib/database/checkDbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const isConnected = await checkDbConnection();

        if (isConnected) {
            res.status(200).json({ success: true, message: 'Database is connected.' });
        } else {
            res.status(500).json({ success: false, message: 'Database connection failed.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid request method.' });
    }
}