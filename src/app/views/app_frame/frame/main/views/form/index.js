import React, { useState } from 'react'
import { pathOr, map, prop, not, isEmpty } from 'ramda'
import { Grid, Typography, CircularProgress } from '@material-ui/core'

import onSubmit from './field/actions/on-submit'

import Field from './field'

import useStyles from './styles'

const Form = ({
  redirect,
  setViewing,
  setLoading,
  currentAsk,
  attributes,
  baseEntities,
  googleApiKey,
  viewing: { viewingRedirect },
  user,
}) => {
  if (not(isEmpty(currentAsk))) {
    const title = pathOr('', ['question', 'name'], currentAsk)
    const formFields = pathOr([], ['childAsks'], currentAsk)

    const defaultValues = pathOr({}, [prop('targetCode', currentAsk)], attributes)

    const parentCode = prop('questionCode', currentAsk)
    const rootCode = prop('questionCode', currentAsk)

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
        {map(field => (
          <Grid className={classes.formItem} item key={`gridItem${field.questionCode}`}>
            <Field
              key={field.questionCode}
              fieldData={field}
              baseEntities={baseEntities}
              meta={meta}
              googleApiKey={googleApiKey}
              defaultValues={defaultValues}
              user={user}
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
