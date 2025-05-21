import {
  IonCard, 
  IonCardContent, 
  IonCardTitle, 
  IonIcon, 
  IonItem, 
  IonItemOption, 
  IonItemOptions, 
  IonItemSliding, 
  IonText
} from '@ionic/react';
import {createOutline, trashOutline} from 'ionicons/icons';
import React from 'react';
import {Schedule} from '../../types/Schedule';
import './ScheduleCard.css'; // Import the CSS for styling

interface ScheduleCardProps {
  schedule: Schedule;
  onEditClick: (scheduleId: string) => void;
  onDeleteClick?: (scheduleId: string) => void;
}

// Define a list of colors for the badges
const badgeColors = [
  '#FF6347', // Tomato
  '#4682B4', // SteelBlue
  '#32CD32', // LimeGreen
  '#FFD700', // Gold
  '#6A5ACD', // SlateBlue
  '#FF8C00', // DarkOrange
  '#00CED1', // DarkTurquoise
];

const ScheduleCard: React.FC<ScheduleCardProps> = ({
                                                     schedule,
                                                     onEditClick,
                                                     onDeleteClick,
                                                   }) => {
  const handleEditClick = () => {
    onEditClick(schedule.id);
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(schedule.id);
    }
  };

  // Determine the color based on the schedule index (for demonstration)
  // In a real app, you might want a more robust way to assign colors
  const scheduleIndex = parseInt(schedule.id.replace('sch', ''), 10) - 1; // Simple way to get an index from mock ID
  const badgeColor = badgeColors[scheduleIndex % badgeColors.length];


  return (
    <IonItemSliding>
      {/* Left side swipe options (appears when swiping right-to-left) */}
      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={handleEditClick}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>
      </IonItemOptions>

      {/* The card content */}
      <IonItem lines="none" className="ion-no-padding">
        <IonCard className="schedule-card">
          {/* Colored Badge */}
          <div className="schedule-badge" style={{ backgroundColor: badgeColor }}></div>

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
      </IonItem>

      {/* Right side swipe options (appears when swiping left-to-right) */}
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={handleDeleteClick}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ScheduleCard;
