import {css} from 'styled-system/css';

import {memo} from 'react';
import {paths} from 'src/routes/paths';
import {useRouter} from 'next/router';
import {useKeyedSelectedStore} from 'src/components/provider/selectedPrefectureStore';
import {useMtFilterStore} from 'src/components/provider/mtFilterStore';

const SearchButtonWithInput = memo(() => {
  const {selected: inputValue, setSelected: setInputValue, deleteSelected} = useKeyedSelectedStore('SearchButtonWithInput');
  const router = useRouter();
  const {liveState, applyFilters} = useMtFilterStore();
  const [value, setValue] = liveState('SearchButtonWithInput');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    deleteSelected(inputValue[0]);
    setInputValue([event.target.value]);
  };

  const handleSearch = () => {
    if (inputValue.length === 0 || inputValue[0] === '') {
      setValue(value, value);
      applyFilters();
      router.push(paths.mountain.search.path);
      return;
    }

    router.push(paths.mountain.search.path);
  };

  return (
    <>
      <input
        value={inputValue[0]}
        onChange={handleInputChange}
        placeholder="山名・エリア・キーワード"
        type="email"
        className={css({
          flexGrow: 2, // ← 'width'を削除し'flexGrow'を追加
          height: '55px',
          borderLeftRadius: '6px',
          borderRightRadius: '0px',
          paddingLeft: '15px', // プレースホルダーの左側の余白を追加
          backgroundPosition: '20px center', // プレースホルダーの位置を変更
          _placeholder: {
            fontSize: '15px',
            fontWeight: 'semibold', // プレースホルダーテキストを太字にする
          },
        })}
      />
      <button
        type="button"
        onClick={handleSearch}
        className={css({
          flexGrow: 10, // ← 'width'を削除し'flexGrow'を追加
          height: '55px',
          borderRightRadius: '6px',
          color: 'white',
          fontWeight: 'semibold',
          fontSize: '15px',
          backgroundColor: '#FA541C',
        })}
      >
        検索
      </button>
    </>
  );
});

export default SearchButtonWithInput;
