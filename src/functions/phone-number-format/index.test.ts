import { phoneNumberDropHyphen, phoneNumberAddHyphen } from 'src/functions/phone-number-format';

describe('phoneNumberDropHyphen関数のテスト', () => {
  describe('正しく整形されるか', () => {
    describe('正しい電話番号', () => {
      test('ハイフンなしがそのまま', () => {
        expect(phoneNumberDropHyphen('08022229999')).toEqual({ valid: true, value: '08022229999' });
      });

      test('ハイフンアリの場合削除される', () => {
        expect(phoneNumberDropHyphen('080-3333-9999')).toEqual({ valid: true, value: '08033339999' });
      });
    });

    describe('間違った電話番号', () => {
      test('ハイフンなしがそのまま', () => {
        expect(phoneNumberDropHyphen('00022229999')).toEqual({ valid: false, value: '00022229999' });
      });

      test('ハイフンアリの場合そのまま', () => {
        expect(phoneNumberDropHyphen('000-3333-9999')).toEqual({ valid: false, value: '000-3333-9999' });
      });
    });
  });
});

describe('phoneNumberAddHyphen関数のテスト', () => {
  describe('正しく整形されるか', () => {
    describe('正しい電話番号', () => {
      test('ハイフンありがそのまま', () => {
        expect(phoneNumberAddHyphen('080-2222-3333')).toEqual('080-2222-3333');
      });

      test('ハイフンなしの場合ハイフンが追加される', () => {
        expect(phoneNumberAddHyphen('08033339999')).toEqual('080-3333-9999');
      });
    });

    describe('間違った電話番号', () => {
      test('ハイフンなしがそのまま', () => {
        expect(phoneNumberAddHyphen('00022229999')).toEqual('00022229999');
      });

      test('ハイフンアリの場合そのまま', () => {
        expect(phoneNumberAddHyphen('000-3333-9999')).toEqual('000-3333-9999');
      });
    });
  });
});
