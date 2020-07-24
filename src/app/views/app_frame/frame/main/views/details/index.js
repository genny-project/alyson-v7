import React, { useState, useRef, useEffect } from 'react'
import { prop, pathOr, toUpper, map, keys, includes } from 'ramda'

import {
  Grid,
  Typography,
  Avatar,
  LinearProgress,
  CircularProgress,
  Button,
} from '@material-ui/core'
import onUpdateSignature from './helpers/on-update-signature'
import onSubmit from './helpers/on-submit'
import makeOnEdit from './helpers/make-on-edit'
import useStyles from './styles'
import { Col } from '../../components/layouts'
import RowItem from './row_item'
import VideoPlayer from './video_player'

import getFieldsForType from './helpers/get-fields-for-type'

const Details = ({
  viewing,
  attributes,
  targetCode,
  setViewing,
  setLoading,
  googleApiKey,
  mini,
  noMap,
}) => {
  const detailView = prop(targetCode, attributes)
  const print = prop => pathOr('', [`PRI_${toUpper(prop || '')}`, 'value'], detailView)
  const testIdCode = prop => pathOr('', [`PRI_${toUpper(prop || '')}`, 'attributeCode'], detailView)
  const details = getFieldsForType(detailView, print, testIdCode)

  const [rating, setRating] = useState(0)
  const [signature, setSignature] = useState(null)
  const signatureRef = useRef()
  const classes = useStyles()

  const handleSubmit = () =>
    onSubmit({
      setViewing,
      setLoading,
      redirect: () => setViewing({ view: 'BUCKET' }),
      parentCode: targetCode,
      rootCode: 'QQQ_QUESTION_GROUP',
    })({
      ask: { questionCode: 'QQQ_QUESTION_GROUP_BUTTON_CANCEL_SUBMIT', targetCode },
    })

  const onEdit = makeOnEdit({ detailView, setViewing, targetCode })

  useEffect(
    () => {
      if (!!signature)
        onUpdateSignature({
          targetCode,
          sourceCode: 'PER_USER1',
          questionCode: 'QUE_AGREEMENT_DOCUMENT_INTERN_SIGNATURE',
          attributeCode: 'PRI_INTERN_AGREEMENT_SIGNATURE',
          askId: 171,
          signature,
        })
    },
    [signature],
  )

  if (!details) {
    return <CircularProgress />
  }

  return viewing.code === 'QUE_PRI_EVENT_VIEW_AGREEMENT' &&
    !includes('PRI_INTERN_AGREEMENT_SIGNATURE', keys(detailView)) ? (
    <LinearProgress />
  ) : mini ? (
    <Col stretch fullWidth className={classes.miniContainer}>
      <Typography variant="h5" style={{ marginBottom: '2rem' }}>
        {print('name')}
      </Typography>
      {map(
        ({ valueString, attributeName, attributeCode, type }) => (
          <RowItem
            key={attributeName + 'item'}
            label={attributeName}
            value={valueString}
            code={attributeCode}
            rating={rating}
            setRating={setRating}
            classes={classes}
            type={type}
            signatureRef={signatureRef}
            signature={signature}
            setSignature={setSignature}
            handleSubmit={handleSubmit}
            googleApiKey={googleApiKey}
            mini
          />
        ),
        details,
      )}
      {includes('PRI_IS_INTERNSHIP', keys(detailView)) &&
      pathOr('', ['PRI_LOOM_URL', 'value'], detailView) ? (
        <VideoPlayer url={pathOr('', ['PRI_LOOM_URL', 'value'], detailView)} mini />
      ) : null}
    </Col>
  ) : (
    <Grid container direction="column" spacing={4} className={classes.detailsContainer}>
      <Button onClick={onEdit}>{`EDIT`}</Button>
      {includes('PRI_IS_INTERNSHIP', keys(detailView)) ? (
        <Typography variant="h5" style={{ marginBottom: '2rem' }}>
          {print('name')}
        </Typography>
      ) : null}
      {!includes('PRI_IS_INTERNSHIP', keys(detailView)) &&
      !includes('PRI_INTERN_AGREEMENT_SIGNATURE', keys(detailView)) ? (
        <div>
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: '2rem' }} test-id={testIdCode('name')}>
              {print('name')}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt={print('name')} src={print('user_profile_picture')} />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography test-id={testIdCode('address_full')}>{`${prop('full_address', print('address_full') || {}) ||
                      print('address_full')}`}</Typography>
                  </Grid>
                  <Grid item test-id={testIdCode('email')}>
                    <Typography>{`${print('email')}`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div />
      )}
      {map(
        ({ valueString, attributeName, attributeCode, type, testCode }) => (
          <RowItem
            key={attributeName + 'item'}
            label={attributeName}
            value={valueString}
            code={attributeCode}
            rating={rating}
            setRating={setRating}
            classes={classes}
            type={type}
            signatureRef={signatureRef}
            signature={signature}
            setSignature={setSignature}
            handleSubmit={handleSubmit}
            googleApiKey={googleApiKey}
            noMap
            testCode={testCode}
          />
        ),
        details,
      )}
    </Grid>
  )
}

export default Details
