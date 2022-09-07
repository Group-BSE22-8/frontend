import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TopBar from "../../components/navigation/appbar";
import SideBar from "../../components/navigation/sidebar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Graph from "./Graph";
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import { MDBDataTable } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import { clusterStatus, clusterLogs } from "./store";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Hub } from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import Modal from '@mui/material/Modal';
import cluster from "../images/cluster.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Crane Cloud
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Sample data
const data1 = [
  { argument: "Monday", value: 60 },
  { argument: "Tuesday", value: 70 },
  { argument: "Wednesday", value: 20 },
  { argument: "Thursday", value: 50 },
  { argument: "Friday1", value: 80 },
  { argument: "Friday2", value: 90 },
  { argument: "Friday2", value: 40 },
];
// Sample data
const data2 = [
  { argument: "Monday", value: 60 },
  { argument: "Tuesday", value: 80 },
  { argument: "Wednesday", value: 30 },
  { argument: "Thursday", value: 70 },
  { argument: "Friday1", value: 50 },
  { argument: "Friday2", value: 90 },
  { argument: "Friday2", value: 45 },
];
// Sample data
const data3 = [
  { argument: "Monday", value: 20 },
  { argument: "Tuesday", value: 70 },
  { argument: "Wednesday", value: 35 },
  { argument: "Thursday", value: 90 },
  { argument: "Friday1", value: 30 },
  { argument: "Friday2", value: 100 },
  { argument: "Friday2", value: 60 },
];


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const date = new Date();
const month = parseInt(date.getMonth() + 1) < 10 ? "-0" + parseInt(date.getMonth() + 1) : "-" + parseInt(date.getMonth() + 1);
const day = date.getDate()  < 10 ? "-0" + date.getDate()  : "-" + date.getDate();
const today = date.getFullYear() + month + day;

const theme = createTheme();

function Infrastructure(props) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.infrastructure);
  const [uptime, setUptime] = React.useState([]);
  const [probability, setProbability] = React.useState(0);
  const [logs, setLogs] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [log_start, setLogStart] = React.useState('');
  const [log_end, setLogEnd] = React.useState('');
  const [log_min_date, setLogMinDate] = React.useState('');


  React.useEffect(() => {
    addStatusMetrics();
    dispatch(clusterLogs())
    addLogs();

  }, [store.status.length, store.cluster_logs.length, log_start, log_end])


  const handleClose = () => {
    setOpen(false);
  }
  

  const handleOpen = () => {
      setOpen(true);
  };

  
  const addStatusMetrics = () => {
    var status = [];
    var uptime = 0;
    var total = 0;
    var probability = 0;
           
    for (var i = 0; i < store.status.length; i++) {
      var  obj = {};

      if (store.status[i].status == "success") {
        uptime = uptime + 1;
      }

      obj.name = store.status[i].date_created;
      obj.value = store.status[i].status == "success" ? 1 : 0;
      status.push(obj);

      total++;
    }

    /*var test = {}
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);
    test.value = 0;
    status.push(test);*/


    if (uptime > 0) {
      probability = (uptime / total) * 100;

    } else {
      probability = 0;

    }
    
    setUptime(status);
    setProbability(probability);
  }


  const addLogs = () => {
    var logs = [];
    var cluster_status = store.cluster_logs.length > 0 && store.cluster_logs[0].status == "success" ? "online" : "offline";

    for (var i = 0; i < store.cluster_logs.length; i++) {
      var date = new Date(store.cluster_logs[i].date_created).toLocaleDateString()
      if(!(date >= log_start && date <= log_end) && log_start != '' && log_end != '') {
        continue;
      }

      var log = {};

      log.cluster_name = store.cluster_logs[i].cluster_id;
      log.status = store.cluster_logs[i].status == "success" ? "online" : "offline";
      log.date_created = store.cluster_logs[i].date_created;
      
      logs.push(log);
    }

    setLogs(logs);
    setStatus(cluster_status)
  }


  const handleChange = (event) => {
    setName(event.target.value)

    dispatch(clusterStatus({
      cluster_id: event.target.value
    }))
  }

  const setLogDate = (event) => {
    setLogMinDate(event.target.value)
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

     if (data.get("date1") && data.get("date2")) {
      setLogStart(new Date(data.get("date1")).toLocaleDateString());
      setLogEnd(new Date(data.get("date2")).toLocaleDateString());

    } else {
      setLogStart("");
    }
  };


  const cluster_logs = {
    columns: [
      {
        label: "Cluster Name",
        field: "cluster_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date Created",
        field: "date_created",
        sort: "asc",
        width: 100,
      }
    ],
    rows: logs
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar />
        <SideBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 2, mb: 4}}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                  <Graph data={uptime} title="Uptime" xaxis = {"Date"} yaxis = {"Status"}/>
              </Box>
            </Modal>

            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                mb={3}
                mt={4}
                ml={2}
                mr={4}
                component={Paper}
                elevation={4}
                sx={{ height: 300, pr: 2}}
              >
                <Typography sx={{ textAlign: "center", mb: 2, backgroundColor: "#008ac1", color: "#fff", borderRadius: 2}}>
                  <b>Select Clusters</b>
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cluster</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Clusters"
                   onChange={handleChange}
                    >
                    {store.clusters.map((value) => {
                      return (
                        <MenuItem value={value.name}>{value.name}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Typography sx={{textAlign: "center", mt: 2, mb: 2, backgroundColor: "#008ac1", color: "#fff", borderRadius: 2}}>
                  <b>Create Nodes</b>
                </Typography>
              </Grid>

              <Grid                 
                item
                xs={8}
                mb={3}
                mt={2}
              >
                <Card>
                  <Box
                    sx={{
                      fontSize: 10,
                      display: "flex",
                      backgroundColor: "#008ac1",
                      paddingLeft: 3,
                    }}
                  >
                    <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
                      <b>Cluster{"  "+ name}</b>
                    </Typography>
                    <Hub sx={{ color: "#fff", marginRight: 2 }} />
                  </Box>

                  {uptime.length > 0 ? 
                  <CardContent>
                      <Grid container>
                        {/*<Typography sx={{ fontSize: 15, marginLeft: 5, marginRight: 3 }}>
                          <b>Nodes: </b>
                          <em className="text-secondary" style={{ fontSize: 22 }}>
                            <b>{cluster.node}</b>
                          </em>
                          {""}
                        </Typography>*/}
                        <Typography sx={{ fontSize: 15,  marginLeft: 5, marginRight: 3 }}>
                          <b>Active Nodes: </b>
                          <span className="text-primary" style={{ fontSize: 18 }}>
                            {" "}
                          </span>
                        </Typography>
                        <Typography sx={{ fontSize: 15, marginRight: 3 }}>
                          <b>Probability of uptime:</b>
                          <span className="text-info" style={{ fontSize: 18 }}>
                            {" "}
                            <b>{probability}%</b>{" "}
                          </span>
                        </Typography>
                        <Typography sx={{ fontSize: 15, marginRight: 3 }}>
                          <b>Status:</b>
                          {" "}
                          <span className={status == "online" ? "text-success" : "text-danger"} style={{ fontSize: 18 }}>
                            <b>{status}</b>
                          </span>
                        </Typography>
                      </Grid>

                      <Grid container>
                        <Grid item xs ={6} mt={2} mb={2}>
                          <ButtonBase component = "div">
                            <Paper
                              sx={{
                                height: 160,
                                width: 300,
                              }}
                              onClick={() => handleOpen()}
                            >
                              <Graph data={uptime} title="Uptime" xaxis = {"Date"} yaxis = {"Status"}/>
                            </Paper>
                          </ButtonBase>
                        </Grid>

                        <Grid item xs ={6} mt={2} mb={2}>
                          <ButtonBase component = "div">
                            <Paper
                              sx={{
                                height: 160,
                                width: 300,
                              }}
                              onClick={() => {}}
                            >
                              <Graph data={data1} title="Network Activity" xaxis = {"Date"} yaxis = {"Activity"}/>
                            </Paper>
                          </ButtonBase>
                        </Grid>
                      </Grid>

                      <Grid container>
                        {" "}
                        <Grid item xs ={6} mt={2} mb={2}>
                          <ButtonBase component = "div">
                            <Paper
                              sx={{
                                height: 160,
                                width: 300,
                              }}
                              onClick={() => {}}
                            >
                              <Graph data={data2} title="Load" xaxis = {"Date"} yaxis = {"Load"}/>
                            </Paper>
                          </ButtonBase>
                        </Grid>
                        <Grid item xs ={6} mt={2} mb={2}>
                          <ButtonBase component = "div">
                            <Paper
                              sx={{
                                height: 160,
                                width: 300,
                              }}
                              onClick={() => {}}
                            >
                              <Graph data={data3} title="Memory" xaxis = {"Date"} yaxis = {"Memory"}/>
                            </Paper>
                          </ButtonBase>
                        </Grid>
                      </Grid>
                  </CardContent>
                  : 
                  <CardContent sx={{ height: 300}}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        variant="square"
                        sx={{ mt: 6, width: 100, height: 100 }}
                        alt="clusters"
                        src={cluster}
                      />
                      <Typography sx = {{mt: 2,color: "#e6e6e6"}}>Please select a cluster.</Typography>
                    </Stack>
                  </CardContent> }
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ marginTop: 3 }}>
              <Box
                sx={{
                  fontSize: 10,
                  display: "flex",
                  backgroundColor: "#008ac1",
                  paddingLeft: 3,
                }}
              >
                <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
                  <b>Recent Activity</b>
                </Typography>
                <LocalActivityIcon sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <Box 
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}              
                  sx={{mb: 2, mt: 2}}>
                  <TextField
                    name="date1"
                    label="Start"
                    type="date"
                    //defaultValue="2017-05-24"
                    onChange={setLogDate}
                    sx={{ width: 220 }}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}

                    inputProps={{
                      max: today
                    }}
                  />
                  <TextField
                    name="date2"
                    label="End"
                    type="date"
                    //defaultValue="2017-05-24"
                    disabled = {log_min_date ? false : true}
                    size="small"
                    sx={{ width: 220, ml: 2, height: 20}}
                    InputLabelProps={{
                      shrink: true,
                    }}

                    inputProps={{
                      min: log_min_date,
                      max: today
                    }}
                  />
                  <Button type="submit" variant="outlined" sx={{ mt: 0.1, ml: 2 }} startIcon={<SearchIcon />}>Filter</Button>
                </Box>
                <MDBDataTable striped bordered small  data = {cluster_logs}/>
              </CardContent>
            </Card>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Infrastructure;