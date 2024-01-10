function ResultCount({count}: {count: number}) {
  return (
    <div style={{marginBottom: '10px', paddingTop: '0.9rem'}}>
      <span style={{float: 'right', marginRight: '22px', fontSize: '0.8rem'}}>
        検索結果
        <span style={{color: 'red', fontWeight: '600', fontSize: '1.1rem'}}>{count}</span> 件
      </span>
      <div style={{clear: 'both'}} /> {/* floatをクリアする */}
    </div>
  );
}

export default ResultCount;
