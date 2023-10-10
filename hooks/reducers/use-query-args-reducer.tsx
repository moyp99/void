import { useReducer } from 'react';

export const INCREASE_PAGE = 'INCREASE_PAGE';
export const SET_REGION = 'SET_REGION';

export type QueryArgsState = {
    page: number;
    region: string;
};

export type QueryArgsActions = { type: string; payload?: string };

const queryArgsReducer = (state: QueryArgsState, action: QueryArgsActions): QueryArgsState => {
    switch (action.type) {
        case INCREASE_PAGE:
            return { ...state, page: state.page + 1 };
        case SET_REGION:
            return { ...state, region: action.payload as string, page: 0 }; // Reset page to 0 when region changes
        default:
            return state;
    }
};

export const useQueryArgsReducer = (initialRegion: string) => {
    const [queryArgs, dispatchQueryArgs] = useReducer(queryArgsReducer, {
        page: 0,
        region: initialRegion,
    });

    return { queryArgs, dispatchQueryArgs };
};