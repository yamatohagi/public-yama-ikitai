import { suggestStations } from './station';

describe('駅関連の関数テスト', () => {
  describe('suggestStations 関数', () => {
    // 部分一致のテスト
    it('部分文字列"函"で検索すると["函館"]が返される', () => {
      const result = suggestStations('稲田堤');
      expect(result).toEqual([
        {
          groupID: 1130316,
          id: 1130316,
          lat: 35.633701,
          lineID: 11303,
          lineName: 'JR南武線',
          lon: 139.535173,
          name: '稲田堤',
          stationID: 20,
        },
        {
          groupID: 2400203,
          id: 2400203,
          lat: 35.633895,
          lineID: 24002,
          lineName: '京王相模原線',
          lon: 139.531099,
          name: '京王稲田堤',
          stationID: 2,
        },
      ]);
    });

    // 該当なしのテスト
    it('該当する駅がない場合、空の配列を返す', () => {
      const result = suggestStations('存在しない駅名');
      expect(result).toEqual([]);
    });

    // ... 他のテストケースも追加できます。
  });
});
