import React from 'react'
import ReactDOM from 'react-dom/client'
import theatre from '@framewright/core'
import {getProject} from '@framewright/core'
import {Scene} from './Scene'
import RemoteController from './RemoteController'

const project = getProject('Sample project')
void theatre.init({studio: true})
RemoteController(project)

ReactDOM.createRoot(document.getElementById('root')!).render(<Scene />)
