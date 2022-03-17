import { useContext } from 'react';
import { RolloutContext } from './RolloutContext';

export const useFlags = () => useContext(RolloutContext);
