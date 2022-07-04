import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import TopBar from '../conponents/navigation/appbar';
import SideBar from '../conponents/navigation/sidebar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Crane Cloud
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar/>
        <SideBar/>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container  sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs ={12} sm ={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    height: 200,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs ={12} sm ={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    height: 200,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs ={12} sm ={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    height: 200,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs ={12} sm ={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    height: 200,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs ={12} sm ={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
