import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "../../resources/assets/lottie";
import { ROUTES } from "../../resources/constants/routes-constants";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate(ROUTES.HOMEPAGE_ROUTE);
  };

  return (
    <div className={styles.NotFoundPage}>
      <div className={styles.lottieContainer}>
        <p
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 46,
            position: "absolute",
            top: 180,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "20px 40px",
            borderRadius: 12,
            background: "rgba(0, 0, 0, 0.6)",
            boxShadow:
              "0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)",
            fontFamily: "'Orbitron', sans-serif",
            textAlign: "center",
            textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
            border: "2px solid #00ffff",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/stardust.png')",
            backgroundSize: "cover",
          }}
        >
          {"🪐 It looks like you're lost in Space! 🪐"}
        </p>
        <div style={{ backgroundColor: "gray" }}>
          <Player
            src={lottie.CompassNotFound}
            autoplay
            loop
            className={styles.layeredLottiePlayer}
          />
        </div>
      </div>

      <Button
        variant="contained"
        onClick={redirectToHomePage}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#00ffff",
          fontSize: "22px",
          fontFamily: "'Orbitron', sans-serif",
          padding: "12px 24px",
          borderRadius: "12px",
          border: "2px solid #00ffff",
          boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
          textTransform: "none",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow =
            "0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff";
        }}
      >
        🚀 Go Back to Your Spaceship
      </Button>
    </div>
  );
};

export default NotFoundPage;
