import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface PieChartProps {
    title: string;
    data: { name: string; value: number }[];
}

const COLORS = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#00BCD4', '#795548'];

const SimplePieChart: React.FC<PieChartProps> = ({ title, data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const sortedData = [...data].sort((a, b) => b.value - a.value);

    let cumulativePercentage = 0;
    const segments = sortedData.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const startAngle = cumulativePercentage * 3.6; // Convert to degrees
        const endAngle = (cumulativePercentage + percentage) * 3.6;
        cumulativePercentage += percentage;
        
        return {
            ...item,
            percentage: percentage.toFixed(1),
            color: COLORS[index % COLORS.length],
            startAngle,
            endAngle
        };
    });

    const createPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(centerX, centerY, radius, endAngle);
        const end = polarToCartesian(centerX, centerY, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        
        return [
            "M", centerX, centerY,
            "L", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");
    };

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                    {segments.map((segment, index) => (
                        <path
                            key={index}
                            d={createPath(100, 100, 80, segment.startAngle, segment.endAngle)}
                            fill={segment.color}
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    ))}
                </svg>
                <Box sx={{ flex: 1 }}>
                    {segments.map((segment, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    bgcolor: segment.color,
                                    borderRadius: '50%',
                                    mr: 1
                                }}
                            />
                            <Typography variant="body2" sx={{ flex: 1 }}>
                                {segment.name}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {segment.percentage}%
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

export default SimplePieChart;