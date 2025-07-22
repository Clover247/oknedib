
import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetProjectsQuery } from '../../shared/api/projectsApi';
import { ProjectFormModal } from '../../widgets/ProjectFormModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/useAuth';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'endDate', headerName: 'End Date', width: 150 },
];

export const ProjectsPage = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleRowClick = (params: { id: string }) => {
    navigate(`/projects/${params.id}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error loading projects.</Typography>;
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Projects</Typography>
        {isAdmin && <Button variant="contained" onClick={handleOpenModal}>Create Project</Button>}
      </Box>
      <DataGrid rows={projects || []} columns={columns} onRowClick={handleRowClick} />

      <ProjectFormModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};
