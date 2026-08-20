//Supabaseに対する・取得(SELECT)・追加(INSERT)・更新(UPDATE)・削除(DELETE)の4つの通信処理をまとめたコード。

//LoginSuccess.jsxの中で使う「Supabase通信処理」をまとめた関数を作る
//LoginSucccess.jsxからこのファイルに「データ通信層(APIクライアント)の分離・モジュール化したもの。」

import { supabase } from './supabaseClient';

export const memoServiceSupabase = {
  //⬇︎1:画面表示時に「自分のメモ一覧」を【Supabaseから取得する】
  async fetchMemos() {
    // Supabaseの「memos」テーブルから、ログイン中のユーザーのメモを取得する
    const { data, error } = await supabase
      .from('memos') // ①supabaseの「memosテーブルを指定」
      .select('*') // ②全ての列を取得
      .order('created_at', { ascending: false }); // ③作成日時が新しい順に並べ替え

    if (error) throw error;
    return data || []; //data または [空の配列] 」をセット。
    //⬆︎ [空の配列]を入れる理由は、「dataがnullや、undefinedだったときに、画面(React)がクラッシュする(画面が真っ白になる)のを防ぐため。」
  },

  //⬇︎2:新しいメモを【Supabaseに保存し、手元のmemoList(State)に追加する関数】
  async handleAddMemo(content, userId) {
    //Supabaseにデータを挿入(user_idにはログイン中ユーザーのIDを渡す)
    const { data, error } = await supabase
      .from('memos') //① supabaseの「memosテーブルを指定」
      .insert([{ content, user_id: userId }]) //② 新しいメモを挿入
      .select(); //③ 挿入後のデータを取得

    if (error) throw error;
    return data[0]; //挿入したメモを返す
  },

  // ⬇︎3:メモ更新(Update)する処理
  async handleUpdateMemo(id, content) {
    //supabaseのデータを更新する処理
    const { error } = await supabase
      .from('memos') // supabaseの「memosテーブルを指定」
      .update({ content }) // 更新する内容を指定
      .eq('id', id); //idが一致するものを更新

    if (error) throw error; // エラーが飛ばす
  },

  //⬇︎4:メモを削除する関数 (Delete)
  async handleDeleteMemo(id) {
    const { error } = await supabase
      .from('memos') //① supabaseの「memosテーブルを指定」
      .delete() //② 削除する
      .eq('id', id); //③ idが一致するものを削除

    if (error) throw error; // エラーが飛ばす
  },
};
