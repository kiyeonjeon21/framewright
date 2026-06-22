import {useVal} from '@framewright/react'
import type {Pointer} from '@framewright/dataverse'
import React from 'react'
import styled from 'styled-components'
import type {SequenceEditorPanelLayout} from '@framewright/studio/panels/SequenceEditorPanel/layout/layout'
import Left from './Left/Left'
import DopeSheetBackground from './Right/DopeSheetBackground'
import Right from './Right/Right'
import VerticalScrollContainer from '@framewright/studio/panels/SequenceEditorPanel/VerticalScrollContainer'

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
`

const DopeSheet: React.VFC<{layoutP: Pointer<SequenceEditorPanelLayout>}> = ({
  layoutP,
}) => {
  const height = useVal(layoutP.dopeSheetDims.height)

  return (
    <Container style={{height: height + 'px'}}>
      <DopeSheetBackground layoutP={layoutP} />
      <VerticalScrollContainer>
        <Left layoutP={layoutP} />
        <Right layoutP={layoutP} />
      </VerticalScrollContainer>
    </Container>
  )
}

export default DopeSheet
