import { IServerPlayer } from "@/types";

// For ==>: Testing Purpose only
// const dummyPlayers: IServerPlayer[] = [
//     { _id: "1", id: "1", name: "Player 1", skill: 2 },
//     { _id: "2", id: "2", name: "Player 2", skill: 4 },
//     { _id: "3", id: "3", name: "Player 3", skill: 3 },
//     { _id: "4", id: "4", name: "Player 4", skill: 2 },
//     { _id: "5", id: "5", name: "Player 5", skill: 1 },
//     { _id: "6", id: "6", name: "Player 6", skill: 5 },
//     { _id: "7", id: "7", name: "Player 7", skill: 4 },
//     { _id: "8", id: "8", name: "Player 8", skill: 3 },
//     { _id: "9", id: "9", name: "Player 9", skill: 2 },
//     { _id: "10", id: "10", name: "Player 10", skill: 1 },
//     { _id: "11", id: "11", name: "Player 11", skill: 2 },
//     { _id: "12", id: "12", name: "Player 12", skill: 4 },
//     { _id: "13", id: "13", name: "Player 13", skill: 3 },
//     { _id: "14", id: "14", name: "Player 14", skill: 2 },
//     { _id: "15", id: "15", name: "Player 15", skill: 1 }
// ];


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

    balancedTeams.forEach((team, index) => {
        const totalSkill = team.reduce((sum, player) => sum + player.skill, 0);
        console.log(`Team ${index + 1}: Total Skill = ${totalSkill}`);
    });

    return balancedTeams;
}

// const numberOfTeams = 2;
// generateBalancedTeams(dummyPlayers, numberOfTeams);