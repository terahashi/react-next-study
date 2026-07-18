//タブ切り替えコンポーネントを作成する
//1:「タブ切り替えコンポーネント」とは、「ボタン（切り替えスイッチ）は3つともずっと画面に並んだまま残り、
// 押したボタンに合わせて『その下の文章（中身）』だけがパッと一瞬で入れ替わる」というイメージです。
import React, { useState } from 'react';

import { TabButtonNav } from '../../components/study/TabButton'; //TabButton.jsxをimportして「TabButtonNavコンポーネント」として使えるようにする。
import { TabContent } from '../../components/study/TabContent'; //TabContent.jsxをimportして「TabContentコンポーネント」として使えるようにする。

//元となるデータ
const TAB_DATA = [
  { id: 'home', label: 'ホーム', content: 'ホーム画面のコンテンツです。' },
  { id: 'profile', label: 'プロフィール', content: 'プロフィール画面のコンテンツです。' },
  { id: 'settings', label: '設定', content: '設定画面のコンテンツです。' },
];

//TabAppコンポーネント
export const TabApp = () => {
  // 「今選ばれているタブのID」を管理するState
  const [activeTabId, setActiveTabId] = useState(TAB_DATA[0].id); //初期値は「TAB_DATAの1つ目のid」

  return (
    <div>
      <h2>タブ切り替えコンポーネント</h2>

      {/* //1. タブボタン一覧エリア */}
      {/* <div>
        {TAB_DATA.map((tab) => {
          return (
            <button key={tab.id} onClick={() => setActiveTabId(tab.id)}>
              {tab.label}
            </button>
          );
        })}
      </div> */}
      <TabButtonNav tabsData={TAB_DATA} activeTabId={activeTabId} changeActiveTabId={setActiveTabId} />

      {/* //2. コンテンツ エリア */}
      {/* <div>
        {TAB_DATA.map((tab) => {
          // もしこのデータのID(tab.id)が、「今選ばれているID(activeTabId)と違ったら、何も表示しない（nullで画面から消す）」
          if (tab.id !== activeTabId) return null;

          // 今選ばれているID(activeTabId)と同じデータを表示する
          return <div key={tab.id}>{tab.content}</div>;
        })}
      </div> */}
      <TabContent tabsData={TAB_DATA} activeTabId={activeTabId} />
    </div>
  );
};
