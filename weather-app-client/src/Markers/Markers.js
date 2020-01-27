import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Markers.css";

import { Marker } from "react-map-gl";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

function Markers(props) {
  const [open, setOpen] = useState(false);
  const { data } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2)
    }
  }))(MuiDialogContent);

  return data.map(location => (
    <Marker
      key={location.id}
      latitude={location.coord.lat}
      longitude={location.coord.lon}
    >
      <img
        className="location-img"
        src={
          "http://openweathermap.org/img/w/" + location.weather[0].icon + ".png"
        }
        alt={location.weather[0].icon}
        onClick={handleOpen}
      ></img>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Location Details
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <img
              src={
                "http://openweathermap.org/img/w/" +
                location.weather[0].icon +
                ".png"
              }
              alt={location.weather[0].icon}
            />
          </Typography>
          <Typography gutterBottom>
            {location.name || ""},{location.sys.country || ""}
          </Typography>
          <Typography gutterBottom color="initial">
            {location.weather[0].main}
          </Typography>
          <Typography gutterBottom color="textSecondary">
            {location.weather[0].description}
          </Typography>
          <Typography gutterBottom>
            Temperature: {Math.round(location.main.temp - 273) * 100/100.00} C
          </Typography>
          <Typography gutterBottom>
            Feels Like:
            {Math.round(location.main.feels_like - 273) * 100/100.00}C
          </Typography>
          <Typography gutterBottom>High: {Math.round(location.main.temp_max - 273) * 100/100.00}C</Typography>
          <Typography gutterBottom>Low: {Math.round(location.main.temp_min - 273) * 100/100.00}C</Typography>
          <Typography gutterBottom>Sunrise: {location.sys.sunrise}</Typography>
          <Typography gutterBottom>Sunset: {location.sys.sunset}</Typography>
        </DialogContent>
      </Dialog>
    </Marker>
  ));
}
export default Markers;
