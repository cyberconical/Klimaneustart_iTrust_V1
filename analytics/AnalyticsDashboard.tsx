import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "./StatCard";
import SimpleBarChart from "./SimpleBarChart";
import SimplePieChart from "./SimplePieChart";
import { Assessment, PeopleAlt, AccessTimeFilled, Timelapse } from "@mui/icons-material";
import { useLanguage } from "../components/LanguageContext";
import {AnalyticsData} from "../types.ts";
import axios from "../components/authentication/axios.tsx";
import {TOPIC_DEFINITIONS} from "../constants.ts";

const AnalyticsDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

    const mapTopicDetails = (topics: { name: string; value: number }[]): { name: string; value: number }[] => {
        return topics.map(entry => ({
            name: t(TOPIC_DEFINITIONS.filter(value => value.id === entry.name)[0]?.nameKey) || entry.name,
            value: entry.value
        }));
    }

    const getAnalyticsData = async () => {
        try {
            const response = await axios.post(
                "/conversations/analytics",
                {},
                {
                    headers: {
                        withCredentials: true,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setLoading(false);
                setData(await response.data)
            } else {
                const errorData = await response.data;
                setLoading(false);
                throw new Error(errorData.message);
            }
        } catch (error) {
            setLoading(false);
            console.log("Error fetching analytics data:", error);
        }
    }

    useEffect(() => {
        getAnalyticsData();
    }, []);

  if (loading || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {t("analytics.analyticsDashboard")}
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12}>
          <StatCard
            title={t("analytics.totalMinutes")}
            value={data.totalMinutes}
            icon={<Timelapse />}
            color="#F44336"
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title={t("analytics.totalDialogues")}
            value={data.totalDialogues}
            icon={<Assessment />}
            color="#2196F3"
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title={t("analytics.totalParticipants")}
            value={data.totalParticipants}
            icon={<PeopleAlt />}
            color="#4CAF50"
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title={t("analytics.avgDuration")}
            value={data.avgDuration}
            icon={<AccessTimeFilled />}
            color="#FF9800"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <SimplePieChart title={t("analytics.topDiscussedTopics")} data={ mapTopicDetails(data.topTopics) } />
        </Grid>
        <Grid xs={12} md={6}>
          <SimplePieChart
            title={t("analytics.dialoguesPerDistrict")}
            data={data.dialoguesByDistrict}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SimplePieChart
            title={t("analytics.topInterestAreas")}
            data={data.topInterestAreas}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
