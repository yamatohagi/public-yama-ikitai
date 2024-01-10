import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {css} from 'styled-system/css';

import {memo} from 'react';
import {useModalState} from 'src/components/provider/modalStateStore';
import {PrefectureSearchModal} from '../../../_post/search/c/prefecture-search-modal';
import {VariousSearchModal} from '../../../_post/search/c/various-search-modal';

const HomeButtonGroup = memo(() => {
  const {openModal} = useModalState();

  return (
    <>
      <PrefectureSearchModal />
      <VariousSearchModal />
      <ToggleGroup.Root
        className={css({
          position: 'absolute',
          top: '47%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'inline-flex',
          borderRadius: '6px',
        })}
        type="single"
        defaultValue="left"
        aria-label="Text alignment"
      >
        <ToggleGroup.Item
          className={ToggleGroupItem()}
          value="left"
          aria-label="Left aligned"
          onClick={() => console.log('左揃えの項目がクリックされました。')}
        >
          キーワードから探す
        </ToggleGroup.Item>
        <ToggleGroup.Item className={ToggleGroupItem()} value="center" aria-label="Center aligned" onClick={() => openModal('HomeButtonGroup')}>
          場所から探す
        </ToggleGroup.Item>
        <ToggleGroup.Item className={ToggleGroupItem()} value="right" aria-label="Right aligned" onClick={() => openModal('VariousSearchModal')}>
          特徴から探す
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </>
  );
});
export default HomeButtonGroup;
const ToggleGroupItem = () =>
  css({
    color: 'white',
    fontSize: '12px',

    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    border: '2px solid #FFF',

    width: '110px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    _first: {
      borderRight: 'none',
      marginLeft: '0',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      backgroundColor: 'white',
      position: 'relative',
      color: '#2B5063',
    },
    _last: {
      borderLeft: 'none',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
    _hover: {
      backgroundColor: 'white',
      position: 'relative',
      color: '#2B5063',
    },
    // '&[data-state="on"]': {
    //   backgroundColor: 'white',
    //   position: 'relative',
    //   color: '#2B5063',
    // },
    // _focus: {
    //   backgroundColor: 'white',
    //   position: 'relative',
    //   boxShadow: '0 0 0 2px var(--violet-7)',
    // },
  });
