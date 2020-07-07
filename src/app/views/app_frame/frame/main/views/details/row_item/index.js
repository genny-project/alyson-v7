import React from 'react'

import { Row } from '../../../components/layouts'
import { Grid, Typography, Button, Link } from '@material-ui/core'
import StreetView from '../street_view'
import SignatureCanvas from 'react-signature-canvas'
import { Rating } from '@material-ui/lab'
import Video from '../video_player'

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
  noMap,
}) =>
  mini ? (
    type === 'street_view' || type === 'video' ? null : type === 'html' ? (
      <div dangerouslySetInnerHTML={{ __html: value }} />
    ) : (
      <Row spaceBetween fullWidth>
        <Typography color="secondary" variant="subtitle2">
          {label}
        </Typography>
        <Typography variant="subtitle1" className={classes.miniValue} noWrap>
          {`${value}`}
        </Typography>
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
          <Link
            component="button"
            variant="body2"
            onClick={() => (window.location = `https://${value}`)}
          >
            {value}
          </Link>
        ) : type === 'street_view' ? (
          <StreetView address={value} apiKey={googleApiKey} />
        ) : type === 'video' ? (
          <Video url={value} />
        ) : (
          <Typography>{`${value.full_address || value}`}</Typography>
        )}
      </Grid>
    </Grid>
  )

export default RowItem
