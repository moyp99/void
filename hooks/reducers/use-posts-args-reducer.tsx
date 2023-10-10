import { useReducer, useEffect } from 'react';

export type PostsArgs = {
    page: number;
    limit: number;
    search: string;
};

type PostsArgsAction = {
    type: string;
    payload?: any;
};

export const SET_PAGE = 'SET_PAGE';
export const SET_SEARCH = 'SET_SEARCH';
export const INCREASE_PAGE = 'INCREASE_PAGE';

const postsArgsReducer = (state: PostsArgs, action: PostsArgsAction): PostsArgs => {
    switch (action.type) {
        case SET_PAGE:
            return { ...state, page: action.payload };
        case SET_SEARCH:
            return { ...state, search: action.payload, page: 1 };
        case INCREASE_PAGE:
            return { ...state, page: state.page + 1 };
        default:
            return state;
    }
};

export const usePostsArgsReducer = (search: string) => {
    const [postsArgs, dispatchPostsArgs] = useReducer(postsArgsReducer, {
        page: 1,
        limit: 5, // Limit always set to 5
        search: '',
    });

    useEffect(() => {
        dispatchPostsArgs({ type: SET_SEARCH, payload: search });
    }, [search]);

    return { postsArgs, dispatchPostsArgs };
};