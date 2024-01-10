import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Prisma} from '@prisma/client';

import {css} from 'styled-system/css';
import {Fragment} from 'react';
import Link from 'next/link';
import {paths} from 'src/routes/paths';

type HashTagsProps = {
  hashTags?: Prisma.HashtagGetPayload<{}>[];
};

const HashTags: React.FC<HashTagsProps> = ({hashTags}: HashTagsProps) => (
  <div className={css({display: 'flex', ml: '0.7rem'})}>
    {hashTags?.map((hashTag, i) => (
      <Fragment key={i}>
        <Link href={`${paths.post.index.path}?tab=text&SearchButtonWithInput=${hashTag.tag}`}>
          <div className={css({ml: 3, mt: 3})}>
            <span className={css({color: '#367b9d', textDecoration: 'underline'})}>#{hashTag.tag}</span>
          </div>
        </Link>
      </Fragment>
    ))}
  </div>
);

export default HashTags;
