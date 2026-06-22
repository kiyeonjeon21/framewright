/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import '@framewright/studio'
import type {SheetId} from '@framewright/core'
import {getProject} from '@framewright/core'
import {privateAPI} from '@framewright/core/privateAPIs'
import type {ProjectState_Historic} from '@framewright/core/types/private/core'
import type {SheetState_Historic} from '@framewright/core/types/private/core'
import * as t from '@framewright/core/propTypes'
import getStudio from '@framewright/studio/getStudio'
import {getCoreTicker} from '@framewright/core/coreTicker'
import {globals} from '@framewright/core/globals'
import theatre from '@framewright/core'

const defaultProps = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  color: t.rgba(),
  deeply: {
    nested: {
      checkbox: true,
    },
  },
}

let lastProjectN = 0

const studio = getStudio()!
void theatre.init({studio: true, usePersistentStorage: false})

export async function setupTestSheet(sheetState: SheetState_Historic) {
  const projectState: ProjectState_Historic = {
    definitionVersion: globals.currentProjectStateDefinitionVersion,
    sheetsById: {
      ['Sheet' as SheetId]: sheetState,
    },
    revisionHistory: [],
  }
  const project = getProject('Test Project ' + lastProjectN++, {
    state: projectState,
  })

  const ticker = getCoreTicker()

  ticker.tick()
  await project.ready
  const sheetPublicAPI = project.sheet('Sheet')
  const objPublicAPI = sheetPublicAPI.object('obj', defaultProps)

  const obj = privateAPI(objPublicAPI)

  return {
    obj,
    objPublicAPI,
    sheet: privateAPI(sheetPublicAPI),
    project,
    ticker,
    studio,
  }
}
