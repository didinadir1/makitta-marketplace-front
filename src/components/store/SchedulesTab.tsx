import React, {useState} from 'react';
import {IonFab, IonFabButton, IonIcon,} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import ScheduleList from '../schedules/ScheduleList';
import ScheduleFormModal from '../schedules/ScheduleFormModal';
import {Schedule} from '../../types/Schedule';
import './StoreTabs.css';
import {mockSchedules} from "../../data/mockSchedules";


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
    const scheduleToEdit = mockSchedules.find(s => s.id === scheduleId);
    if (scheduleToEdit) {
      setEditingSchedule(scheduleToEdit);
      setIsModalOpen(true);
    }
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
