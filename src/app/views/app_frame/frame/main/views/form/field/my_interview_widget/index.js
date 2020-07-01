import React from 'react'

import makeHandleUpdate from '../../helpers/make-handle-update'

const MyInterviewWidget = ({ fieldData, label, onUpdate, user, setErrors }) => {
  console.log(fieldData)

  const handleUpdate = makeHandleUpdate(onUpdate)(fieldData, setErrors)

  const script = document.createElement('script')
  script.src = 'https://embed.myinterview.com/widget/2.28.0/widget.js'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
  script.onload = () => {
    var myInterviewRecorder = new myInterviewWidget({
      container: '#myinterview-container',
      config: {
        apiKey: 'TCeni10RVWO0jEJHN3uF',
        completeCallback: handleUpdate,
        button: {
          color: 'red',
          size: 'small',
          text: 'Record Intruoduction',
        },
        parts: [
          {
            question: 'Introduce Yourself',
            partDuration: 30,
            description:
              "Record a video introducing yourself, explaining what you have studied and the kind of internship you're looking for",
            explanation: 'This introduction is your opportunity to make a great first impression',
            points: [
              'Dress professionally.',
              'Look directly at the webcam.',
              'Speak clearly and at a steady pace.',
              'Make sure that the room you are in is well lit and quiet.',
              "Don't forget to smile!",
              "State your name, what and wear you have studied and the kind of internship you're looking for.",
            ],
            conclusion: `This section may take less than 15 seconds to complete, please click stop when you are finished speaking.`,
            numOfRetakes: 3,
          },
        ],
        firstScreenTitle: 'Introduce yourself to prospective host companies',
        firstScreenSubOne: 'Less than 5 minutes to complete',
        firstScreenSubTwo: 'We will guide you along the way',
        language: 'en',
        user,
        setup: true,
        introVideo: 'https://www.youtube.com/watch?v=E5tfDFwokeQ',
        region: 'au',
      },
    })
  }
  return <div id="myinterview-container" />
}

export default MyInterviewWidget
