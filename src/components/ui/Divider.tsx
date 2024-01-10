type DividerProps = {
  className?: string;
  width?: string;
};
function Divider({className, width}: DividerProps) {
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.7rem'}} className={className && className}>
      <div style={{width: width || '93%', height: '0.08rem', background: '#EDEDED'}} />
    </div>
  );
}

export default Divider;
