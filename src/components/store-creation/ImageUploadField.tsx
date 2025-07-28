import React, {useEffect, useRef, useState} from 'react';
import {IonIcon, IonImg, IonLabel, IonNote} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import './ImageUploadField.css'; // We'll create this CSS file

interface ImageUploadFieldProps {
  control: Control<any>; // Use 'any' or a more specific type if you know the form data structure
  errors: FieldErrors<File>; // Use 'any' or a more specific type
  defaultFile?: File;
  name: string;
  label: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({control, errors, name, label, defaultFile}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      readFile(file)
      onChange(file); // Pass the File object to react-hook-form
    } else {
      setPreviewUrl(undefined);
      onChange(null);
    }
  };

  useEffect(() => {
    if (defaultFile) {
      readFile(defaultFile)
    }
  }, [defaultFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange}}) => (
        <div className="image-upload-container">
          <IonLabel className="image-upload-label">{label}</IonLabel>
          <div className="image-upload-field" onClick={handleClick}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, onChange)}
              style={{display: 'none'}}
            />
            {previewUrl ? (
              <IonImg src={previewUrl} className="image-preview"/>
            ) : (
              <IonIcon icon={addOutline} className="add-icon"/>
            )}
          </div>
          {errors.name &&
              <IonNote color="danger" className="error-message">{errors.name?.message as string}</IonNote>}
        </div>
      )}
    />
  );
};

export default ImageUploadField;
