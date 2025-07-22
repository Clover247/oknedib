
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGetTasksByProjectIdQuery, useUpdateTaskMutation } from '../../../shared/api/tasksApi';
import { Box, CircularProgress, Typography, Paper, Avatar, Tooltip, Button } from '@mui/material';
import { TaskFormModal } from '../../../widgets/TaskFormModal';

const columnStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 8px',
  width: 300,
  minHeight: 500,
  backgroundColor: '#f4f5f7',
  borderRadius: '4px',
  padding: '8px',
};

const taskStyles = {
  userSelect: 'none',
  padding: '16px',
  margin: '0 0 8px 0',
  minHeight: '50px',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  '&:hover': {
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
};

const statusMap: { [key: string]: string } = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  ABANDONED: 'Abandoned',
};

export const ProjectTasksTab = ({ projectId }: { projectId: string }) => {
  const { data: tasks, isLoading, isError } = useGetTasksByProjectIdQuery(projectId);
  const [updateTask] = useUpdateTaskMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const handleOpenModal = (task: any | null = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const task = tasks?.find(t => t.id === draggableId);
    if (task) {
      updateTask({ ...task, status: destination.droppableId });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error loading tasks.</Typography>;

  const columns = {
    TODO: tasks?.filter(t => t.status === 'TODO') || [],
    IN_PROGRESS: tasks?.filter(t => t.status === 'IN_PROGRESS') || [],
    IN_REVIEW: tasks?.filter(t => t.status === 'IN_REVIEW') || [],
    DONE: tasks?.filter(t => t.status === 'DONE') || [],
    ABANDONED: tasks?.filter(t => t.status === 'ABANDONED') || [],
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => handleOpenModal()}>Create Task</Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          {Object.keys(columns).map(columnId => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ ...columnStyles, backgroundColor: snapshot.isDraggingOver ? '#e9e9e9' : '#f4f5f7' }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>{statusMap[columnId]}</Typography>
                  {columns[columnId as keyof typeof columns].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ ...taskStyles, backgroundColor: snapshot.isDragging ? '#d3e4ff' : 'white' }}
                          onClick={() => handleOpenModal(task)}
                        >
                          <Typography variant="subtitle1" sx={{ mb: 1 }}>{task.title}</Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>{task.description}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {task.assignee && (
                              <Tooltip title={`${task.assignee.firstName} ${task.assignee.lastName}`}>
                                <Avatar sx={{ width: 32, height: 32 }}>{task.assignee.firstName.charAt(0)}</Avatar>
                              </Tooltip>
                            )}
                          </Box>
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
      <TaskFormModal open={isModalOpen} onClose={handleCloseModal} task={selectedTask} projectId={projectId} />
    </Box>
  );
};
