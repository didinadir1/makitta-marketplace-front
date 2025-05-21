import React from 'react';
import {
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonAvatar,
  IonText,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { mockCategories } from '../../data/mockCategories';
import './StoreTabs.css';

interface CategoriesTabProps {
  onAddCategoryClick: () => void;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({ onAddCategoryClick }) => {
  return (
    <div className="tab-content">
      <div className="add-button-container add-category-button-container">
        <IonButton onClick={onAddCategoryClick}>
          <IonIcon slot="start" icon={addOutline}></IonIcon>
          Add New Category
        </IonButton>
      </div>
      
      <IonList className="category-list">
        {mockCategories.map((category) => (
          <IonItem key={category.id} className="category-item">
            <IonAvatar slot="start" className="category-avatar">
              <div 
                className="category-color-circle" 
                style={{ backgroundColor:  '#ff9800' }}
              ></div>
            </IonAvatar>
            <IonLabel>
              <h2>{category.name}</h2>
              <IonText color="medium">
                <p>x Products</p>
              </IonText>
            </IonLabel>
            <IonChip color="primary" outline={true} className="category-chip">
              Edit
            </IonChip>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default CategoriesTab;
