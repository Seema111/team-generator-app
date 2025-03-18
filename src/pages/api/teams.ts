import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/database/dbConnect';
import Team from '@/pages/models/Team';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const teams = await Team.find({}).select('_id id name').lean();

                const teamResponse = teams.map((team) => ({
                    teamId: team._id,
                    id: team.id,
                    name: team.name,
                }));

                res.status(200).json({ success: true, data: teamResponse });
            } catch (error) {
                console.error('Error fetching teams:', error);
                res.status(500).json({ success: false, error: 'Failed to fetch teams' });
            }
            break;

        case 'POST':
            try {
                const { name } = req.body;
                if (!name) {
                    return res.status(400).json({ success: false, error: 'Team name is required' });
                }
                const newTeam = new Team({ name });
                const savedTeam = await newTeam.save();

                const teamData = {
                    teamId: savedTeam._id,
                    id: savedTeam.id,
                    name: savedTeam.name,
                };

                res.status(201).json({ success: true, data: teamData });
            } catch (error) {
                console.error('Error saving team:', error);
                res.status(500).json({ success: false, error: 'Failed to save team' });
            }
            break;

        case 'PUT':
            try {
                const { id, name } = req.body;
                if (!id || !name) {
                    return res.status(400).json({ success: false, error: 'Missing required fields' });
                }
                const updatedTeam = await Team.findOneAndUpdate(
                    { _id: id },
                    { name },
                    { new: true }
                ).select('_id id name');

                if (!updatedTeam) {
                    return res.status(404).json({ success: false, error: 'Team not found' });
                }

                const teamData = {
                    teamId: updatedTeam._id,
                    id: updatedTeam.id,
                    name: updatedTeam.name,
                };

                res.status(200).json({ success: true, data: teamData });
            } catch (error) {
                console.error('Error updating team:', error);
                res.status(500).json({ success: false, error: 'Failed to update team' });
            }
            break;

        case 'DELETE':
            try {
                const { id } = req.body;
                if (!id) {
                    return res.status(400).json({ success: false, error: 'Team ID is required' });
                }

                const deletedTeam = await Team.findOneAndDelete({ _id: id }).select('_id id name');

                if (!deletedTeam) {
                    return res.status(404).json({ success: false, error: 'Team not found' });
                }

                res.status(200).json({ success: true });
            } catch (error) {
                console.error('Error deleting team:', error);
                res.status(500).json({ success: false, error: 'Failed to delete team' });
            }
            break;

        default:
            res.status(400).json({ success: false, error: 'Invalid request method' });
            break;
    }
}