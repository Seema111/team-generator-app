import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/database/dbConnect';
import Player from '@/lib/database/models/Player';
import { validatePlayerInput } from '@/lib/utils/validation';
import { v4 as uuidV4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const players = await Player.find({}).select('_id id name skill').lean();

                const transformedPlayers = players.map(player => ({
                    playerId: player._id,
                    id: player.id,
                    name: player.name,
                    skill: player.skill,
                }));

                res.status(200).json({ success: true, data: transformedPlayers });
            } catch (error) {
                console.error('Error fetching players:', error);
                res.status(500).json({ success: false, error: 'Failed to fetch players' });
            }
            break;

        case 'POST':
            try {
                const { name, skill } = req.body;

                const validation = validatePlayerInput(name, skill);
                if (!validation.isValid) {
                    return res.status(400).json({ success: false, error: validation.error });
                }

                const id = uuidV4();

                const newPlayer = new Player({ id, name, skill });
                const savedPlayer = await newPlayer.save();

                const transformedPlayer = {
                    playerId: savedPlayer._id,
                    id: savedPlayer.id,
                    name: savedPlayer.name,
                    skill: savedPlayer.skill,
                };

                res.status(201).json({ success: true, data: transformedPlayer });
            } catch (error) {
                console.error('Error saving player:', error);
                res.status(500).json({ success: false, error: 'Failed to save player' });
            }
            break;

        case 'PUT':
            try {
                const { id, name, skill } = req.body;

                if (!id || !name || skill === undefined) {
                    return res.status(400).json({ success: false, error: 'Missing required fields' });
                }

                const updatedPlayer = await Player.findOneAndUpdate(
                    { _id: id },
                    { name, skill },
                    { new: true }
                ).select('_id id name skill');

                if (!updatedPlayer) {
                    return res.status(404).json({ success: false, error: 'Player not found' });
                }

                const transformedPlayer = {
                    playerId: updatedPlayer._id,
                    id: updatedPlayer.id,
                    name: updatedPlayer.name,
                    skill: updatedPlayer.skill,
                };

                res.status(200).json({ success: true, data: transformedPlayer });
            } catch (error) {
                console.error('Error updating player:', error);
                res.status(500).json({ success: false, error: 'Failed to update player' });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.body;

                if (!id) {
                    return res.status(400).json({ success: false, error: 'Player ID is required' });
                }

                const deletedPlayer = await Player.findOneAndDelete({ _id: id }).select('_id id name skill');

                if (!deletedPlayer) {
                    return res.status(404).json({ success: false, error: 'Player not found' });
                }

                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting player:', error);
                res.status(500).json({ success: false, error: 'Failed to delete player' });
            }
            break;

        default:
            res.status(400).json({ success: false, error: 'Invalid request method' });
            break;
    }
}