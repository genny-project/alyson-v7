import React from 'react'
import { path, toLower, includes, has, not, prop } from 'ramda'
import makeOnUpdate from '../helpers/actions/on-update'
import { Typography } from '@material-ui/core'

import RadioGroup from './radio_group'
import PhoneNumberInput from './phone_number'
import DropdownSelect from './dropdown'
import SubmitButton from './submit_button'
import AddressSelect from './address_select'
import TextInput from './text_input'
import ImageUpload from './image_upload'
import RichTextEditor from './rich_text'
import DateTimePicker from './date_time_picker'
import HtmlDisplay from './html_display'
import MyInterviewWidget from './my_interview_widget'

const Field = ({
  fieldData,
  baseEntities,
  meta: { onSubmit, errors, setErrors, pristine, setPristine, touched, setTouched },
  formFields,
  googleApiKey,
  defaultValues,
  user,
}) => {
  const label = path(['name'], fieldData)
  const dataType = path(['question', 'attribute', 'dataType'], fieldData)
  const fieldType = toLower(path(['typeName'], dataType))

  const {
    attributeCode,
    question: { code: questionCode, name },
    mandatory,
  } = fieldData

  if (not(has(questionCode, errors))) {
    setErrors(errors => ({
      ...errors,
      [questionCode]: questionCode !== 'QUE_SUBMIT' && mandatory,
    }))
  }

  const initialValue = path([attributeCode, 'value'], defaultValues) || false

  const touchedField = prop(questionCode, touched)

  const onUpdate = makeOnUpdate({
    setErrors,
    mandatory,
    setPristine,
    fieldData,
    touched,
    setTouched,
  })

  return fieldType === 'text' ||
    fieldType === 'email' ||
    fieldType === 'abn number' ||
    fieldType === 'java.lang.integer' ? (
    <TextInput
      initialValue={initialValue}
      fieldData={fieldData}
      label={label}
      onUpdate={onUpdate}
      errors={errors}
      fieldType={fieldType}
      touched={touchedField}
    />
  ) : fieldType === 'radio' ? (
    <RadioGroup
      fieldData={fieldData}
      label={label}
      baseEntities={baseEntities}
      onUpdate={onUpdate}
      errors={errors}
      questionCode={questionCode}
      touched={touchedField}
      initialValue={initialValue}
    />
  ) : fieldType === 'mobile' || fieldType === 'landline' ? (
    <PhoneNumberInput
      fieldData={fieldData}
      label={label}
      onUpdate={onUpdate}
      fieldType={fieldType}
      errors={errors}
      questionCode={questionCode}
      touched={touchedField}
      initialValue={initialValue}
    />
  ) : fieldType === 'dropdown' || fieldType === 'dropdownmultiple' || fieldType === 'tag' ? (
    <DropdownSelect
      initialValue={initialValue}
      fieldData={fieldData}
      baseEntities={baseEntities}
      label={label}
      multiple={includes('multiple', fieldType) || fieldType === 'tag'}
      onUpdate={onUpdate}
      errors={errors}
      setErrors={setErrors}
      questionCode={questionCode}
      touched={touchedField}
    />
  ) : fieldType === 'buttonevent' ? (
    <SubmitButton
      fieldData={fieldData}
      label={label}
      onSubmit={onSubmit}
      errors={errors}
      setErrors={setErrors}
      pristine={pristine}
      questionCode={questionCode}
      formFields={formFields}
      touched={touchedField}
    />
  ) : fieldType === 'address' ? (
    <AddressSelect
      onUpdate={onUpdate}
      fieldData={fieldData}
      googleApiKey={googleApiKey}
      setErrors={setErrors}
      questionCode={questionCode}
      touched={touchedField}
      initialValue={initialValue}
      label={label}
    />
  ) : fieldType === 'image' ? (
    <ImageUpload
      fieldData={fieldData}
      label={label}
      onUpdate={onUpdate}
      questionCode={questionCode}
      touched={touchedField}
    />
  ) : fieldType === 'htmlarea' || fieldType === 'textarea' ? (
    <RichTextEditor
      fieldData={fieldData}
      label={label}
      errors={errors}
      setErrors={setErrors}
      onUpdate={onUpdate}
      questionCode={questionCode}
      touched={touchedField}
      initialValue={initialValue}
    />
  ) : fieldType === 'java.time.localdate' ? (
    <DateTimePicker
      onUpdate={onUpdate}
      fieldData={fieldData}
      label={label}
      errors={errors}
      setErrors={setErrors}
      questionCode={questionCode}
      touched={touchedField}
      initialValue={initialValue}
    />
  ) : fieldType === 'time' ? (
    <DateTimePicker
      onUpdate={onUpdate}
      fieldData={fieldData}
      label={label}
      errors={errors}
      setErrors={setErrors}
      inputType="time"
      questionCode={questionCode}
      touched={touchedField}
      initialValue={initialValue}
    />
  ) : fieldType === 'htmleditor' ? (
    <HtmlDisplay fieldData={fieldData} label={label} touched={touchedField} />
  ) : fieldType === 'myinterviewwidget' ? (
    <MyInterviewWidget
      fieldData={fieldData}
      label={label}
      onUpdate={onUpdate}
      questionCode={questionCode}
      user={user}
      setErrors={setErrors}
      touched={touchedField}
      initialValue={initialValue}
    />
  ) : fieldType === 'json' ? (
    <Typography>{name}</Typography>
  ) : (
    <div />
  )
}

export default Field
