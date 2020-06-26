import React, { useState } from 'react'
import { path, map, prop } from 'ramda'
import { Grid, Typography, CircularProgress } from '@material-ui/core'

import onSubmit from './field/actions/on-submit'

import Field from './field'

import useStyles from './styles'

const Form = ({
  redirect,
  setViewing,
  setLoading,
  formView,
  attributes,
  baseEntities,
  googleApiKey,
  viewing: { viewingRedirect },
}) => {
  if (formView) {
    const title = path(['question', 'name'], formView)
    const formFields = path(['childAsks'], formView)
    const profileFormFields = [
      ...path(['childAsks', 0, 'childAsks'], formView),
      ...path(['childAsks', 1, 'childAsks'], formView),
    ]
    const defaultValues = path([prop('targetCode', formView)], attributes)

    const parentCode = prop('questionCode', formView)
    const rootCode = prop('questionCode', formView)

    const classes = useStyles()

    const [errors, setErrors] = useState({})
    const [pristine, setPristine] = useState(true)

    const meta = {
      errors,
      setErrors,
      pristine,
      setPristine,
      onSubmit: onSubmit({
        redirect: viewingRedirect || redirect,
        parentCode,
        rootCode,
        setLoading,
        setViewing,
      }),
    }

    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        className={classes.formRoot}
        spacing={2}
      >
        <Grid item>
          <Typography color="textSecondary" variant="h5">
            {title}
          </Typography>
        </Grid>
        {parentCode === 'QUE_USER_PROFILE_GRP'
          ? map(field => (
              <Grid className={classes.formItem} item key={`gridItem${field.questionCode}`}>
                <Field
                  key={field.questionCode}
                  fieldData={field}
                  baseEntities={baseEntities}
                  meta={meta}
                  googleApiKey={googleApiKey}
                  defaultValues={defaultValues}
                />
              </Grid>
            ))(profileFormFields)
          : map(field => (
              <Grid className={classes.formItem} item key={`gridItem${field.questionCode}`}>
                <Field
                  key={field.questionCode}
                  fieldData={field}
                  baseEntities={baseEntities}
                  meta={meta}
                  googleApiKey={googleApiKey}
                  defaultValues={defaultValues}
                />
              </Grid>
            ))(formFields)}
      </Grid>
    )
  } else {
    return <CircularProgress />
  }
}

export default Form
