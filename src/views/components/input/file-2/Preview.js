import React from 'react';
import { array, func } from 'prop-types';
import { Box, Text, Icon, Touchable } from '../../../components';
import { trimAndAppendDots } from '../../../../utils';

// This method decides which icon to send for preview based on the type of attached file
const previewIcons = {
  'application/pdf': 'picture_as_pdf',
  'audio/mp3': 'music_note',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'description',
  'zipFile': 'archive',
  'application/x-gzip': 'archive',
  'default': 'attach_file',
};

const Preview = ({ file, onHandleClose }) => {
  return (
    <div>
      <div style={{ position: 'absolute', top: '-20px', right: '-14px' }}>
        <Touchable
          onPress={onHandleClose}
          withFeedback
        >
          <Icon
            name="remove_circle_outline"
            color="black"
          />
        </Touchable>
      </div>
      <div>
        {file.type.includes( 'image' ) ? (
          <div
            style={{
              width: 50,
              height: 50,
              padding: 2,
            }}
          >
            <img
              src={window.URL.createObjectURL( file )}
              style={{ width: '100%', height: '100%' }}
            />
            <Text
              text={trimAndAppendDots( file.name, 10 )}
              size="xxs"
            />
          </div>
        ) : (
          <Box
            flexDirection="column"
            margin="10px 0px"
            padding="2px"
            height="50px"
            width="50px"
          >
            <Icon
              name={previewIcons[file.type] ? previewIcons[file.type] : previewIcons.default}
              color="black"
              size="xl"
            />
            <Box marginTop="10px">
              <Text
                whiteSpace="pre-line"
                text={trimAndAppendDots( file.name, 8 )}
                size="xxs"
              />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

Preview.propTypes = {
  file: array,
  onHandleClose: func,
};

export default Preview;
