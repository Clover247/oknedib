
import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography, TextField, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetContentPlansByProjectIdQuery, useCreateContentPlanMutation, useUpdateContentPlanMutation, useDeleteContentPlanMutation, useUploadContentPlanFileMutation } from '../../../shared/api/contentPlansApi';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import DeleteIcon from '@mui/icons-material/Delete';

interface ProjectContentPlanTabProps {
  projectId: string;
}

const columns: GridColDef[] = [
  { field: 'month', headerName: 'Month', width: 100, editable: true, type: 'number' },
  { field: 'year', headerName: 'Year', width: 100, editable: true, type: 'number' },
  { field: 'status', headerName: 'Status', width: 150, editable: true },
  { field: 'totalPosts', headerName: 'Total Posts', width: 120, editable: true, type: 'number' },
  { field: 'completedPosts', headerName: 'Completed Posts', width: 150, editable: true, type: 'number' },
  { field: 'totalStories', headerName: 'Total Stories', width: 120, editable: true, type: 'number' },
  { field: 'completedStories', headerName: 'Completed Stories', width: 150, editable: true, type: 'number' },
  { field: 'progress', headerName: 'Progress (%)', width: 120 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => {
      const [uploadFile] = useUploadContentPlanFileMutation();
      const [deleteContentPlan] = useDeleteContentPlanMutation();

      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          try {
            await uploadFile({ itemId: params.row.id, file }).unwrap();
            alert('File uploaded successfully!');
          } catch (error) {
            console.error('Failed to upload file:', error);
            alert('Failed to upload file.');
          }
        }
      };

      const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this content plan?')) {
          await deleteContentPlan(params.id as string);
        }
      };

      return (
        <>
          <input
            accept="*/*"
            style={{ display: 'none' }}
            id={`upload-button-${params.row.id}`}
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor={`upload-button-${params.row.id}`}>
            <IconButton component="span">
              <CloudUploadIcon />
            </IconButton>
          </label>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      );
    },
  },
];

export const ProjectContentPlanTab: React.FC<ProjectContentPlanTabProps> = ({ projectId }) => {
  const { data: contentPlans, isLoading, isError } = useGetContentPlansByProjectIdQuery(projectId);
  const [newMonth, setNewMonth] = useState('');
  const [newYear, setNewYear] = useState('');
  const [createContentPlan] = useCreateContentPlanMutation();
  const [updateContentPlan] = useUpdateContentPlanMutation();

  const handleCreateContentPlan = async () => {
    if (newMonth && newYear) {
      await createContentPlan({ projectId, month: parseInt(newMonth), year: parseInt(newYear) });
      setNewMonth('');
      setNewYear('');
    }
  };

  const handleProcessRowUpdate = async (newRow: any) => {
    await updateContentPlan(newRow);
    return newRow;
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error loading content plans.</Typography>;
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h5" gutterBottom>Content Plans</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Month"
          type="number"
          value={newMonth}
          onChange={(e) => setNewMonth(e.target.value)}
          sx={{ width: 100 }}
        />
        <TextField
          label="Year"
          type="number"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
          sx={{ width: 100 }}
        />
        <Button variant="contained" onClick={handleCreateContentPlan}>Create Content Plan</Button>
      </Box>
      <DataGrid
        rows={contentPlans || []}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error: any) => console.error(error)}
      />
    </Box>
  );
};
