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
  testCode
}) =>
  mini ? (
    type === 'street_view' || type === 'video' ? null : type === 'html' ? (
      <div dangerouslySetInnerHTML={{ __html: value }} />
    ) : (
      <Row fullWidth left>
        <Typography color="secondary" variant="subtitle2" className={classes.miniLabel}>
          {label}
        </Typography>
        <Typography variant="subtitle1" className={classes.miniValue} noWrap>
          {`${typeof value === 'object' ? value.full_address : value}`}
        </Typography>
      </Row>
    )
  ) : (
    <Grid item>
      <Grid container direction="row">
        <Typography className={classes.label} test-id={code}>{label}</Typography>
        {type === 'rating' ? (
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            test-id={testCode}
          />
        ) : type === 'html' ? (
          <div dangerouslySetInnerHTML={{ __html: value }} test-id={testCode}/>
        ) : type === 'signature' ? (
          <Row>
            <div style={{ border: '1px solid grey', borderRadius: '1rem', minWidth: '40rem' }}>
              <SignatureCanvas
                ref={ref => (signatureRef = ref)}
                onEnd={() => setSignature(signatureRef.toDataURL())}
                canvasProps={{ width: '700', height: '300' }}
                test-id={testCode}
              />
            </div>
            <Button
              disabled={!signature}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              test-id={testCode}
            >{`SUBMIT`}</Button>
          </Row>
        ) : type === 'url' ? (
          <Link
            component="button"
            variant="body2"
            onClick={() => (window.location = `https://${value}`)}
            test-id={testCode}
          >
            {value}
          </Link>
        ) : type === 'street_view' ? (
          <StreetView address={value} apiKey={googleApiKey} test-id={testCode}/>
        ) : type === 'video' ? (
          <Video url={value} test-id={testCode}/>
        ) : (
          <Typography test-id={testCode}>{`${value.full_address || value}`}</Typography>
        )}
      </Grid>
    </Grid>
  )

export default RowItem
