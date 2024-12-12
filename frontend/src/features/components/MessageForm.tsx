import React, {ChangeEvent, useState} from 'react';
import FileInput from '../../components/FileInput/FileInput.tsx';
import {MessageMutation} from "../../types";
import Grid from '@mui/material/Grid2';
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {addMessage} from "../messagesSlice.ts";
import {AppDispatch} from "../../app/store.ts";

const initialState:MessageMutation = {
    author: '',
    message: '',
    image: null
}

const AddMessageForm: React.FC = () => {
    const [form, setForm] = useState<MessageMutation>(initialState);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('author', form.author || 'anonymous');
        formData.append('message', form.message);
        if (form.image) {
            formData.append('image', form.image);
        }

        try {
            await dispatch(addMessage(formData));
            setForm(initialState);
        } catch (error) {
            console.error(error);
        }
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form,
            [name]: value});
    }

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0] || null
            }));
        }
    };

    return (
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid>
                <TextField
                    placeholder="Author"
                    variant="outlined"
                    type="text"
                    value={form.author}
                    name="author"
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid >
                <TextField
                    placeholder="Message"
                    variant="outlined"
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={inputChangeHandler}
                    required
                />
            </Grid>
            <FileInput onChange={fileEventChangeHandler} name="image" label="image"/>
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Grid>
    );
};

export default AddMessageForm;
