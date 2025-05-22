import React, { useState } from 'react';
import {IonFab, IonFabButton, IonIcon,} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import ScheduleList from '../schedules/ScheduleList';
import ScheduleFormModal from '../schedules/ScheduleFormModal';
import { Schedule } from '../../types/Schedule';
import './StoreTabs.css';


interface SchedulesTabProps {
  onAddScheduleClick: () => void;
  onEditSchedule: (scheduleId: string) => void;
  onDeleteSchedule: (scheduleId: string) => void;
}

const SchedulesTab: React.FC<SchedulesTabProps> = ({
                                                     onAddScheduleClick,
                                                     onEditSchedule,
                                                     onDeleteSchedule,
                                                   }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();

  const handleSaveSchedule = (schedule: Schedule) => {
    console.log('Saving schedule:', schedule);
    setIsModalOpen(false);
    setEditingSchedule(undefined);
  };

  const handleEditClick = (scheduleId: string) => {
    onEditSchedule(scheduleId);
    // You would typically fetch the schedule data here
    // For now, we'll just open the modal
    setEditingSchedule(undefined); // Replace with actual schedule data
    setIsModalOpen(true);
  };

  return (
    <div className="tab-content">
      <ScheduleList
        onEditSchedule={handleEditClick}
        onDeleteSchedule={onDeleteSchedule}
      />

      <ScheduleFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSchedule(undefined);
        }}
        onSave={handleSaveSchedule}
        schedule={editingSchedule}
      />

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setIsModalOpen(true)}>
          <IonIcon icon={addOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default SchedulesTab;
