import React from 'react';
import {
  IonButton,
  IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import ScheduleList from '../schedules/ScheduleList';
import './StoreTabs.css';

interface SchedulesTabProps {
  onAddScheduleClick: () => void;
  onEditSchedule: (scheduleId: string) => void;
  onDeleteSchedule: (scheduleId: string) => void;
}

const SchedulesTab: React.FC<SchedulesTabProps> = ({ 
  onAddScheduleClick, 
  onEditSchedule, 
  onDeleteSchedule 
}) => {
  return (
    <div className="tab-content">
      <div className="add-button-container add-schedule-button-container">
        <IonButton onClick={onAddScheduleClick}>
          <IonIcon slot="start" icon={addOutline}></IonIcon>
          Add New Schedule
        </IonButton>
      </div>
      <ScheduleList
        onEditSchedule={onEditSchedule}
        onDeleteSchedule={onDeleteSchedule}
      />
    </div>
  );
};

export default SchedulesTab;
