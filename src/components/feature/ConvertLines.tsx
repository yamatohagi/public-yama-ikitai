import {Fragment} from 'react';

function convertLines(remark: string | undefined | null) {
  if (!remark) return null;

  return remark.split('\n').map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
}

export default convertLines;
