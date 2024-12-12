import axiosAPI from "../axiosAPI.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export interface Message {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export interface MessagesSlice {
    messages: Message[];
    loading: boolean;
}

const initialState: MessagesSlice = {
    messages: [],
    loading: false,
}

export const getMessages = createAsyncThunk<Message[]>('messages/getMessages', async () => {
    const response = await axiosAPI.get<Message[]>('/messages');
    return response.data;
});

export const addMessage = createAsyncThunk<Message, FormData>('messages/addMessages', async (formData: FormData) => {
    const response = await axiosAPI.post<Message>('/messages', formData);
    return response.data;
});

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
    }
})

export const messagesReducer = messagesSlice.reducer;
