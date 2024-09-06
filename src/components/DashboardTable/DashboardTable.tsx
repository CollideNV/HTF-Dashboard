import { Player } from "@lottiefiles/react-lottie-player";
import {
  Grow,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useCallback, useMemo, useRef } from "react";
import lottie from "../../resources/assets/lottie";
import { BadgeType } from "../../types/BadgeType";
import { Team } from "../../types/Team";
import DashboardBadge from "../DashboardBadge/DashboardBadge";
import styles from "./DashboardTable.module.scss";
import { Problem } from "../../types/Problem";
import { Mission } from "../../types/Mission";

interface DashboardTableProps {
  "data-testid"?: string;
  teams?: Team[];
}

const DashboardTable: FC<DashboardTableProps> = ({
  "data-testid": dataTestId = "DashboardTable",
  teams = [],
}) => {
  const containerRef = useRef(null);

  const renderTableHeaders = useMemo(() => {
    const problemHeaders: string[] = [];
    teams[0]?.problems.map((p) => problemHeaders.push(p.name));

    return (
      <>
        <TableCell className={styles.tableHeaderCell}>
          <span className={styles.tableHeaderText}>Rank</span>
        </TableCell>
        <TableCell className={styles.tableHeaderCell}>
          <span className={styles.tableHeaderText}>Team</span>
        </TableCell>
        {problemHeaders.map((header, i) => (
          <TableCell className={styles.tableHeaderProblemCell} key={i}>
            <span className={styles.tableHeaderText}>{header}</span>
          </TableCell>
        ))}
        <TableCell className={styles.tableHeaderCell}>
          <span className={styles.tableHeaderText}>Score</span>
        </TableCell>
      </>
    );
  }, [teams]);

  const getBadgeType = (mission: Mission, badgeType: BadgeType): BadgeType => {
    if (mission.solved == null) return BadgeType.EMPTY_BADGE;

    return mission.solved
      ? badgeType === BadgeType.NULL
        ? BadgeType.SUCCESS_BADGE
        : badgeType
      : BadgeType.FAIL_BADGE;
  };

  const renderedBadges = useCallback((missions: Mission[], badgeType: BadgeType) => {
    const renderBadge = (mission: Mission, badgeType: BadgeType) => {
      const checked = mission.solved == null;

      return (
        <>
          <Grow
            in={checked}
            mountOnEnter
            unmountOnExit
            timeout={{ appear: 100, enter: 100, exit: 0 }}
          >
            <span>
              <DashboardBadge type={BadgeType.EMPTY_BADGE} />
            </span>
          </Grow>
          <Grow
            in={!checked}
            mountOnEnter
            unmountOnExit
            timeout={{ appear: 100, enter: 250, exit: 0 }}
          >
            <span>
              <DashboardBadge type={getBadgeType(mission, badgeType)} />
            </span>
          </Grow>
          {mission.solved && (
            <Player
              src={lottie.CentralConfetti}
              autoplay
              className={styles.confetti}
            />
          )}
        </>
      );
    };

    return (
      <div className={styles.badge_container}>
        {missions.map((mission, i) => (
          <div key={i} className={styles.badge}>
            {renderBadge(mission, badgeType)}
          </div>
        ))}
      </div>
    );
  }, []);

  const RenderTableRow = useCallback(
    (index: number, team: Team) => {
      return (
        <TableRow>
          <TableCell className={styles.tableCell}>
            <span className={styles.collideText}>{index + 1}.</span>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <span className={styles.teamText}>{team.name}</span>
          </TableCell>
          {team.problems.map((problem: Problem, i: number) => {
            return (
              <TableCell key={i} className={styles.badgesCell}>
                {renderedBadges(problem.mission, problem.badgeUrl)}
              </TableCell>
            );
          })}
          <TableCell className={styles.tableCell}>
            <span className={styles.collideText}>{team.score}</span>
          </TableCell>
        </TableRow>
      );
    },
    [renderedBadges]
  );

  const renderTableRows = useMemo(() => {
    const tableRows = [];

    for (let index = 0; index < teams.length; index++) {
      tableRows.push(
        <Slide
          direction="up"
          mountOnEnter
          unmountOnExit
          key={index}
          in
          container={containerRef.current}
        >
          {RenderTableRow(index, teams[index])}
        </Slide>
      );
    }

    return <>{tableRows}</>;
  }, [RenderTableRow, teams]);

  const renderTable = useMemo(() => {
    return (
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>{renderTableHeaders}</TableRow>
          </TableHead>
          <TableBody>{renderTableRows}</TableBody>
        </Table>
      </TableContainer>
    );
  }, [renderTableHeaders, renderTableRows]);

  const RenderedNoEntries = () => (
    <div className={styles.noEntries}>
      <Player
        src={lottie.Compass}
        autoplay
        loop
        className={styles.MagicBookLottie}
      />
      <h2>Team Progress will be displayed here.</h2>
    </div>
  );

  return (
    <div
      className={styles.DashboardTable}
      data-testid={dataTestId}
      ref={containerRef}
    >
      {teams.length ? renderTable : <RenderedNoEntries />}
    </div>
  );
};

export default DashboardTable;
