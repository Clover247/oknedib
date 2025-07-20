
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
} from '@mui/material';
import { useCreateProjectMutation } from '../shared/api/projectsApi';

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
  project?: any; // Optional: for editing existing project
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

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ open, onClose, project }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState(project?.status || 'ACTIVE');
  const [budget, setBudget] = useState(project?.budget || 0);
  const [budgetForTargeting, setBudgetForTargeting] = useState(project?.budgetForTargeting || 0);
  const [startDate, setStartDate] = useState(project?.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '');
  const [endDate, setEndDate] = useState(project?.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '');

  const [createProject, { isLoading }] = useCreateProjectMutation();

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setDescription(project.description || '');
      setStatus(project.status || 'ACTIVE');
      setBudget(project.budget || 0);
      setBudgetForTargeting(project.budgetForTargeting || 0);
      setStartDate(project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '');
      setEndDate(project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '');
    } else {
      // Reset form for new project
      setName('');
      setDescription('');
      setStatus('ACTIVE');
      setBudget(0);
      setBudgetForTargeting(0);
      setStartDate('');
      setEndDate('');
    }
  }, [open, project]);

  const handleSubmit = async () => {
    try {
      const newProject = {
        name,
        description,
        status,
        budget: parseFloat(budget.toString()),
        budgetForTargeting: parseFloat(budgetForTargeting.toString()),
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      };
      await createProject(newProject).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="project-form-title"
      aria-describedby="project-form-description"
    >
      <Box sx={style}>
        <Typography id="project-form-title" variant="h6" component="h2" gutterBottom>
          {project ? 'Edit Project' : 'Create New Project'}
        </Typography>
        <TextField
          fullWidth
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as string)}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="ARCHIVED">Archived</MenuItem>
            <MenuItem value="PAUSED">Paused</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Budget for Targeting"
          type="number"
          value={budgetForTargeting}
          onChange={(e) => setBudgetForTargeting(parseFloat(e.target.value))}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Saving...' : (project ? 'Save Changes' : 'Create Project')}
        </Button>
      </Box>
    </Modal>
  );
};
