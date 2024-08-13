import EmptyBadge from "../../resources/assets/badges/empty_badge.min.svg";
import FailBadge from "../../resources/assets/badges/fail.svg";
import SuccessBadge from "../../resources/assets/badges/success.svg";
import WildLifeBadge from "../../resources/assets/badges/wildlife.svg";
import ShelterBadge from "../../resources/assets/badges/shelter.svg";
import NavigationBadge from "../../resources/assets/badges/navigation.svg";
import { BadgeType } from "../../types/BadgeType";
import styles from "./DashboardBadge.module.scss";

interface DashboardBadgeProps {
  "data-testid"?: string;
  type?: BadgeType;
}

const DashboardBadge = ({
  "data-testid": dataTestId = "DashboardBadge",
  type = BadgeType.EMPTY_BADGE,
}: DashboardBadgeProps) => {
  const renderBadge = (badgeType: BadgeType) => {
    switch (badgeType) {
      case BadgeType.WILDLIFE_BADGE:
        return WildLifeBadge;
      case BadgeType.SHELTER_BADGE:
        return ShelterBadge;
      case BadgeType.NAVIGATION_BADGE:
        return NavigationBadge;
      case BadgeType.FAIL_BADGE:
        return FailBadge;
      case BadgeType.SUCCESS_BADGE:
        return SuccessBadge;
      default:
        return EmptyBadge;
    }
  };

  return (
    <div className={styles.DashboardBadge} data-testid={dataTestId}>
      <img src={renderBadge(type)} className={styles.svgBadge} alt="badge" />
    </div>
  );
};

export default DashboardBadge;
