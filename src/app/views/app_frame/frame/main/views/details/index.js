import React, { useState, useRef, useEffect } from 'react'
import { prop, pathOr, toUpper, map, keys, includes } from 'ramda'
import { connect } from 'react-redux'

import { Typography, Avatar, LinearProgress, CircularProgress } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import EditIcon from '@material-ui/icons/Edit'
import onUpdateSignature from './helpers/on-update-signature'
import onSubmit from './helpers/on-submit'
import useStyles from './styles'
import { Col, Row } from '../../components/layouts'
import RowItem from './row_item'
import VideoPlayer from './video_player'

import getFieldsForType from './helpers/get-fields-for-type'
import makeOnUpdate from './helpers/make-on-update'

const Details = ({
  viewing,
  attributes,
  targetCode,
  setViewing,
  setLoading,
  googleApiKey,
  mini,
  noMap,
  user,
}) => {
  const detailView = prop(targetCode, attributes)
  const print = prop => pathOr('', [`PRI_${toUpper(prop || '')}`, 'value'], detailView)
  const details = getFieldsForType(detailView, print)

  const [rating, setRating] = useState(pathOr(0, ['PRI_RATING', 'value'], detailView))
  const [signature, setSignature] = useState(null)
  const [editing, setEditing] = useState(false)
  const signatureRef = useRef()
  const classes = useStyles()

  const onUpdate = makeOnUpdate({ user, targetCode })
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

  useEffect(
    () => {
      if (!!signature)
        onUpdateSignature({
          targetCode,
          sourceCode: pathOr('', ['data', 'code'], user),
          questionCode: 'QUE_AGREEMENT_DOCUMENT_INTERN_SIGNATURE',
          attributeCode: 'PRI_INTERN_AGREEMENT_SIGNATURE',
          askId: 171,
          signature,
        })
    },
    [signature],
  )

  useEffect(
    () => {
      onUpdate({ code: 'PRI_RATING', value: rating })
    },
    [rating],
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
            weight={pathOr(0, [attributeCode, 'weight'], detailView)}
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
            editing={editing}
            onUpdate={onUpdate}
          />
        ),
        details,
      )}
      {includes('PRI_IS_INTERNSHIP', keys(detailView)) ? (
        <VideoPlayer url={pathOr('', ['PRI_LOOM_URL', 'value'], detailView)} mini />
      ) : null}
    </Col>
  ) : (
    <Row top left>
      <Col left spacing={4} className={classes.detailsContainer}>
        {includes('PRI_IS_INTERNSHIP', keys(detailView)) ? (
          <Typography variant="h5" style={{ marginBottom: '2rem' }}>
            {print('name')}
          </Typography>
        ) : null}
        {!includes('PRI_IS_INTERNSHIP', keys(detailView)) &&
        !includes('PRI_INTERN_AGREEMENT_SIGNATURE', keys(detailView)) ? (
          <Col stretch>
            <Typography variant="h5" style={{ marginBottom: '2rem' }}>
              {print('name')}
            </Typography>
            <Row left spacing={2}>
              <Avatar alt={print('name')} src={print('user_profile_picture')} />
              <Col left>
                <Typography>{`${print('address_full')}`}</Typography>
                <Typography>{`${print('email')}`}</Typography>
              </Col>
            </Row>
          </Col>
        ) : (
          <div />
        )}
        {map(
          ({ valueString, attributeName, attributeCode, type }) => (
            <RowItem
              weight={pathOr(0, [attributeCode, 'weight'], detailView)}
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
              noMap={noMap}
              editing={editing}
              onUpdate={onUpdate}
            />
          ),
          details,
        )}
      </Col>
      <ToggleButton
        className={classes.editButton}
        value="editing"
        selected={editing}
        onChange={() => setEditing(!editing)}
      >
        <EditIcon color="inherit" />
      </ToggleButton>
    </Row>
  )
}

const mapStateToProps = state => ({
  user: state.vertx.user,
})

export default connect(mapStateToProps)(Details)
