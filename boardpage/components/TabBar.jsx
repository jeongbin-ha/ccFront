
import React from 'react';
import {
  TabContainer,
  Tab,
  HotIcon
} from '../styles/commonStyles';

const TabBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'general', label: '일반' },
    { id: 'hot', label: 'Hot', icon: '🔥' },
    { id: 'promotion', label: '홍보' }
  ];

  return (
    <TabContainer>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          active={activeTab === tab.id}
          type={tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon && <HotIcon>{tab.icon}</HotIcon>}
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TabBar;