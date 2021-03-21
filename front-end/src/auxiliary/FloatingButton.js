import Fab from "@material-ui/core/Fab";
import "./FloatingButton.css"

export default function FloatingButton() {


    return (
    <div class = "floatbutton">
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
        size = "large"
        href = "/login"
        >
             Login Now
        </Fab>
        </div>
   
    )}