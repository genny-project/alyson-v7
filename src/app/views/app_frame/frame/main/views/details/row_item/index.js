import React from 'react'
import { includes } from 'ramda'

import { Row } from '../../../components/layouts'
import { Grid, Typography, Button, Link } from '@material-ui/core'
import StreetView from '../street_view'
import SignatureCanvas from 'react-signature-canvas'
import { Rating } from '@material-ui/lab'
import { format, parseISO } from 'date-fns'

const RowItem = ({
  signatureRef,
  signature,
  setSignature,
  key,
  label,
  value,
  code,
  rating,
  setRating,
  classes,
  type,
  handleSubmit,
  googleApiKey,
  mini,
  handleVideo,
}) =>
  mini ? (
    type ? null : (
      <Row left>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="subtitle1">{value}</Typography>
      </Row>
    )
  ) : (
    <Grid item>
      <Grid container direction="row">
        <Typography className={classes.label}>{label}</Typography>
        {type === 'rating' ? (
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        ) : type === 'html' ? (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ) : type === 'signature' ? (
          <Row>
            <div style={{ border: '1px solid grey', borderRadius: '1rem', minWidth: '40rem' }}>
              <SignatureCanvas
                ref={ref => (signatureRef = ref)}
                onEnd={() => setSignature(signatureRef.toDataURL())}
                canvasProps={{ width: '700', height: '300' }}
              />
            </div>
            <Button
              disabled={!signature}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >{`SUBMIT`}</Button>
          </Row>
        ) : type === 'url' ? (
          <button onClick={handleVideo}>{ value ? value : 'click me'}</button>
        ) : type === 'street_view' ? (
          <StreetView address={value} apiKey={googleApiKey} />
        ) : (
          <Typography>{value}</Typography>
        )}
      </Grid>
    </Grid>
  )

export default RowItem
