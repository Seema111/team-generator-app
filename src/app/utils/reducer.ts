import { IPlayer, ITeam, PlayerState } from "@/types";

export const initialPlayerState: PlayerState = {
  players: [],
  playerName: "",
  selectedSkill: null,
  editIndex: null,
  isSubmitting: false,
  error: null,
  isDeleteModalOpen: false,
  playerIdToDelete: null,
  isLoading: true,
};

type PlayerAction =
  | { type: "SET_PLAYERS"; payload: IPlayer[] }
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_SELECTED_SKILL"; payload: number | null }
  | { type: "SET_EDIT_INDEX"; payload: number | null }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_DELETE_MODAL_OPEN"; payload: boolean }
  | { type: "SET_PLAYER_ID_TO_DELETE"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean };

export const playerReducer = (
  state: PlayerState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.payload };
    case "SET_SELECTED_SKILL":
      return { ...state, selectedSkill: action.payload };
    case "SET_EDIT_INDEX":
      return { ...state, editIndex: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DELETE_MODAL_OPEN":
      return { ...state, isDeleteModalOpen: action.payload };
    case "SET_PLAYER_ID_TO_DELETE":
      return { ...state, playerIdToDelete: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};


export type teamState = {
  teams: ITeam[];
  teamName: string;
  editIndex: number | null;
  isSubmitting: boolean;
  error: string | null;
  isDeleteModalOpen: boolean;
  teamIdToDelete: string | null;
  isLoading: boolean;
};

export type teamAction =
  | { type: 'SET_TEAMS'; payload: ITeam[] }
  | { type: 'SET_TEAM_NAME'; payload: string }
  | { type: 'SET_EDIT_INDEX'; payload: number | null }
  | { type: 'SET_IS_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_IS_DELETE_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_TEAM_ID_TO_DELETE'; payload: string | null }
  | { type: "SET_LOADING", payload: boolean };

export const initialTeamState: teamState = {
  teams: [],
  teamName: '',
  editIndex: null,
  isSubmitting: false,
  error: null,
  isDeleteModalOpen: false,
  teamIdToDelete: null,
  isLoading: true,
};

export function teamReducer(state: teamState, action: teamAction): teamState {
  switch (action.type) {
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    case 'SET_TEAM_NAME':
      return { ...state, teamName: action.payload };
    case 'SET_EDIT_INDEX':
      return { ...state, editIndex: action.payload };
    case 'SET_IS_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_IS_DELETE_MODAL_OPEN':
      return { ...state, isDeleteModalOpen: action.payload };
    case 'SET_TEAM_ID_TO_DELETE':
      return { ...state, teamIdToDelete: action.payload };
    default:
      return state;
  }
}