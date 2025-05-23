import React, {useEffect, useState} from 'react';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
import {useProductContext} from '../../state/productState';
import {Schedule} from '../../types/Schedule';
import './ScheduleFormModal.css';
import {z} from 'zod'; // Import Zod
import {ScheduleFormData, scheduleSchema} from '../../validation/scheduleValidation'; // Import schema


interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: Schedule) => void;
  schedule?: Schedule;
}

const ScheduleFormModal: React.FC<ScheduleFormModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onSave,
                                                               schedule
                                                             }) => {
  const [presentToast] = useIonToast(); // Hook for presenting toasts
  const {products} = useProductContext();
  const [name, setName] = useState('');
  const [selectedDates, setSelectedDates] = useState<string[]>([]); // State for selected dates
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (schedule) {
      setName(schedule.name);
      setSelectedDates(schedule.dates); // Initialize with schedule dates
      setSelectedProducts(schedule.productIds);
    } else {
      resetForm();
    }
  }, [schedule, isOpen]);

  const resetForm = () => {
    setName('');
    setSelectedDates([]);
    setSelectedProducts([]);
  };

  const handleDateChange = (event: CustomEvent) => {
    // IonDatetime value can be a string (single date) or an array of strings (multiple dates)
    const dates = Array.isArray(event.detail.value) ? event.detail.value : (event.detail.value ? [event.detail.value] : []);
    setSelectedDates(dates.map(date => date.split('T')[0])); // Format dates to YYYY-MM-DD
  };


  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => prev.includes(productId)
      ? prev.filter(id => id !== productId)
      : [...prev, productId]
    );
  };

  const handleSave = () => {
    const scheduleData: ScheduleFormData = {
      id: schedule?.id, // Include ID if editing
      name: name.trim(),
      dates: selectedDates, // Use selected dates
      productIds: selectedProducts,
    };

    try {
      // Validate data using Zod schema
      scheduleSchema.parse(scheduleData);

      // If validation passes, call onSave
      onSave(scheduleData as Schedule); // Cast back to Schedule type if needed by onSave
      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error('Validation errors:', error.errors);
        // Display the first validation error to the user
        presentToast({
          message: error.errors[0].message,
          duration: 3000,
          position: 'bottom',
          color: 'danger',
        });
      } else {
        console.error('An unexpected error occurred:', error);
        presentToast({
          message: 'An unexpected error occurred. Please try again.',
          duration: 3000,
          position: 'bottom',
          color: 'danger',
        });
      }
    }
  };

  const isValid = name.trim() && selectedDates.length > 0 && selectedProducts.length > 0;

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="schedule-form-modal"
      breakpoints={[0, 0.8, 1]}
      initialBreakpoint={1}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{schedule ? 'Edit Schedule' : 'New Schedule'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="full" className="ion-padding-horizontal">
          {/* Name Field */}
          <div className="form-section">
            <IonText className="section-label">Name</IonText>
            <IonInput
              value={name}
              placeholder="e.g., Lunch Hours"
              onIonChange={e => setName(e.detail.value!)}
              className="form-input"
            />
          </div>

          {/* Calendar for Date Selection */}
          <div className="form-section">
            <IonText className="section-label">Select Dates</IonText>
            <IonDatetime
              presentation="date"
              multiple={true} // Allow multiple date selection
              value={selectedDates} // Bind selected dates
              onIonChange={handleDateChange}
              className="schedule-calendar"
            ></IonDatetime>
          </div>


          {/* Products Selection */}
          <div className="form-section">
            <IonText className="section-label">Apply to Products</IonText>
            <IonList className="products-list">
              {products.map(product => (
                <IonItem key={product.id}
                         onClick={() => toggleProduct(product.id)}
                >
                  <IonCheckbox
                    checked={selectedProducts.includes(product.id)}
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
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ScheduleFormModal;
