import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
    data: number;
}

const initialState: CounterState = {
    data: 5
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload //this is a mutable operation, but it is safe to do because createSlice uses Immer under the hood, which allows us to write "mutating" logic that updates the state directly, while actually keeping the state immutable
        }, //we are incrementing the data property of the state object by the specified amount
        decrement: (state, action) => {
            state.data -= action.payload
        } //we are decrementing the data property of the state object by the specified amount
    }
});

export const { increment, decrement } = counterSlice.actions;

export function incrementLegacy(amount = 1) {
    return { type: 'increment', payload: amount };
}

export function decrementLegacy(amount = 1) {
    return { type: 'decrement', payload: amount };
}

export default function counterReducer(state = initialState,
    action: { type: string; payload: number }) {
    switch (action.type) {
        case 'increment':
            return {
                ...state, //create a new state object with the same properties as the old one
                data: state.data + action.payload
            }; //we are incrementing the data property of the state object by the specified amount
            break;

        case 'decrement':
            return {
                ...state, //create a new state object with the same properties as the old one
                data: state.data - action.payload
            }; //we are decrementing the data property of the state object by the specified amount
        default:
            return state;
    }
}
