export const formatTimestamp = (isoTimestamp) => {
  const date = new Date(isoTimestamp)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()
  const hours = +date.getUTCHours().toString().padStart(2, '0') + 1
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
  //return `${day}/${month}/${year}`
}

export const isLocalDev = () => {
  const env = import.meta.env.MODE
  return env === 'localenv'
}

export const isDev = () => {
  const env = import.meta.env.MODE
  return ['localenv', 'test', 'dev'].includes(env)
}

const isThirdLevelSelector = (fieldSchema) => {
  return fieldSchema.sourceRenderer === 'csi-third-level-selector-field'
}

const isUrgencySelector = (fieldSchema) => {
  return fieldSchema.customType === 'csi-urgency-selector-field'
}

const isSelectField = (fieldSchema) => {
  return fieldSchema.customRenderer === 'csi-select-field'
}

export const remapFieldsFromIdToLabel = (uiSchema, data) => {
  const resultData = {}
  const { elements } = uiSchema

  Object.entries(data).map(([key, value]) => {
    const uiElement = elements.find((element) => {
      const elementName = element.scope.split('/').pop()

      return elementName === key
    })

    const remappedName = uiElement.label || uiElement.scope.split('/').pop()
    uiElement
      ? (resultData[remappedName] = value)
      : console.log(`something wrong with field ${key}`)
  })

  return resultData
}

export const remapFieldsFromLabelToId = (uiSchema, data) => {
  const resultData = {}
  const { elements } = uiSchema

  Object.entries(data).map(([key, value]) => {
    const uiElement = elements.find((element) => {
      const elementName = element.scope.split('/').pop()
      const elementLabel = element.label

      return elementLabel === key || elementName === key
    })

    const remappedName = uiElement.scope.split('/').pop()

    uiElement
      ? (resultData[remappedName] = value)
      : console.log(`something wrong with field ${key}`)
  })

  return resultData
}

export const handleDataBeforeSaving = ({ data, formSchema }) => {
  const { body } = formSchema

  const resultData = remapFieldsFromIdToLabel(formSchema.layouts, data)

  for (const field of Object.keys(body.properties)) {
    // remap third level field object
    if (isThirdLevelSelector(body.properties[field]) && resultData[field]) {
      const info = resultData[field]
      resultData['__livello_3'] = info.value
      resultData[field] = info.text
      resultData['__typology'] = info.typology ?? ''
      continue
    }

    // remap urgency selector field object
    if (isUrgencySelector(body.properties[field]) && resultData[field]) {
      const info = resultData[field]
      resultData['__urgency'] = info.value
      delete resultData[field]
      continue
    }

    /*
      selectField returns an object but here we just want the value
    */
    if (isSelectField(body.properties[field]) && resultData[field]) {
      const info = resultData[field]
      resultData[field] = info.value
    }
  }

  return resultData
}


/* TODO: FIREFOX FIX VERSION
!! TEMPORANEO DA SOSTITUIRE CON AGGIORNAMENTO DI FIREFOX versione: 128.0 !
risolvo bug temporaneo per tutti i bottoni che fanno azioni da mostrare il componenente Modal.vue
guardiamo se vengono effettuati cambiamenti al componente modale (se è showata === true, rimandiamo l'utente al top della pagina), 
watcher applicato a tutte le versioni di Firefox precedenti alla < 128.0
*/
const isOldFireFox = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('firefox') && userAgent.split('firefox/')[1].split('.')[0] <= 128;
}

export const scrollOnFireFox = (goOnTop = true) => {
  // check per fix problema modale firefox versioni <= 128
  if (!isOldFireFox()) {
    return;
  }
  const options = { top: goOnTop ? 0 : document.body.scrollHeight, behavior: 'smooth' }
  window.scrollTo(options);
}