import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataForATF } from "../../AStatemanagement/Actions/userActions";

// ===============================================================
// PRODUCT DATA BY PRODUCT ID

const CardContentNoPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 8px;
  }
`);
const useStyles = makeStyles({
  image: {
    width: "100%",
    objectFit: "contain",
  },
});

export default function FavouritesCard(props) {
  // console.log(props.cardData);
  // =============================================CARD DATA==============================================================================================
  const Image = props.cardData.images[0];
  const title =
    props.cardData.title.charAt(0).toUpperCase() +
    props.cardData.title.slice(1);
  const date = new Date(props.cardData.createdAt);
  const properDate = `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  //  ============================================================================================================================================
  const isLoggedIn = useSelector((state) => state.loginlogoutReducer.isLogin);
  const token = useSelector((state) => state.loginlogoutReducer.token);
  const dispatch = useDispatch();
  //   // =========================================================================================================================================

  const removeFromFavouritesHandler = () => {
    // console.log("likeButtonHandler");
    if (isLoggedIn) {
      const likeData = { productId: props.cardData._id, userToken: token };
      dispatch(
        fetchDataForATF({
          ...likeData,
          isLiked: false,
        })
      );
    }
  };
  const Classes = useStyles();

  return (
    <div
      style={{
        maxWidth: "280px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Card sx={{ maxwidth: "280px", borderRadius: 1 }} elevation={3}>
        <Link to={`/ProductDiscription/${props.cardData._id}`}>
          <CardMedia
            component="img"
            classes={{ img: Classes.image }}
            width="280px"
            sx={{ height: { xs: "160px", sm: "180px" } }}
            image={Image}
            alt="Image"
          />
        </Link>
        <CardContentNoPadding
          sx={{ bgcolor: "#f5f5f5", pt: 0, px: 1, display: "flex" }}
        >
          <Box
            sx={{
              maxwidth: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                maxWidth: { xs: 100, sm: 140 },
                fontWeight: "bold",
                fontSize: { xs: "small", md: "default" },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 155,
                fontSize: { xs: "x-small", sm: "default" },
              }}
            >
              {properDate}
            </Typography>
          </Box>

          <CardActions
            disableSpacing
            sx={{
              bgcolor: "#f5f5f5",
              justifyContent: "flex-end",
              flexGrow: 1,
              pt: 0,
              pb: 0,
            }}
          >
            <IconButton
              aria-label="share"
              sx={{
                color: "#512da8",
                p: { xs: "4px", sm: "8px" },
              }}
            >
              <ShareIcon sx={{ fontSize: { xs: "medium", sm: "large" } }} />
            </IconButton>
          </CardActions>
        </CardContentNoPadding>
      </Card>

      <div style={{ zIndex: 11, position: "absolute", right: "0px" }}>
        <IconButton onClick={removeFromFavouritesHandler}>
          <CloseIcon sx={{ fontSize: "28px" }} />
        </IconButton>
      </div>
    </div>
  );
}