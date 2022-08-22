import Search from "@mui/icons-material/Search";
import { Paper, InputBase, Divider, IconButton} from "@mui/material";


export default function SearchField(){
    return <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search Google Maps"
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <Search/>
    </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
  </Paper>
;
}