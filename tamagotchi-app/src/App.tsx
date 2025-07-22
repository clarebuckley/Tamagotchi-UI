
import Checklist from "./components/Checklist.js";
import Tamagotchi from "./components/Tamagotchi.js";
import { ChecklistApi } from "./services/checklist.api.js";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [checklist, setChecklist] = useState([]);


  useEffect(() => {
    ChecklistApi.getAll().then(response => {
      setChecklist(response);
      setIsLoading(false);
      console.log(checklist)
    })
  }, [])

  return (
    <div className="app-container">
      <h1>TAMAGOTCHI</h1>
      <Grid container spacing={3}>
        <Grid size={6}>
          {!isLoading &&
            <Checklist tasks={checklist} />}
          {isLoading &&
            <CircularProgress />}
        </Grid>
        <Grid size="grow">
          <Tamagotchi />
        </Grid>
      </Grid>
    </div>

  );
}

export default App;
