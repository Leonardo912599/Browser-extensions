import { useState, useEffect } from "react";
import { Container, Box, Button, Card, Typography, Grid } from "@mui/material";
import CardEntension from "./components/CardEntension";
import { useSelector, useDispatch } from "react-redux";
import { changeStatus } from "./store/extensionSlice";


const App = () => {

  const [mode, setMode] = useState("dark");
  const dispatch = useDispatch()
  const [filtro, setFiltro] = useState('all')
  const extensions = useSelector(state => state.extensions.extensions)

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  const filtrarExtensions = extensions.filter(e => {
    if (filtro === 'inactive') {
      return e.status === false
    } else if (filtro === 'active') {
      return e.status === true
    } else {
      return true
    }
  })

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', backgroundColor: mode === 'dark' ? '#00112b' : 'white' }}>
      <Box sx={{ p: 8, backgroundColor: mode === 'dark' ? '#00112b' : 'white' }}>
        <Card sx={{ display: "flex", justifyContent: "space-between", p: 2, backgroundColor: mode === 'dark' ? '#1d2637' : 'white' }}>
          <img src={ mode === 'dark' ? 'logo-dark.svg' : 'logo.svg'} sx={{ width: 100, color: mode === 'dark' ? 'white' : 'blue' }} />
          <Button onClick={toggleMode} variant="contained"
            sx={{ minWidth: 48, width: 48, backgroundColor: mode === 'dark' ? 'hsl(225, 23%, 24%)' : 'hsl(0, 0%, 93%)' , height: 48, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box component="img" src={mode === "dark" ? "/icon-sun.svg" : "/icon-moon.svg"}
              alt="theme icon" sx={{ width: 24, height: 24, objectFit: 'contain' }}
            />
          </Button>
        </Card>
        <Box sx={{ py: 4 }}>
          <Box sx={{
            display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between' }}>
          <Typography mb={{xs:2}} textAlign={'center'} color={mode === 'dark' ? 'white' : 'black'} fontWeight={'bold'} variant="h5">Extensions List</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button sx={{ borderRadius: 5, fontSize: 15, color: mode === 'dark' ? 'white' : '#023068', backgroundColor: filtro === 'all' ? 'hsl(3, 71%, 56%)' : mode === 'dark' ? '#1d2637' : 'white' }} variant="contained"
              onClick={() => setFiltro('all')}>All</Button>
            <Button sx={{ borderRadius: 5, fontSize: 15, color: mode === 'dark' ? 'white' : '#023068', backgroundColor: filtro === 'active' ? 'hsl(3, 71%, 56%)' : mode === 'dark' ? '#1d2637' : 'white' }} variant="contained"
              onClick={() => setFiltro('active')}>Active</Button>
            <Button sx={{ borderRadius: 5, fontSize: 15, color: mode === 'dark' ? 'white' : '#023068', backgroundColor: filtro === 'inactive' ? 'hsl(3, 71%, 56%)' : mode === 'dark' ? '#1d2637' : 'white' }} variant="contained"
              onClick={() => setFiltro('inactive')}>Inactive</Button>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {
          filtrarExtensions.map((e, i) => (
            <Grid key={i} size={{ xs: 12, sm: 4 }}>
              <CardEntension
                key={i}
                mode={mode}
                title={e.title}
                description={e.description}
                isActive={e.status}
                image={e.image}
                onToggle={() => dispatch(changeStatus(e.title))} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
    </Container >
  );
};

export default App;

