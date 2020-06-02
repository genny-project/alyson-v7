import React, { useState } from 'react';
import API from '../../../../../../../../utils/api/Api';

import { DropzoneDialog } from 'material-ui-dropzone';
import { Button, CircularProgress, Snackbar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Alert from '@material-ui/lab/Alert';

const UploadImage = ({ fieldData, label }) => {
  const [open, setOpen] = useState( false );
  const [loading, setLoading] = useState( false );
  const [snackbar, setSnackbar] = useState({ open: false, alert: '' });

  let formData = new FormData();

  const handleSave = async files => {
    formData = formData.append( 'file', files[0] );
    setOpen( false );
    setLoading( true );
    try {
      const response = await API.postMediaFile({
        data: formData,
      });

      setSnackbar({ open: true, alert: 'success' });
    } catch ( error ) {
      setSnackbar({ open: true, alert: 'error' });
    }
    setLoading( false );
  };

  const handleClose = ( event, reason ) => {
    if ( reason === 'clickaway' ) {
      return;
    }

    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => setOpen( true )}
          >
            {label}
          </Button>
          <DropzoneDialog
            open={open}
            onClose={() => setOpen( false )}
            onSave={handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews
            maxFileSize={5000000}
          />
        </div>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.alert || ''}
          elevation={6}
          variant="filled"
        >
          {alert === 'success' ? 'Image uploaded!' : 'Sorry there was an error'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadImage;
