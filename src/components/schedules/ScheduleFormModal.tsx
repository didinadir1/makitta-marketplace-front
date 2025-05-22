import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonChip,
  IonText,
  IonInput
} from '@ionic/react';
import { closeOutline, saveOutline } from 'ionicons/icons';
import { Product } from '../../types/Product';
import { useProductContext } from '../../state/productState';
import { Schedule } from '../../types/Schedule';
import './ScheduleFormModal.css';

interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: Schedule) => void;
  schedule?: Schedule;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ScheduleFormModal: React.FC<ScheduleFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  schedule
}) => {
  const { products } = useProductContext();
  const [name, setName] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (schedule) {
      setName(schedule.name);
      setSelectedDays(schedule.days);
      setStartTime(schedule.startTime);
      setEndTime(schedule.endTime);
      setSelectedProducts(schedule.productIds);
    } else {
      resetForm();
    }
  }, [schedule, isOpen]);

  const resetForm = () => {
    setName('');
    setSelectedDays([]);
    setStartTime('08:00');
    setEndTime('17:00');
    setSelectedProducts([]);
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => prev.includes(day) 
      ? prev.filter(d => d !== day)
      : [...prev, day]
    );
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => prev.includes(productId)
      ? prev.filter(id => id !== productId)
      : [...prev, productId]
    );
  };

  const handleSave = () => {
    const newSchedule: Schedule = {
      id: schedule?.id || Date.now().toString(),
      name,
      days: selectedDays,
      startTime,
      endTime,
      productIds: selectedProducts
    };
    
    onSave(newSchedule);
    resetForm();
  };

  const isValid = name.trim() && selectedDays.length > 0 && selectedProducts.length > 0;

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className="schedule-form-modal"
      breakpoints={[0, 0.8, 1]}
      initialBreakpoint={0.8}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{schedule ? 'Edit Schedule' : 'New Schedule'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="full" className="ion-padding-horizontal">
          {/* Name Field */}
          <IonItem>
            <IonLabel position="stacked">Schedule Name</IonLabel>
            <IonInput
              value={name}
              placeholder="e.g., Lunch Hours"
              onIonChange={e => setName(e.detail.value!)}
            />
          </IonItem>

          {/* Days Selection */}
          <div className="form-section">
            <IonText className="section-label">Active Days</IonText>
            <div className="days-container">
              {daysOfWeek.map(day => (
                <IonChip
                  key={day}
                  outline={!selectedDays.includes(day)}
                  color="primary"
                  onClick={() => toggleDay(day)}
                >
                  {day.slice(0, 3)}
                </IonChip>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="form-section">
            <IonText className="section-label">Active Hours</IonText>
            <div className="time-pickers">
              <IonItem>
                <IonLabel>From</IonLabel>
                <IonDatetime
                  presentation="time"
                  value={startTime}
                  onIonChange={e => setStartTime(e.detail.value!.split('T')[1].slice(0,5))}
                />
              </IonItem>
              <IonItem>
                <IonLabel>To</IonLabel>
                <IonDatetime
                  presentation="time"
                  value={endTime}
                  onIonChange={e => setEndTime(e.detail.value!.split('T')[1].slice(0,5))}
                />
              </IonItem>
            </div>
          </div>

          {/* Products Selection */}
          <div className="form-section">
            <IonText className="section-label">Apply to Products</IonText>
            <IonList className="products-list">
              {products.map(product => (
                <IonItem key={product.id}>
                  <IonCheckbox 
                    checked={selectedProducts.includes(product.id)}
                    onIonChange={() => toggleProduct(product.id)}
                    slot="start" 
                  />
                  <IonLabel>{product.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton 
            expand="block" 
            onClick={handleSave}
            disabled={!isValid}
            className="save-button"
          >
            <IonIcon icon={saveOutline} slot="start" />
            Save Schedule
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ScheduleFormModal;
