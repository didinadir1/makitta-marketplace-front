import React, {useEffect, useState} from 'react';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import {addOutline, closeOutline, removeOutline} from 'ionicons/icons';
import {Product} from '../../types/Product';
import {mockCategories} from '../../data/mockCategories';
import './ProductFormModal.css';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product; // Optional product for editing
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             onSave,
                                                             product,
                                                           }) => {
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // New add-on form state
  const [newAddOnName, setNewAddOnName] = useState('');
  const [newAddOnPrice, setNewAddOnPrice] = useState('');

  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setCategoryId(product.categoryId);
      setIsAvailable(product.isAvailable);
      // Initialize add-ons if they exist
      if (product.addOns) {
        setAddOns(product.addOns);
      }
    } else {
      // Reset form for new product
      resetForm();
    }
  }, [product, isOpen]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategoryId('');
    setAddOns([]);
    setIsAvailable(true);
    setNewAddOnName('');
    setNewAddOnPrice('');
  };

  const handleAddAddOn = () => {
    if (newAddOnName.trim() && newAddOnPrice.trim()) {
      const price = parseFloat(newAddOnPrice);
      if (!isNaN(price) && price >= 0) {
        const newAddOn: AddOn = {
          id: Date.now().toString(), // Simple ID generation
          name: newAddOnName.trim(),
          price: price,
        };
        setAddOns([...addOns, newAddOn]);
        setNewAddOnName('');
        setNewAddOnPrice('');
      }
    }
  };

  const handleRemoveAddOn = (id: string) => {
    setAddOns(addOns.filter(addon => addon.id !== id));
  };

  const handleSave = () => {
    // Validate form
    if (!name.trim() || !categoryId) {
      // Show validation error
      return;
    }

    const updatedProduct: Product = {
      id: product?.id || Date.now().toString(), // Use existing ID or generate new one
      name: name.trim(),
      description: description.trim(),
      categoryId: categoryId,
      basePrice: product?.basePrice || 0, // Maintain existing price or set default
      imageUrls: product?.imageUrls || [], // Maintain existing images or set empty
      isAvailable: isAvailable,
      addOns: addOns,
    };

    onSave(updatedProduct);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleCancel} className="product-form-modal" initialBreakpoint={1}
              breakpoints={[0, 0.25, 0.5, 0.8, 1]}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{product ? 'Edit Product' : 'Add Product'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleCancel}>
              <IonIcon icon={closeOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form>
          <IonList className="form-list">
            {/* Name Field */}
            <div className="form-group">
              <IonLabel position="stacked" className="form-label">Name</IonLabel>
              <IonItem lines="full" className="form-item">
                <IonInput
                  value={name}
                  onIonChange={e => setName(e.detail.value!)}
                  placeholder="Enter product name"
                  required
                  className="form-input"
                />
              </IonItem>
            </div>

            {/* Description Field */}
            <div className="form-group">
              <IonLabel position="stacked" className="form-label">Description</IonLabel>
              <IonItem lines="full" className="form-item">
                <IonTextarea
                  value={description}
                  onIonChange={e => setDescription(e.detail.value!)}
                  placeholder="Enter product description"
                  rows={2}
                  className="form-input"
                />
              </IonItem>
            </div>

            {/* Category Field */}
            <div className="form-group">
              <IonLabel position="stacked" className="form-label">Category</IonLabel>
              <IonItem lines="full" className="form-item">
                <IonSelect
                  value={categoryId}
                  onIonChange={e => setCategoryId(e.detail.value)}
                  placeholder="Select a category"
                  className="form-select"
                  interface="action-sheet"
                  interfaceOptions={{cssClass: "form-action-sheet"}}
                >
                  {mockCategories.map(category => (
                    <IonSelectOption key={category.id} value={category.id}>
                      {category.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </div>

            {/* Add-ons Section */}
            <div className="form-group add-ons-group">
              <IonLabel position="stacked" className="form-label">Add-ons</IonLabel>

              <div className="add-ons-list">
                {addOns.map(addon => (
                  <IonChip key={addon.id} className="add-on-chip">
                    <span className="add-on-name">{addon.name}</span>
                    <span className="add-on-price">${addon.price.toFixed(2)}</span>
                    <IonIcon
                      icon={removeOutline}
                      onClick={() => handleRemoveAddOn(addon.id)}
                      className="remove-add-on"
                    />
                  </IonChip>
                ))}
              </div>

              <IonGrid className="add-on-form">
                  <IonCol size="5">
                    <IonItem lines="full" className="form-item">
                      <IonInput
                        value={newAddOnName}
                        onIonChange={e => setNewAddOnName(e.detail.value!)}
                        placeholder="Name"
                        className="form-input"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="3">
                    <IonItem lines="full" className="form-item">
                      <IonInput
                        value={newAddOnPrice}
                        onIonChange={e => setNewAddOnPrice(e.detail.value!)}
                        placeholder="Price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-input"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="2">
                    <IonButton
                      expand="block"
                      onClick={handleAddAddOn}
                      disabled={!newAddOnName.trim() || !newAddOnPrice.trim()}
                      className="add-add-on-button"
                    >
                      <IonIcon icon={addOutline}/>
                    </IonButton>
                  </IonCol>
              </IonGrid>
            </div>

            {/* Availability Toggle */}
            <div className="form-group">
              <IonItem lines="full" className="availability-item">
                <IonLabel>Available</IonLabel>
                <IonToggle
                  checked={isAvailable}
                  onIonChange={e => setIsAvailable(e.detail.checked)}
                  slot="end"
                  className="availability-toggle"
                />
              </IonItem>
            </div>
          </IonList>
        </form>
      </IonContent>

      <IonFooter>
        <IonToolbar className="form-footer-toolbar">
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                fill="outline"
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                expand="block"
                onClick={handleSave}
                disabled={!name.trim() || !categoryId}
                className="save-button"
              >
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ProductFormModal;
