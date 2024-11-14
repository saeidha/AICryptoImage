import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

interface CollectionProps {
  items: { title: string; description: string }[]; // Define the shape of the items prop
}

const Collection = ({ items }: CollectionProps) => {
  return (
    
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={14} sm={3} md={3} key={index}>
          <Card>
            <CardMedia
              sx={{ height: 200 }}
              image="./images.jpg"
            />
            <CardContent sx={{ paddingTop: 2 }}>
              <Typography gutterBottom variant="h5" component="div">
                title
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                description
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                price
              </Typography>
            </CardContent>
            <CardActions sx={{alignItems: "center", paddingTop: 2}}>
              <Button size="small" 
              variant="contained" 
              color="success"
              sx={{ height:40, width: '100%'}}
              >Buy</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default Collection;
