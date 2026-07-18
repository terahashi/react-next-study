//タブの「中身（コンテンツ）」
import React from 'react';

export const TabContent = ({ tabsData, activeTabId }) => {
  return (
    // {/* //2. コンテンツ エリア */}
    <div>
      {tabsData.map((tab) => {
        // もしこのデータのID(tab.id)が、「今選ばれているID(activeTabId)と違ったら、何も表示しない（nullで画面から消す）」
        if (tab.id !== activeTabId) return null;

        // 今選ばれているID(activeTabId)と同じデータを表示する
        return <div key={tab.id}>{tab.content}</div>;
      })}
    </div>
  );
};
