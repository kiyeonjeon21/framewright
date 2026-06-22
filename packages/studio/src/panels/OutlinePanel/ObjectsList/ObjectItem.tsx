import type SheetObject from '@framewright/core/sheetObjects/SheetObject'
import getStudio from '@framewright/studio/getStudio'
import React from 'react'
import BaseItem from '@framewright/studio/panels/OutlinePanel/BaseItem'
import {useVal} from '@framewright/react'
import {outlineSelection} from '@framewright/studio/selectors'
import useChordial from '@framewright/studio/uiComponents/chordial/useChodrial'

export const ObjectItem: React.VFC<{
  sheetObject: SheetObject
  depth: number
  overrideLabel?: string
}> = ({sheetObject, depth, overrideLabel}) => {
  const select = () => {
    getStudio()!.transaction(({stateEditors}) => {
      stateEditors.studio.historic.panels.outline.selection.set([
        {...sheetObject.address, type: 'SheetObject'},
      ])
    })
  }

  const selection = useVal(outlineSelection)

  const {targetRef} = useChordial(() => {
    return {
      title: `Object: ${sheetObject.address.objectKey}`,
      items: [],
    }
  })

  return (
    <BaseItem
      select={select}
      label={overrideLabel ?? sheetObject.address.objectKey}
      depth={depth}
      headerRef={targetRef}
      selectionStatus={
        selection.includes(sheetObject) ? 'selected' : 'not-selected'
      }
    />
  )
}
