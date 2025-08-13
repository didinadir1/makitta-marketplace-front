import React, {useEffect, useRef, useState} from 'react';
import {IonIcon, IonImg, IonLabel, IonNote} from '@ionic/react';
import {addOutline, closeCircleOutline} from 'ionicons/icons'; // Import closeCircleOutline
import {Control, Controller, FieldErrors} from 'react-hook-form';
import './ImageUploadField.css';

interface ImageUploadFieldProps {
  control: Control<any>; // Use 'any' or a more specific type if you know the form data structure
  errors: FieldErrors<any>; // Use 'any' or a more specific type
  defaultFile?: File | File[]; // Can be a single File or an array of Files
  name: string;
  label: string;
  multiple?: boolean; // New prop to handle multiple files
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
                                                              control,
                                                              errors,
                                                              name,
                                                              label,
                                                              defaultFile,
                                                              multiple = false,
                                                            }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | File[] | null) => void
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        const newFiles = Array.from(files);
        const currentFiles = (control._formValues[name] || []) as File[];
        const allFiles = [...currentFiles, ...newFiles];
        const urls = await Promise.all(allFiles.map(file => readFile(file)));
        setPreviewUrls(urls);
        onChange(allFiles);
      } else {
        const file = files[0];
        const url = await readFile(file);
        setPreviewUrls([url]);
        onChange(file);
      }
    } else {
      setPreviewUrls([]);
      onChange(multiple ? [] : null);
    }
  };

  const handleRemoveImage = (indexToRemove: number, onChange: (value: File | File[] | null) => void) => {
    const currentFiles = (control._formValues[name] || []) as File[];
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);

    if (multiple) {
      const updatedUrls = previewUrls.filter((_, index) => index !== indexToRemove);
      setPreviewUrls(updatedUrls);
      onChange(updatedFiles);
    } else {
      setPreviewUrls([]);
      onChange(null);
    }
    // Clear the file input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const loadDefaultFiles = async () => {
      if (defaultFile) {
        if (Array.isArray(defaultFile)) {
          const urls = await Promise.all(defaultFile.map(file => readFile(file)));
          setPreviewUrls(urls);
        } else {
          const url = await readFile(defaultFile);
          setPreviewUrls([url]);
        }
      } else {
        setPreviewUrls([]);
      }
    };
    loadDefaultFiles();
  }, [defaultFile, multiple]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const fieldError = errors[name];
  const errorMessage = fieldError?.message || (Array.isArray(fieldError) && fieldError.length > 0 ? fieldError[0]?.message : undefined);


  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange}}) => (
        <div className="image-upload-container">
          <IonLabel className="image-upload-label">{label}</IonLabel>
          <div className={`image-upload-field-wrapper ${multiple ? 'multiple' : ''}`}>
            {previewUrls.map((url, index) => (
              <div key={index} className="image-preview-item">
                <IonImg src={url} className="image-preview"/>
                <IonIcon
                  icon={closeCircleOutline}
                  className="remove-image-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index, onChange);
                  }}
                />
              </div>
            ))}

            {(multiple || previewUrls.length === 0) && ( // Show add button if multiple or no image selected for single
              <div className="image-upload-field" onClick={handleClick}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, onChange)}
                  style={{display: 'none'}}
                  multiple={multiple} // Apply multiple attribute
                />
                <IonIcon icon={addOutline} className="add-icon"/>
              </div>
            )}
          </div>
          {errorMessage &&
              <IonNote color="danger" className="error-message">{errorMessage as string}</IonNote>}
        </div>
      )}
    />
  );
};

export default ImageUploadField;
