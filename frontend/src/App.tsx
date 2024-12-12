import MessageForm from './features/components/MessageForm.tsx';
import MessageList from './features/components/MessageList.tsx';
import Grid from "@mui/material/Grid2";

const App = () => {
    return (
        <Grid container={true} sx={{
            flexDirection: 'column'}} spacing={2}>
            <MessageForm />
            <MessageList />
        </Grid>
    );
};

export default App;