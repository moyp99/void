import { useReducer } from 'react';

export const INCREASE_PAGE = 'INCREASE_PAGE';
export const SET_REGION = 'SET_REGION';

export type LeaderboardQueryArgsState = {
    page: number;
    region: string;
};

export type LeaderboardQueryArgsActions = { type: string; payload?: string };

const leaderboardQueryArgsReducer = (state: LeaderboardQueryArgsState, action: LeaderboardQueryArgsActions): LeaderboardQueryArgsState => {
    switch (action.type) {
        case INCREASE_PAGE:
            return { ...state, page: state.page + 1 };
        case SET_REGION:
            return { ...state, region: action.payload as string, page: 0 }; // Reset page to 0 when region changes
        default:
            return state;
    }
};

export const useLeaderboardQueryArgsReducer = (initialRegion: string) => {
    const [queryArgs, dispatchQueryArgs] = useReducer(leaderboardQueryArgsReducer, {
        page: 0,
        region: initialRegion,
    });

    return { queryArgs, dispatchQueryArgs };
};