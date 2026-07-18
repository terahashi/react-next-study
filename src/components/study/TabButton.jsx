//タブの「ボタン一覧」
import React from 'react';

export const TabButtonNav = ({ tabsData, activeTabId, changeActiveTabId }) => {
  return (
    // {/* //1. タブボタン一覧エリア */}
    <div>
      {tabsData.map((tab) => {
        return (
          <button key={tab.id} onClick={() => changeActiveTabId(tab.id)}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
