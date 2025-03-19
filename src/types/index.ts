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

export interface ITeam {
    id: string;
    teamId: string;
    name: string;
}

export interface IServerTeam {
    _id: string;
    id: string;
    name: string;
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
