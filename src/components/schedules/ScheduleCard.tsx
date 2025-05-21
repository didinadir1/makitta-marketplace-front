import {IonButton, IonCard, IonCardContent, IonCardTitle, IonIcon, IonText,} from '@ionic/react';
import {createOutline} from 'ionicons/icons';
import React from 'react';
import {Schedule} from '../../types/Schedule';
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
      <IonCardContent>
        <div className="schedule-details">
          <IonCardTitle>{schedule.name}</IonCardTitle>

          <div className="schedule-time">
            <IonText color="medium">
              <p className="schedule-time">
                {schedule.startTime} - {schedule.endTime}
              </p>
            </IonText>
          </div>
        </div>
        {/* Product count with "x Products" format and styling */}
        <div className="product-count-display">
          <IonText color="dark">
            <p>{schedule.productIds.length} Products</p>
          </IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ScheduleCard;
