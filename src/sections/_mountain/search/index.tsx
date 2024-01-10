import {css} from 'styled-system/css';
import {FC, ReactElement, useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {useMtFilterStore} from 'src/components/provider/mtFilterStore';
import AreaButton from './c/ui-parts/AreaButton';
import VariousButton from './c/ui-parts/VariousButton';
import SearchInput from './c/ui-parts/SearchInput';
import SearchInputButton from './c/ui-parts/SearchInputButton';
import RangeInput from './c/ui-parts/RangeInputForMtPeak';
import RangeInputForUphillTime from './c/ui-parts/RangeInputForUphillTime';
import StartPointSelect from './c/ui-parts/StartPointSelect';
import MoveDistance from './c/ui-parts/MoveDistance';
import StartPointSetModal from './c/features/StartPointSetModal';
import TopSwitch from './c/TopSwitch';
import {PrefectureSearchModal} from './c/prefecture-search-modal';
import {VariousSearchModal} from './c/various-search-modal';
import MtList from './c/mt-list';

export const MtSearch = () => {
  // ローカル状態を初期化します
  const [tags, setTags] = useState<TagType[]>([]);
  const {filteredValues, getLiveValueByKey, setLiveValueByKey, applyFilters, getLiveLabelsByKey} = useMtFilterStore();

  useEffect(() => {
    const tags = [];
    if (filteredValues.area) tags.push({key: 'area', ...filteredValues.area});
    if (filteredValues.mtArea) tags.push({key: 'mtArea', ...filteredValues.mtArea});
    if (filteredValues.climbingTime) tags.push({key: 'climbingTime', ...filteredValues.climbingTime});

    setTags(tags);
  }, [filteredValues]);

  const handleRemoveTag = (tag: TagType, cTagValue: string) => {
    const currentTags = getLiveValueByKey(tag.key);
    const currentTagLabels = getLiveLabelsByKey(tag.key);
    const updatedTags = [...currentTags].filter((currentTag) => currentTag !== cTagValue);
    const updatedTagLabels = [...currentTagLabels].filter((currentTagLabel) => currentTagLabel !== cTagValue);
    setLiveValueByKey(tag.key, {value: updatedTags, label: updatedTagLabels});
    applyFilters();
  };

  return (
    <>
      <StartPointSetModal />
      <PrefectureSearchModal />
      <VariousSearchModal />
      <Grid
        container
        className={css({
          position: 'relative',
          backgroundColor: '#F5F5F5',
        })}
      >
        <TopSwitch initialTab="山" />
        <Grid item xs={6} sm={6} style={{marginTop: 10}}>
          <StartPointSelect />
        </Grid>
        <Grid item xs={6} sm={6} style={{marginTop: 10}}>
          <MoveDistance />
        </Grid>
        <Grid item xs={6} sm={6}>
          <AreaButton />
        </Grid>
        <Grid item xs={6} sm={6}>
          <VariousButton />
        </Grid>
        <Grid item xs={12} sm={12}>
          <SearchInput />
        </Grid>
        <Grid item xs={12} sm={12}>
          <RangeInput />
        </Grid>
        <Grid item xs={12} sm={12}>
          <RangeInputForUphillTime />
        </Grid>

        <Grid item xs={12} sm={12}>
          <SearchInputButton />
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className={css({margin: '7px 20px 20px 20px'})}>{tags && <FilterTags tags={tags} removeTag={handleRemoveTag} />}</div>
        </Grid>
      </Grid>
      <MtList />
    </>
  );
};

const Tag: FC<TagProps> = ({text, onClick}): ReactElement => (
  <button
    type="button"
    tabIndex={0}
    className={css({
      display: 'inline-block',
      margin: '2px 3px',
      padding: '3px 5px',
      background: '#888',
      color: 'white',
      borderRadius: '5px',
      fontWeight: 'semibold',
    })}
    onClick={onClick}
    onKeyPress={onClick} // Keyboard accessibility
  >
    {text} <span style={{cursor: 'pointer', color: 'white'}}>×</span>
  </button>
);

interface TagProps {
  text: string;
  onClick: () => void;
}

type TagType = {
  key: string;
  value: string | string[];
  label: string | string[];
};

interface FilterTagsProps {
  tags: TagType[];
  removeTag: (tag: TagType, cTagValue: string) => void;
}

const FilterTags: FC<FilterTagsProps> = ({tags, removeTag}: FilterTagsProps): ReactElement => (
  <div>
    {tags.map((tag, index) => {
      const values = [...tag.value];
      return values.map((value, index) => <Tag key={index} text={tag.label[index]} onClick={() => removeTag(tag, value)} />);
    })}
  </div>
);

// todo:出発地に現在地入れる
// todo:現在地から遠い順の絞り込み
// todo:登山時間長い短いに文言変更
// 閉じるボタンを右上に
// チェックボックスなどのクリアボタン(左下かな？)
// 出発地を消せるように(視覚的には削除されてて実は東京駅になってればいいんじゃないかな)
// 駅の検索高速化
// 駅の絞り込み改行するとバーがおかしくなる
// 駅のひらがな検索(4600円かかる)https://ekidata.jp/faq.php
// 標高の選択肢増やす(山頂までも)
// エリアで絞り込み--中央アルプスとか
// TOP>中央アルプス>木曽駒ヶ岳のやつ
