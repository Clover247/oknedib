
import React, { useState } from 'react';
import { Box, CircularProgress, Typography, Tabs, Tab } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '../../shared/api/projectsApi';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const project = projects?.find(p => p.id === id);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !project) {
    return <Typography color="error">Project not found or error loading.</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>{project.name}</Typography>
      <Typography variant="body1" color="text.secondary">{project.description}</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
        <Tabs value={value} onChange={handleChange} aria-label="project details tabs">
          <Tab label="Tasks" {...a11yProps(0)} />
          <Tab label="Content Plan" {...a11yProps(1)} />
          <Tab label="Finances" {...a11yProps(2)} />
          <Tab label="Settings" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {id && <ProjectTasksTab projectId={id} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {id && <ProjectContentPlanTab projectId={id} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Finances Content
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Settings Content
      </CustomTabPanel>
    </Box>
  );
};
