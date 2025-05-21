import { IonList } from '@ionic/react';
import React from 'react';
import { mockSchedules } from '../../data/mockSchedules'; // Import mock schedules
import { Schedule } from '../../types/Schedule'; // Import Schedule type
import ScheduleCard from './ScheduleCard'; // Import ScheduleCard

interface ScheduleListProps {
  onEditSchedule: (scheduleId: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ onEditSchedule }) => {
  const schedules: Schedule[] = mockSchedules; // Use mock schedules

  return (
    <IonList lines="none"> {/* Remove default list lines */}
      {schedules.map(schedule => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          onEditClick={onEditSchedule}
        />
      ))}
    </IonList>
  );
};

export default ScheduleList;
