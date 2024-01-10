import {Box, Button, DialogActions, DialogContent, Slider, Typography} from '@mui/material';
import {FC, useState} from 'react';
import Cropper, {Area} from 'react-easy-crop';

export type Props = {
  width: number;
  height: number;
  photoURL: string;
  disabled: boolean;
  closeCrop: () => void;
  saveImage: (croppedAreaPixels: Area, rotation: number, idIndex?: number) => Promise<void>;
  cropAreaPixels?: Area;
  cropAspect?: number;
  idIndex?: number;
};

export const CropModal: FC<Props> = ({width, height, photoURL, disabled, closeCrop, saveImage, cropAreaPixels, cropAspect, idIndex}) => {
  /* hook宣言 */
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>(
    cropAreaPixels || {
      width: 0,
      height: 0,
      x: 200,
      y: 200,
    }
  );

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const zoomPercent = (value: number) => `${Math.round(value * 100)}`;

  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          height: 400,
          width: 'auto',
          minWidth: {sm: 600},
        }}
      >
        <Cropper
          initialCroppedAreaPixels={croppedAreaPixels}
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={cropAspect || width / height}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{flexDirection: 'column', mx: 3, my: 2}}>
        <Box sx={{width: '100%', mb: 2}}>
          <Box>
            <Typography>ズーム: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(Number(zoom))}
            />
          </Box>
          <Box>
            <Typography>回転: {`${rotation}°`}</Typography>
            <Slider valueLabelDisplay="auto" min={0} max={360} value={rotation} onChange={(e, rotation) => setRotation(Number(rotation))} />
          </Box>
        </Box>
        <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
          <Button variant="outlined" onClick={closeCrop}>
            キャンセル
          </Button>
          <Button variant="contained" disabled={disabled} onClick={() => saveImage(croppedAreaPixels, rotation, idIndex)}>
            確定
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};
