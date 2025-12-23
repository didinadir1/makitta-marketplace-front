import {IonAvatar, IonButton, IonContent, IonIcon, IonLabel, IonNote, IonPage,} from '@ionic/react';
import React, {useEffect, useRef, useState} from 'react';
import './StorePage.css';
import {settingsOutline} from 'ionicons/icons';
import MyStoreSection from '../components/store/MyStoreSection';
import {useHistory} from 'react-router-dom';
import {useSellerMe} from '../vendor/api';
import StoreTabs from '../components/store/StoreTabs';

const StorePage: React.FC = () => {
  const history = useHistory();
  const {seller} = useSellerMe();
  const contentRef = useRef<HTMLIonContentElement>(null);

  const handleEditClick = async () => {
    history.push('/store/edit-store');
  };

  // Placeholder data for reviews and products sold - replace with actual API data
  const storeStats = {
    averageRating: 4.5,
    totalReviews: 128,
    productsSold: 456,
  };

  const [scrollTop, setScrollTop] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('products');
  const [maxOffset, setMaxOffset] = useState(200);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerOffset, setHeaderOffset] = useState(0);

  const handleScroll = (e: CustomEvent) => {
    const scrollY = e.detail.scrollTop;
    let computedOffset;
    // Detect scroll direction
    if (scrollY > lastScrollTop && scrollY > 50) {
      // Scrolling down - hide header
      computedOffset = Math.min(maxOffset, scrollTop * 0.5);
      setHeaderOffset(computedOffset)
    } else if (scrollY < lastScrollTop) {
      // Scrolling up - show header
      computedOffset = Math.max(0, headerOffset - (lastScrollTop - scrollY) * 0.5);
      setHeaderOffset(computedOffset)
    }

    setLastScrollTop(scrollY);
    setScrollTop(scrollY);
  };

  useEffect(() => {
    const updateMaxOffset = () => {
      if (window.innerWidth <= 480) {
        setMaxOffset(280);
      } else if (window.innerWidth <= 768) {
        setMaxOffset(180);
      } else {
        setMaxOffset(200);
      }
    };

    updateMaxOffset();
    window.addEventListener('resize', updateMaxOffset);

    return () => window.removeEventListener('resize', updateMaxOffset);
  }, []);


  return (
    <IonPage>
      {seller && (
        <div
          className="store-header"
          style={{
            transform: `translateY(-${headerOffset}px)`,
          }}
        >
          <div className="store-header-background">
            <div className="store-header-content">
              <div className="store-info-section">
                <IonAvatar className="store-avatar">
                  <img
                    src={seller?.photo ?? 'public/store-default-image.png'}
                    alt="Store"
                  />
                </IonAvatar>
                <div className="store-details">
                  <IonLabel className="store-name">
                    {seller?.name ?? 'Store Name'}
                  </IonLabel>
                  <div className="store-stats">
                    <div className="stat-item">
                      <IonLabel className="stat-value">
                        {storeStats.averageRating}
                      </IonLabel>
                      <IonNote className="stat-label">Avg Rating</IonNote>
                    </div>
                    <div className="stat-item">
                      <IonLabel className="stat-value">
                        {storeStats.totalReviews}
                      </IonLabel>
                      <IonNote className="stat-label">Reviews</IonNote>
                    </div>
                    <div className="stat-item">
                      <IonLabel className="stat-value">
                        {storeStats.productsSold}
                      </IonLabel>
                      <IonNote className="stat-label">Sold</IonNote>
                    </div>
                  </div>
                </div>
              </div>
              <IonButton
                fill="clear"
                className="edit-store-button"
                onClick={handleEditClick}
              >
                <IonIcon icon={settingsOutline} slot="icon-only"/>
              </IonButton>
            </div>
          </div>
          <StoreTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
      )}
      <IonContent
        ref={contentRef}
        scrollEvents={true}
        onIonScroll={handleScroll}
        className="store-page-content"
      >
        {seller?.id ? (
          <MyStoreSection activeTab={activeTab} maxOffset={maxOffset} headerOffset={headerOffset}/>
        ) : (
          <div className="create-store-container">
            <IonLabel>
              You haven't created a store yet.
              <br/> Click the button below to get started.
            </IonLabel>
            <IonButton routerLink="/store/create-store">
              Create my store
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default StorePage;
