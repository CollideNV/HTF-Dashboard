import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Dashboard.module.scss";

import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Grow } from "@mui/material";
import BriefingText from "../../components/BriefingText/BriefingText";
import Countdown from "../../components/Countdown/Countdown";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { useGetDashboardQuery } from "../../redux/services/dashboardApi";
import lottie from "../../resources/assets/lottie";
import logoCollide from "../../resources/assets/logo-collide.png";
import briefingImg from "../../resources/assets/briefing.png";
import countDownClock from "../../resources/assets/clock-countdown.png";
import { API_ROUTES } from "../../resources/constants/api-constants";
import environment from "../../resources/constants/environment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Team } from "../../types/Team";
import { Problem } from "../../types/Problem";
import { Mission } from "../../types/Mission";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  width: "100%",
  maxWidth: "1024px",
  padding: "20px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "70vh",
  overflowY: "auto",
  borderRadius: "20px",
};
const deadline = environment.deadline;

const DashboardPage: FC = () => {
  const { data, isLoading, refetch, isSuccess } = useGetDashboardQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      pollingInterval: 30000,
    }
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `${environment.dashboard_api.websocket}${API_ROUTES.MESSAGES_ROUTE}`
    );
    const wsCurrent = ws.current;

    return () => {
      wsCurrent?.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    //keep websocket alive
    const interval = setInterval(() => {
      ws.current?.send("ping");
    }, 30000);

    const listener = () => {
      console.log(`UPDATE RECIEVED: ${new Date()}`);
      refetch();
    };

    ws.current.addEventListener("message", listener);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  const getFilteredTeams = useMemo(() => {
    if (!isSuccess || !data) return [];

    let updatedData: Team[] = [];
    (data as Team[]).forEach((team: Team) => {
      let teamScore: number = 0;
      team.problems.forEach((problem: Problem) => {
        problem.mission.forEach((mission: Mission) => {
          if (mission.solved === true) {
            teamScore += mission.difficulty;
          }
        });
      });
      const updatedTeam: Team = { ...team, score: teamScore };
      updatedData.push(updatedTeam);
    });

    return updatedData
      .filter((team) => team.problems.length > 0)
      .sort((a, b) => b.score - a.score);
  }, [data, isSuccess]);

  const renderedBody = useMemo(
    () => (
      <>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Player
              autoplay
              loop
              src={lottie.Compass}
              style={{ height: 300 }}
            />
            <h2>Loading Dashboard</h2>
          </div>
        ) : (
          <DashboardTable teams={getFilteredTeams} />
        )}
      </>
    ),
    [isLoading, getFilteredTeams]
  );
  return (
    <div className={styles.HomePage}>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img
              src={logoCollide}
              className={styles.headerImgIcon}
              alt="Logo"
            />
            Collide Space Center
          </div>
          <div className={styles.countdown}>
            <img
              src={countDownClock}
              className={styles.headerImgIcon}
              alt="Clock"
            />
            <div className={styles.textContainer}>
              <div className={styles.time}>
                <Countdown targetDate={deadline} />
              </div>
              <div className={styles.deadline}>Deadline HTF &apos;24</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {/* <div className={styles.dashboardTitle}>EPIC DASHBOARD OF DISCOVERY</div> */}

        <Grow timeout={1000}>{renderedBody}</Grow>
        <div>
          <Button onClick={handleOpen} style={{ color: "#f98100" }}>
            Open Briefing
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <BriefingText />
            </Box>
          </Modal>
        </div>
      </div>
      <img
        src={briefingImg}
        width="40px"
        height="40px"
        className={styles.briefingIcon}
        onClick={handleOpen}
        alt="briefing"
      />
    </div>
  );
};

export default DashboardPage;
