import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import React from 'react';
import { Schedule } from '../../types/Schedule';
import './ScheduleCard.css'; // Import the CSS for styling

interface ScheduleCardProps {
  schedule: Schedule;
  onEditClick: (scheduleId: string) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  onEditClick,
}) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if card becomes clickable later
    onEditClick(schedule.id);
  };

  return (
    <IonCard className="schedule-card">
      <IonCardHeader>
        <IonCardTitle>{schedule.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="schedule-details">
          <IonText color="medium">
            <p className="schedule-time">
              {schedule.startTime} - {schedule.endTime}
            </p>
          </IonText>
          <IonText color="medium">
            <p className="schedule-products">
              {schedule.productIds.length} Product(s)
            </p>
          </IonText>
          {/* Display days if needed, perhaps in a more compact way */}
          {/* <IonText color="medium">
            <p className="schedule-days">{schedule.days.join(', ')}</p>
          </IonText> */}
        </div>
        {/* Make the entire actions div clickable */}
        <div className="schedule-actions" onClick={handleEditClick}>
          <IonButton fill="clear" size="small">
            <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            {/* <IonLabel>Edit</IonLabel> Add label if preferred */}
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ScheduleCard;
