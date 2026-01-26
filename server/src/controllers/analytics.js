const getAnalyticsData = (conversations) => {
    const dashboardData = {};

    dashboardData.totalDialogues = conversations.length;
    dashboardData.avgDuration = getAvgDuration(conversations);
    dashboardData.totalParticipants = conversations.reduce((sum, convo) => sum + (convo.numPeople || 1), 0);
    dashboardData.dialoguesByDistrict = getDialoguesByDistricts(conversations);
    dashboardData.topTopics = getTopTopics(conversations);
    dashboardData.topInterestAreas = [];
    dashboardData.initiativeEngagement = { recommended: 0, selected: 0 };

    return dashboardData;
};

const getAvgDuration = (conversations) => {
    if (conversations.length === 0) {
        return 0
    }
    const totalDuration = conversations.reduce((sum, convo) => sum + (convo.duration || 0), 0);
    return Math.round(totalDuration / conversations.length);
}

const getDialoguesByDistricts = (conversations)  =>{
    return Object.entries(
        conversations
            .map(convo => convo.districts?.[0])
            .filter(Boolean)
            .reduce((acc, district) => {
                acc[district] = (acc[district] || 0) + 1;
                return acc;
            }, [])
    ).map(([name, value]) => ({name, value}));
}

const getTopTopics = (conversations = [])  =>{
    return Object.entries(
        (conversations || [])
            .flatMap(convo => Object.keys(convo.topicDetails || {}))
            .filter(Boolean)
            .reduce((acc, topic) => {
                acc[topic] = (acc[topic] || 0) + 1;
                return acc;
            }, [])
    ).map(([name, value]) => ({name, value}));
}

export { getAnalyticsData };
