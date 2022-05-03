import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationCard from "./cardNotification";
import axios from "axios";
import NotificationSkeleton from "./notificationSkeleton";
import EmptySpace from "../_EmptySpaces/emptySpace";
import { NotificationPageStyle } from "./notificationStyling";
import { useSelector } from "react-redux";
import { notificationEmpty } from "../_EmptySpaces/EmptySvg";

function NotificationPage({ setDrawer }) {
  const [notifications, setNotifications] = useState();
  const token = useSelector((state) => state.loginlogoutReducer.token);

  useEffect(() => {
    const fetch_notification = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/send_notification`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    };
    fetch_notification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ===========================================================================================
  console.log(notifications);
  const classes = NotificationPageStyle();
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.headingContainer}>
        <Typography className={classes.heading}>Notifications</Typography>
        <IconButton onClick={() => setDrawer(false)}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Box>
        {typeof notifications === "undefined" ? (
          Array.from(new Array(6)).map((data, index) => {
            return <NotificationSkeleton key={index} />;
          })
        ) : notifications.length > 0 ? (
          notifications.map((data, index) => {
            if (data) {
              return (
                <NotificationCard
                  data={data}
                  key={index}
                  index={index}
                  setNotifications={setNotifications}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <EmptySpace source={notificationEmpty.notification} />
        )}
      </Box>
    </Box>
  );
}
export default NotificationPage;
