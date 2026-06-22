import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import type {ISheetObject} from '@framewright/core'
import {onChange, types, val} from '@framewright/core'
import theatre from '@framewright/core'
import extension from '@framewright/r3f/dist/extension'

const dataConfig = {
  exampleProp: types.stringLiteral('yes', {
    no: 'no',
    yes: 'yes',
  }),
}

void theatre.getStudio().then((studio) => {
  studio.extend(extension)
  studio.extend({
    id: '@framewright/hello-world-extension',
    toolbars: {
      global(set, studio) {
        // A sheet object used by this extension
        const obj: ISheetObject<typeof dataConfig> = studio
          .getStudioProject()
          .sheet('example extension UI')
          .object('editor', dataConfig)

        const updateToolset = () =>
          set([
            {
              type: 'Switch',
              value: val(obj.props.exampleProp),
              onChange: (value) =>
                studio.transaction(({set}) =>
                  set(obj.props.exampleProp, value),
                ),
              options: [
                {
                  value: 'no',
                  label: 'say no',
                  svgSource: '👎',
                },
                {
                  value: 'yes',
                  label: 'say yes',
                  svgSource: '👍',
                },
              ],
            },
          ])

        const untapFn = onChange(obj.props.exampleProp, () => {
          updateToolset()
        })

        // initial update
        updateToolset()

        return untapFn
      },
    },
    panes: [],
  })
})
void theatre.init({studio: true})

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
