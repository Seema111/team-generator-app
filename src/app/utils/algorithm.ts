import { IServerPlayer } from "@/types";

function greedyBalancing(players: IServerPlayer[], numberOfTeams: number): IServerPlayer[][] {
    players.sort((a, b) => b.skill - a.skill);

    const teams: IServerPlayer[][] = Array.from({ length: numberOfTeams }, () => []);
    const totalSkillPerTeam: number[] = Array(numberOfTeams).fill(0);

    for (const player of players) {
        let minSkillIndex = 0;
        for (let i = 1; i < numberOfTeams; i++) {
            if (totalSkillPerTeam[i] < totalSkillPerTeam[minSkillIndex]) {
                minSkillIndex = i;
            }
        }

        teams[minSkillIndex].push(player);
        totalSkillPerTeam[minSkillIndex] += player.skill;
    }

    return teams;
}

// Main Balancing Function
export function generateBalancedTeams(players: IServerPlayer[], numberOfTeams: number): IServerPlayer[][] {
    const balancedTeams = greedyBalancing(players, numberOfTeams);
    return balancedTeams;
}