import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/database/dbConnect';
import Player from '@/lib/database/models/Player';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const players = await Player.find({});
                res.status(200).json({ success: true, data: players });
            } catch (error) {
                console.error('Error fetching players:', error);
                res.status(500).json({ success: false, error: 'Failed to fetch players' });
            }
            break;

        case 'POST':
            try {
                const newPlayer = new Player({
                    name: req.body.name,
                    skill: req.body.skill,
                });
                const savedPlayer = await newPlayer.save();
                res.status(201).json({ success: true, data: savedPlayer });
            } catch (error) {
                console.error('Error saving player:', error);
                res.status(500).json({ success: false, error: 'Failed to save player' });
            }
            break;

        default:
            res.status(400).json({ success: false, error: 'Invalid request method' });
            break;
    }
}