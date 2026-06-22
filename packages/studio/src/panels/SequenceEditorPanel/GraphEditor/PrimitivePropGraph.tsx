import type SheetObject from '@framewright/core/sheetObjects/SheetObject'
import getStudio from '@framewright/studio/getStudio'
import type {PathToProp} from '@framewright/utils/pathToProp'
import type {SequenceTrackId} from '@framewright/core/types/public'
import {usePrism} from '@framewright/react'
import type {Pointer} from '@framewright/dataverse'
import {val} from '@framewright/dataverse'
import React from 'react'
import type {SequenceEditorPanelLayout} from '@framewright/studio/panels/SequenceEditorPanel/layout/layout'
import BasicKeyframedTrack from './BasicKeyframedTrack/BasicKeyframedTrack'
import type {GraphEditorColors} from '@framewright/core/types/private'

const PrimitivePropGraph: React.FC<{
  layoutP: Pointer<SequenceEditorPanelLayout>
  sheetObject: SheetObject
  pathToProp: PathToProp
  trackId: SequenceTrackId
  color: keyof GraphEditorColors
}> = (props) => {
  return usePrism(() => {
    const {sheetObject, trackId} = props
    const trackData = val(
      getStudio()!.atomP.historic.coreByProject[sheetObject.address.projectId]
        .sheetsById[sheetObject.address.sheetId].sequence.tracksByObject[
        sheetObject.address.objectKey
      ].trackData[trackId],
    )

    if (trackData?.type !== 'BasicKeyframedTrack') {
      console.error(
        `trackData type ${trackData?.type} is not yet supported on the graph editor`,
      )
      return <></>
    } else {
      return <BasicKeyframedTrack {...props} trackData={trackData} />
    }
  }, [props.trackId, props.layoutP])
}

export default PrimitivePropGraph
