import React, {useState} from 'react';
import {IonFab, IonFabButton, IonIcon, useIonAlert, useIonToast,} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import ScheduleList from './ScheduleList';
import ScheduleFormModal from './ScheduleFormModal';
import {Schedule} from '../../types/Schedule';
import '../store/StoreTabs.css';
import {mockSchedules} from "../../data/mockSchedules";


const SchedulesTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const handleSaveSchedule = (schedule: Schedule) => {
    console.log('Saving schedule:', schedule);
    setIsModalOpen(false);
    setEditingSchedule(undefined);
  };

  const handleEditClick = (scheduleId: string) => {
    console.log('Edit Schedule clicked for ID:', scheduleId);
    const scheduleToEdit = mockSchedules.find(s => s.id === scheduleId);
    if (scheduleToEdit) {
      setEditingSchedule(scheduleToEdit);
      setIsModalOpen(true);
    }
  };

  const onDeleteSchedule = (scheduleId: string) => {
    presentAlert({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this schedule?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            presentToast({
              message: 'Deletion cancelled',
              duration: 1500,
              position: 'bottom',
              color: 'medium',
            });
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting schedule with ID:', scheduleId);
            // Implement actual deletion logic here
            // For now, just show a success toast
            presentToast({
              message: 'Schedule deleted successfully',
              duration: 1500,
              position: 'bottom',
              color: 'success',
            });
          },
        },
      ],
    });
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
