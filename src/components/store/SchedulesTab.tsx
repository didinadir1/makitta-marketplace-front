import React from 'react';
import {IonFab, IonFabButton, IonIcon,} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
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
                                                     onDeleteSchedule,
                                                   }) => {

  return (

    <div className="tab-content">
      {/* Schedule List Component */}
      <ScheduleList
        onEditSchedule={onEditSchedule}
        onDeleteSchedule={onDeleteSchedule} // Pass delete handler
      />

      {/* Floating Action Button for Add Schedule */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={onAddScheduleClick}>
          <IonIcon icon={addOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default SchedulesTab;
