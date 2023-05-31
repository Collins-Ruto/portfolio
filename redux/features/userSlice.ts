import type { User } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DummyUser } from "~/types/types";

const initialState = {
    value: DummyUser
}

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload
        },
        removeUser: (state) => {
            state.value = DummyUser
        }
    }
})

export const { setUser, removeUser } = user.actions
export default user.reducer