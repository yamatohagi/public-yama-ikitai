import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import {FC, ReactElement, useEffect, useState} from 'react';
import {useMtFacilityPhotoFilterStore} from 'src/components/provider/mtFacilityPhotoFilterStore';
import AreaButton from './c/tag-button';
import SearchInputButton from './c/search-input-button';

export default function FilterAndTag() {
  const {filteredValues, getLiveValueByKey, setLiveValueByKey, applyFilters, getLiveLabelsByKey} = useMtFacilityPhotoFilterStore();
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    const tags = [];
    if (filteredValues.area) tags.push({key: 'area', ...filteredValues.area});
    if (filteredValues.includeHashTags) tags.push({key: 'includeHashTags', ...filteredValues.includeHashTags});
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
      <Grid item xs={6} sm={6} style={{marginTop: 10}}>
        <AreaButton />
      </Grid>
      <Grid item xs={6} sm={6} style={{marginTop: 10}} />

      <Grid item xs={12} sm={12}>
        <SearchInputButton />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className={css({margin: '7px 20px 20px 20px'})}>{tags && <FilterTags tags={tags} removeTag={handleRemoveTag} />}</div>
      </Grid>
    </Grid>
  );
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
