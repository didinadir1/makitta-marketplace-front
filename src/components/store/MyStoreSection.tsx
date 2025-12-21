import React from 'react';
import ProductsTab from '../products/ProductsTab';
import './MyStoreSection.css';
import DashboardTab from "../dashboard/DashboardTab";
import OrdersTab from "../orders/OrdersTab";

interface MyStoreSectionProps {
  activeTab: string;
}

const MyStoreSection: React.FC<MyStoreSectionProps> = ({activeTab}) => {


  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab/>;
      case 'orders':
        return <OrdersTab/>;
      case 'products':
        return <ProductsTab/>;
      case 'inventory':
        return <div></div>;
      case 'customers':
        return <div></div>;
      case 'reviews':
        return <div></div>;
      case 'promotions':
        return <div></div>;
      case 'price lists':
        return <div></div>;
      case 'request':
        return <div></div>;
      default:
        return <ProductsTab/>;
    }
  };

  return (
    <>

      <div className="my-store-content">
        {renderTabContent()}
      </div>
    </>
  );
};

export default MyStoreSection;
