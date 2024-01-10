import {css} from 'styled-system/css';
import {FC, ReactElement, useEffect, useState} from 'react';
import {Grid} from '@mui/material';

import {useMtFacilityFilterStore} from 'src/components/provider/mtFacilityFilterStore';
import TopSwitch from 'src/sections/_mountain/search/c/TopSwitch';
import SearchInput from './c/search-input';
import AreaButton from './c/area-button';
import VariousButton from './c/various-button';
import RangeInput from './c/range-input-for-mt-peak';
import SearchInputButton from './c/search-input-button';

function FilterAndTag() {
  const {filteredValues, getLiveValueByKey, setLiveValueByKey, applyFilters, getLiveLabelsByKey} = useMtFacilityFilterStore();
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    const tags = [];
    if (filteredValues.area) tags.push({key: 'area', ...filteredValues.area});
    if (filteredValues.mtArea) tags.push({key: 'mtArea', ...filteredValues.mtArea});
    if (filteredValues.various) tags.push({key: 'various', ...filteredValues.various});

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
    <Grid
      container
      className={css({
        position: 'relative',
        backgroundColor: '#F5F5F5',
      })}
    >
      <TopSwitch initialTab="山小屋" />
      <Grid item xs={12} sm={12} style={{marginTop: 10}}>
        <SearchInput />
      </Grid>

      <Grid item xs={6} sm={6}>
        <AreaButton />
      </Grid>
      <Grid item xs={6} sm={6}>
        <VariousButton />
      </Grid>

      <Grid item xs={12} sm={12}>
        <RangeInput />
      </Grid>

      <Grid item xs={12} sm={12}>
        <SearchInputButton />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className={css({margin: '7px 20px 20px 20px'})}>{tags.length > 0 && <FilterTags tags={tags} removeTag={handleRemoveTag} />}</div>
      </Grid>
    </Grid>
  );
}

export default FilterAndTag;

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
