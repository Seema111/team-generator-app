export interface IPlayer {
    id: string;
    playerId: string;
    name: string;
    skill: number;
}

export interface IServerPlayer {
    _id: string;
    id: string;
    name: string;
    skill: number;
    __v?: number;
}

export interface IServerGenerate {
    _id: string;
    matchId: string;
    title: string;
    teamCount: number;
    playerCount: number;
    balancedTeams:  IServerTeam[];
    __v?: number;
}


export interface ITeam {
    id: string;
    teamId: string;
    name: string;
}

export interface IServerTeam {
    _id: string;
    id: string;
    name: string;
    players?: IPlayer[];
    __v?: number;
}

export interface IConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}


export interface PlayerState {
    players: IPlayer[];
    playerName: string;
    selectedSkill: number | null;
    editIndex: number | null;
    isSubmitting: boolean;
    error: string | null;
    isDeleteModalOpen: boolean;
    playerIdToDelete: string | null;
    isLoading: boolean;
}