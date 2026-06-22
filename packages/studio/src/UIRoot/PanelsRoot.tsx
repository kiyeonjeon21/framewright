import OutlinePanel from '@framewright/studio/panels/OutlinePanel/OutlinePanel'
import DetailPanel from '@framewright/studio/panels/DetailPanel/DetailPanel'
import React from 'react'
import getStudio from '@framewright/studio/getStudio'
import {useVal} from '@framewright/react'
import ExtensionPaneWrapper from '@framewright/studio/panels/BasePanel/ExtensionPaneWrapper'
import SequenceEditorPanel from '@framewright/studio/panels/SequenceEditorPanel/SequenceEditorPanel'

const PanelsRoot: React.FC = () => {
  const panes = useVal(getStudio().paneManager.allPanesD)
  const paneEls = Object.entries(panes).map(([instanceId, paneInstance]) => {
    return (
      <ExtensionPaneWrapper
        key={`pane-${instanceId}`}
        paneInstance={paneInstance!}
      />
    )
  })

  return (
    <>
      {paneEls}
      <OutlinePanel />
      <DetailPanel />
      <SequenceEditorPanel />
    </>
  )
}

export default PanelsRoot
