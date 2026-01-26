import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { COLORS } from "../../constants";
import { useLanguage } from "../LanguageContext";

let editNotes = "/icons/note_in_folder_icon.png";
let piechartIcon = "/icons/pie_chart_icon.png";
let listIcon = "/icons/list.png";

interface BottomNavigationBarProps {
  currentView: "dialogue" | "dashboard" | "myDialogues";
  onTabChange: (view: "dialogue" | "dashboard" | "myDialogues") => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  currentView,
  onTabChange,
}) => {
  const { t } = useLanguage();
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "dialogue" | "dashboard" | "myDialogues"
  ) => {
    onTabChange(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{ width: "100%" }}
        value={currentView}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label={t("dialogue.newDialogue")}
          value="dialogue"
          icon={<img src={editNotes} width={24} height={24}></img>}
          color={currentView === "dialogue" ? '#0c328a' : undefined }
          sx={currentView === "dialogue" && { background: COLORS.grey2, border:"3px solid #0c328a", borderRadius: "4px" }}
        />
        <BottomNavigationAction
            label={t("dialogue.myDialogues")}
            value="myDialogues"
            icon={<img src={listIcon} width={24} height={24}></img>}
            color={currentView === "myDialogues" ? '#0c328a' : undefined }
            sx={currentView === "myDialogues" && { background: COLORS.grey2, border:"3px solid #0c328a", borderRadius: "4px" }}
        />
        <BottomNavigationAction
          label={t("analytics.analyticsDashboard")}
          value="dashboard"
          icon={<img src={piechartIcon} width={24} height={24}></img>}
          color={currentView === "dashboard" ? '#0c328a' : undefined }
          sx={currentView === "dashboard" ? { background: COLORS.grey2, border: "3px solid #0c328a", borderRadius: "4px" } : undefined}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
