
import { useAppSelector } from './hooks';
import { selectCurrentUser } from './store';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  return { 
    user, 
    isAdmin: user?.role === 'ADMIN', 
    isManager: user?.role === 'MANAGER', 
    isSpecialist: user?.role === 'SPECIALIST' 
  };
};
