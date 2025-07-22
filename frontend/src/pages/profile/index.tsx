
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useUpdateProfileMutation, useUploadAvatarMutation } from '../../shared/api/usersApi';
import { setCredentials } from '../../app/store';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const updatedUser = await updateProfile(values).unwrap();
        dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    },
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const updatedUser = await uploadAvatar(file).unwrap();
        dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
      } catch (error) {
        console.error('Failed to upload avatar:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar src={user?.avatarUrl} sx={{ width: 100, height: 100, mr: 2 }} />
        <Button variant="contained" component="label">
          Upload Avatar
          <input type="file" hidden onChange={handleAvatarUpload} />
        </Button>
        {isUploading && <CircularProgress sx={{ ml: 2 }} />}
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          disabled
        />
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin="normal"
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </form>
    </Box>
  );
};
