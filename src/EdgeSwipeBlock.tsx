type EdgeSwipeBlockProps = {
  children?: React.ReactNode;
};

export default function EdgeSwipeBlock({children}: EdgeSwipeBlockProps) {
  return (
    <div style={{position: 'relative'}}>
      {children} {/* Left Blocker */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '5%', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0)', pointerEvents: 'all'}} />
      {/* Right Blocker */}
      <div
        style={{position: 'absolute', top: 0, right: 0, width: '5%', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0)', pointerEvents: 'all'}}
      />
    </div>
  );
}
