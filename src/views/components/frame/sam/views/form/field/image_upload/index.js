import React, { useState, useEffect } from 'react';
import { Api } from '../../../../../../../../utils';
import { head, path, length } from 'ramda';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Button, CircularProgress, Snackbar, Avatar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Alert from '@material-ui/lab/Alert';
import makeHandleUpdate from '../../helpers/make-handle-update';

const UploadImage = ({ fieldData, label, onUpdate }) => {
  const [open, setOpen] = useState( false );
  const [loading, setLoading] = useState( false );
  const [snackbar, setSnackbar] = useState({ open: false, alert: '' });
  const [imageUrl, setImageUrl] = useState( '' );

  const handleUpdate = makeHandleUpdate( onUpdate )( fieldData );

  const handleSave = async files => {
    setOpen( false );
    setLoading( true );

    var form_data = new FormData();

    form_data.append( 'file', head( files ));

    try {
      const response = await Api.postMediaFile({
        data: form_data,
      });

      setImageUrl( path( ['data', 'files', 0, 'url'], response ));

      setSnackbar({ open: true, alert: 'success' });
    } catch ( error ) {
      console.log( error );
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

  useEffect(
    () => {
      if ( length( imageUrl )) handleUpdate( imageUrl );
    },
    [imageUrl]
  );

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : length( imageUrl ) ? (
        <Avatar src={imageUrl} />
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
          {snackbar.alert === 'success' ? 'Image uploaded!' : 'Sorry there was an error'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadImage;