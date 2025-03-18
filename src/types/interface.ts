export interface Player {
    id: string;
    playerId: string;
    name: string;
    skill: number;
}

export interface Team {
    id: string;
    teamId: string;
    name: string;
}

export interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}
