import { useReducer } from 'react';
import {PlayerData} from "@/local-types";

export const PLAYER_LIST_ADD = 'PLAYER_LIST_ADD';
export const PLAYER_LIST_SET = 'PLAYER_LIST_SET';

type PlayerListAction = {
    type: string;
    payload: PlayerData[];
};

const playerListReducer = (state: PlayerData[], action: PlayerListAction) => {
    switch (action.type) {
        case PLAYER_LIST_ADD:
            return [...state, ...action.payload];
        case PLAYER_LIST_SET:
            return action.payload;
        default:
            return state;
    }
};

export const usePlayerListReducer = () => {
    const [playersList, dispatchPlayersList] = useReducer(playerListReducer, []);
    return { playersList, dispatchPlayersList };
};