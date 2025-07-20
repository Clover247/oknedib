
import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetTasksByProjectIdQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../../../shared/api/tasksApi';

interface ProjectTasksTabProps {
  projectId: string;
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200, editable: true },
  { field: 'description', headerName: 'Description', width: 300, editable: true },
  { field: 'status', headerName: 'Status', width: 150, editable: true },
  { field: 'dueDate', headerName: 'Due Date', width: 150, editable: true },
  { field: 'assigneeId', headerName: 'Assignee', width: 150, editable: true },
];

export const ProjectTasksTab: React.FC<ProjectTasksTabProps> = ({ projectId }) => {
  const { data: tasks, isLoading, isError } = useGetTasksByProjectIdQuery(projectId);
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = async () => {
    if (newTaskTitle.trim()) {
      await createTask({ projectId, title: newTaskTitle });
      setNewTaskTitle('');
    }
  };

  const handleProcessRowUpdate = async (newRow: any) => {
    await updateTask(newRow);
    return newRow;
  };

  // TODO: Add delete functionality

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error loading tasks.</Typography>;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h5" gutterBottom>Tasks</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleCreateTask}>Add Task</Button>
      </Box>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error: any) => console.error(error)}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {/* TODO: Add delete functionality */}
    </Box>
  );
};
