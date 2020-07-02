import React, { useState, useRef, useEffect } from 'react'
import { prop, path, toUpper, contains, map, keys } from 'ramda'

import { Grid, Typography, Avatar, LinearProgress } from '@material-ui/core'
import onUpdateSignature from './helpers/on-update-signature'
import onSubmit from './helpers/on-submit'
import useStyles from './styles'
import { Row, Col } from '../../components/layouts'
import RowItem from './row_item'
import VideoPlayer from './video_player'
// TODO: Backend should send us the correct detail view specs

const printIntern = [
  { label: 'Mobile', code: 'mobile' },
  { label: 'Education Provider', code: 'assoc_ep' },
  { label: 'Current Course', code: 'current_course' },
  { label: 'Student Id', code: 'student_id' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Rating', code: 'rating', type: 'rating' },
  { label: 'Transport Options', code: 'transport_options' },
  { label: 'Region', code: 'region' },
  { label: 'Next Scheduled Interview', code: 'next_interview' },
]

const printBeg = [
  { label: 'Host Company', code: 'assoc_hc' },
  { label: 'Host Company Rep', code: 'assoc_hcr' },
  { label: 'Intern Supervisor', code: 'assoc_supervisor' },
  { label: 'Internship Address', code: 'address_full' },
  { label: 'Industry', code: 'industry' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Start Date', code: 'start_date' },
  { label: 'Days Per Week', code: 'days_per_week' },
  { label: 'Duration', code: 'internship_duration_stripped' },
  { label: 'Number of Interns', code: 'current_interns' },
  { label: 'Video Presentation of Internship Opportunity', code: 'loom_url', type: 'url' },
]

const printCpy = [
  { label: 'ABN', code: 'abn' },
  { label: 'Legal Name', code: 'legal_name' },
  { label: 'Company Phone', code: 'mobile' },
  { label: 'Decription', code: 'company_description' },
  { label: 'Website', code: 'company_website_url', type: 'url' },
  { label: 'Map View', code: 'address_full', type: 'street_view' },
]

const printHcr = [
  { label: 'Company', code: 'assoc_hc' },
  { label: 'Job Title', code: 'job_title' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Linkedin', code: 'linkedin_url', type: 'url' },
]

const printEp = [
  { label: 'ABN', code: 'abn' },
  { label: 'Legal Name', code: 'legal_name' },
  { label: 'Provider ID', code: 'provider_id' },
  { label: 'Phone', code: 'mobile' },
  { label: 'Address', code: 'address_full' },
  { label: 'Description', code: 'company_description' },
  { label: 'Website', code: 'company_website_url', type: 'url' },
]

const printEpr = [
  { label: 'Education Provider', code: 'education_provider' },
  { label: 'Job Title', code: 'job_title' },
  { label: 'Department', code: 'department' },
  { label: 'Email', code: 'email' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Linkedin', code: 'linkedin_url' },
]

const printApp = [
  { label: 'Student Id', code: 'student_id' },
  { label: 'Industry', code: 'assoc_industry' },
  { label: 'Education Provider', code: 'education_provider' },
  { label: 'Current Course', code: 'current_course' },
  { label: 'Specialisation', code: 'assoc_occupation' },
  { label: 'Mobile', code: 'mobile' },
  { label: 'Email', code: 'email' },
]

const printAgreement = [
  { label: 'Agreement', code: 'agreement_html', type: 'html' },
  { label: 'Intern Signature', code: 'intern_agreement_signature', type: 'signature' },
]
const Details = ({
  viewing,
  attributes,
  targetCode,
  setViewing,
  setLoading,
  googleApiKey,
  mini,
}) => {
  const detailView = prop(targetCode, attributes)

  const print = prop => path([`PRI_${toUpper(prop || '')}`, 'value'], detailView) || ''

  const detailType = contains('PRI_INTERN_AGREEMENT_SIGNATURE', keys(detailView))
    ? printAgreement
    : contains('PRI_IS_INTERN', keys(detailView))
      ? printIntern
      : contains('PRI_IS_INTERNSHIP', keys(detailView))
        ? printBeg
        : contains('PRI_IS_HOST_CPY_REP', keys(detailView)) ||
          contains('PRI_IS_RP_REP', keys(detailView))
          ? printHcr
          : contains('PRI_IS_HOST_CPY', keys(detailView)) || contains('PRI_IS_RP', keys(detailView))
            ? printCpy
            : contains('PRI_IS_EDU_PROVIDER', keys(detailView))
              ? printEp
              : contains('PRI_IS_EDU_PRO_REP', keys(detailView))
                ? printEpr
                : contains('PRI_COMPASS', keys(detailView))
                  ? printApp
                  : printCpy

  const [rating, setRating] = useState(0)
  const [signature, setSignature] = useState(null)
  const [showVideo, setShowVideo] = useState(false)
  const [url, setUrl] = useState(null)
  const signatureRef = useRef()
  const classes = useStyles()

  const handleSubmit = () =>
    onSubmit({
      setLoading,
      redirect: () => setViewing({ view: 'BUCKET' }),
      parentCode: targetCode,
      rootCode: 'QQQ_QUESTION_GROUP',
    })({
      ask: { questionCode: 'QQQ_QUESTION_GROUP_BUTTON_CANCEL_SUBMIT', targetCode },
    })

  const details = map(
    ({ label, code, type }) => ({ type, valueString: print(code), attributeName: label }),
    detailType,
  )

  const handleVideo = (value) => {
    setShowVideo(true)
    setUrl(value)
    }

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

  return viewing.code === 'QUE_PRI_EVENT_VIEW_AGREEMENT' &&
    !contains('PRI_INTERN_AGREEMENT_SIGNATURE', keys(detailView)) ? (
    <LinearProgress />
  ) : mini ? (
    <Row left top spacing={3} className={classes.miniContainer}>
      {map(
        ({ valueString, attributeName, attributeCode, type }) => (
          <RowItem
            key={attributeCode}
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
    </Row>
  ) : (
    <Grid container direction="column" spacing={4} className={classes.detailsContainer}>
      {detailType !== printAgreement ? (
        <div>
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: '2rem' }}>
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
                    <Typography>{print('address_full')}</Typography>
                  </Grid>
                  <Grid item>
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
        ({ valueString, attributeName, attributeCode, type }) => (
          <RowItem
            key={attributeCode}
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
            handleVideo={handleVideo}
          />
        ),
        details,
      )}
      {
        showVideo ? <VideoPlayer url={url}/> : null
      }
    </Grid>
  )
}

export default Details
