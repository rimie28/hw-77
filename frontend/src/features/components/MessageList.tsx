import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../messagesSlice.ts';
import {AppDispatch, RootState} from '../../app/store.ts';
import Grid from "@mui/material/Grid2";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

const MessageList: React.FC = () => {
    const messages = useSelector((state: RootState) => state.messages.messages);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    return (
        <Grid container spacing={2} sx={{
            flexDirection: 'column', alignItems: 'flex-start'}}>
            {messages.map((message: any) => (
                <Card key={message.id} variant="elevation" >
                    <CardActionArea>
                        <CardMedia>
                            {message.image && (
                                <img
                                    height="160"
                                    width="100%"
                                    src= {`http://localhost:8000${message.image}`}
                                    alt={message.author}
                                    className="img-fluid"
                                />
                            )}
                        </CardMedia>
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary'}} >{message.author || 'Anonymous'}</Typography>
                        <Typography gutterBottom variant="h5" component="div" >{message.message}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Grid>
    );
};

export default MessageList;