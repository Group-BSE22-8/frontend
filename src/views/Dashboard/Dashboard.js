import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import TopBar from "../../components/navigation/appbar";
import SideBar from "../../components/navigation/sidebar";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { MDBDataTable } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { Avatar } from "@mui/material";
import cluster from "../images/cluster.png";
import project from "../images/project.png";
import application from "../images/app.png";
import users from "../images/users.png";
import resource from "../images/resource.png";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Hub } from "@mui/icons-material";
import { userCount, clusterMetrics, projectCount, appCount, databaseCount, getLogs } from "./store";
import Cookies from 'universal-cookie'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';


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


const date = new Date();
const month = parseInt(date.getMonth() + 1) < 10 ? "-0" + parseInt(date.getMonth() + 1) : "-" + parseInt(date.getMonth() + 1);
const day = date.getDate()  < 10 ? "-0" + date.getDate()  : "-" + date.getDate();
const today = date.getFullYear() + month + day;

const theme = createTheme();


function DashboardContent() {
  const store = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clusters, setClusters] = React.useState([]);
  const [cluster_count, setClusterCount] = React.useState(0);
  const [mem, setMem] = React.useState(0);
  const [maxmem, setMaxMem] = React.useState(0);
  const [disk, setDisk] = React.useState(0);
  const [maxdisk, setMaxDisk] = React.useState(0);
  const [cpu, setCPU] = React.useState(0);
  const [maxcpu, setMaxCPU] = React.useState(0);
  const [logs, setLogs] = React.useState([]);
  const [log_start, setLogStart] = React.useState('');
  const [log_end, setLogEnd] = React.useState('');
  const [log_min_date, setLogMinDate] = React.useState('');

  const cookies = new Cookies()

  React.useEffect(() => {
    dispatch(userCount())
    dispatch(appCount())
    dispatch(projectCount())
    dispatch(databaseCount())
    dispatch(clusterMetrics())
    dispatch(getLogs())

    addClusters();
    addLogs();
  }, [store.all_logs.length, store.cluster_data.length, log_start, log_end])


  const addClusters = () => {
    var clusters = [];
    var count = 0;
    var mem_total = 0;
    var maxmem_total = 0;
    var disk_total = 0;
    var maxdisk_total = 0;
    var cpu_total = 0;
    var maxcpu_total = 0;

    for (var i = 0; i < store.cluster_data.length; i++) {
      var cluster = {};

      cluster.id = store.cluster_data[i].id
      cluster.maxmem = (store.cluster_data[i].maxmem / 1073741824).toFixed(2) + " GB";
      cluster.mem = (store.cluster_data[i].mem / 1073741824).toFixed(2) + " GB";
      cluster.maxdisk = (store.cluster_data[i].maxdisk / 1073741824).toFixed(2) + " GB";
      cluster.disk = (store.cluster_data[i].disk / 1073741824).toFixed(2) + " GB";
      cluster.maxcpu = store.cluster_data[i].maxcpu;
      cluster.cpu = store.cluster_data[i].cpu;
      cluster.status = store.cluster_data[i].status;
      cluster.uptime = (store.cluster_data[i].uptime / 3600).toFixed(2) + " hr";
      
      clusters.push(cluster);

      mem_total = mem_total + store.cluster_data[i].mem;
      maxmem_total =  maxmem_total + store.cluster_data[i].maxmem;
      disk_total =  disk_total + store.cluster_data[i].disk;
      maxdisk_total =  maxdisk_total + store.cluster_data[i].maxdisk;
      cpu_total =  cpu_total + store.cluster_data[i].cpu;
      maxcpu_total =  maxcpu_total + store.cluster_data[i].maxcpu;

      count++;
    }

    setClusterCount(count);
    setClusters(clusters);
    setMem(mem_total);
    setMaxMem(maxmem_total);
    setDisk(disk_total);
    setMaxDisk(maxdisk_total);
    setCPU(cpu_total);
    setMaxCPU(maxcpu_total);
  }



  const addLogs = () => {
    var logs = [];
           
    for (var i = 0; i < store.all_logs.length; i++) {
      var date = new Date(store.all_logs[i].date_created).toLocaleDateString()
      if(!(date >= log_start && date <= log_end) && log_start != '' && log_end != '') {
        continue;
      }

      var log = {};

      log.performed_by = store.all_logs[i].user;
      log.entity_name = store.all_logs[i].entity;
      log.action = store.all_logs[i].action;
      log.comment = store.all_logs[i].comment;
      log.date_created = store.all_logs[i].date_created;
      
      logs.push(log);
    }

    setLogs(logs);
  }


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


  const setLogDate = (event) => {
    setLogMinDate(event.target.value)
  };

  //setInterval(dispatch(getLogs()), 150000);



  const COLORS = ['#0088FE', '#FFBB28'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  

  const memory = [
    {
      name: "used",
      value: mem
    },
    {
      name: "remaining",
      value: maxmem-mem
    }
  ];

  const disc = [
    {
      name: "used",
      value: disk
    },
    {
      name: "remaining",
      value: maxdisk-disk
    }
  ];


  const activity = [
    {
      name: "used",
      value: cpu
    },
    {
      name: "remaining",
      value: maxcpu-cpu
    }
  ];

  const cluster_data = {
    columns: [
      {
        label: "Id",
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: "Maximum Memory",
        field: "maxmem",
        sort: "asc",
        width: 100,
      },
      {
        label: "Memory",
        field: "mem",
        sort: "asc",
        width: 100,
      },
      {
        label: "Maximum CPU",
        field: "maxcpu",
        sort: "asc",
        width: 100,
      },
      {
        label: "CPU",
        field: "cpu",
        sort: "asc",
        width: 100,
      },
      {
        label: "Maximum Disk",
        field: "maxdisk",
        sort: "asc",
        width: 100,
      },
      {
        label: "Disk",
        field: "disk",
        sort: "asc",
        width: 100,
      },
      {
        label: "Uptime",
        field: "uptime",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      }
    ],
    rows: clusters
  };
  

  const all_logs = {
    columns: [
      {
        label: "Performed By",
        field: "performed_by",
        sort: "asc",
        width: 150,
      },
      {
        label: "Entity Name",
        field: "entity_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 270,
      },
      {
        label: "Comment",
        field: "comment",
        sort: "asc",
        width: 270,
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
          <Container sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="clusters"
                      src={cluster}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Clusters:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{cluster_count}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="projects"
                      src={project}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Projects:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.projects}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="applications"
                      src={application} 
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Applications:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.applications}</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="users"
                      src={users}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Users:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.users}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="Resources"
                      src={resource}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Databases:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.databases}</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
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
                  <b>Cluster Information</b>
                </Typography>
                <Hub sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <MDBDataTable striped bordered small hover data={cluster_data} />
              </CardContent>
            </Card>
            
            <Card sx={{ marginTop: 3 }}>
              <Box
                sx={{
                  fontSize: 10,
                  display: "flex",
                  backgroundColor: "#008ac1",
                  paddingLeft: 2,
                }}
              >
                <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
                  <b>System status</b>
                </Typography>
                <EqualizerIcon sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <Grid container spacing={3}>
                  {/*<Grid item xs={12} sm={3} md={3} lg={3}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <BarChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                            top: 10,
                            right: 40,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="pv" fill="#008ac1" />
                        </BarChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        Network Usage
                      </Typography>
                    </Paper>
                        </Grid>*/}

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <PieChart width={800} height={400}>
                          <Pie
                            data={memory}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {memory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        Memory Usage
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <PieChart width={800} height={400}>
                          <Pie
                            data={disc}
                            //cx={120}
                            //cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {disc.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        Disk Usage
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <PieChart width={800} height={400}>
                          <Pie
                            data={activity}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {activity.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        CPU Usage
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

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

                <MDBDataTable striped bordered small hover data={all_logs} />
              </CardContent>
            </Card>
            <Copyright sx={{ pt: 4, mb: 4,  bottom:0, width:"100%", height:60}} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
