
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../shared/api/tasksApi';
import { useGetUsersQuery } from '../shared/api/usersApi';

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  task?: any; 
  projectId: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ open, onClose, task, projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [assigneeId, setAssigneeId] = useState<string | null>(null);

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'TODO');
      setAssigneeId(task.assigneeId || null);
    } else {
      setTitle('');
      setDescription('');
      setStatus('TODO');
      setAssigneeId(null);
    }
  }, [open, task]);

  const handleSubmit = async () => {
    try {
      const taskData = { title, description, status, assigneeId, projectId };

      if (task) {
        await updateTask({ id: task.id, ...taskData }).unwrap();
      } else {
        await createTask(taskData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {task ? 'Edit Task' : 'Create New Task'}
        </Typography>
        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
        <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" multiline rows={3} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="IN_REVIEW">In Review</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
            <MenuItem value="ABANDONED">Abandoned</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Assignee</InputLabel>
          {isLoadingUsers ? <CircularProgress /> : (
            <Select value={assigneeId || ''} label="Assignee" onChange={(e) => setAssigneeId(e.target.value || null)}>
              <MenuItem value=""><em>None</em></MenuItem>
              {users?.map(user => (
                <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isCreating || isUpdating} sx={{ mt: 2 }}>
          {isCreating || isUpdating ? 'Saving...' : (task ? 'Save Changes' : 'Create Task')}
        </Button>
      </Box>
    </Modal>
  );
};
