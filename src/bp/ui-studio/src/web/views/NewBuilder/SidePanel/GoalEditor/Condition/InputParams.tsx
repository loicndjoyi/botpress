import { Checkbox, FormGroup, InputGroup, NumericInput } from '@blueprintjs/core'
import { Condition } from 'botpress/sdk'
import _ from 'lodash'
import React, { FC } from 'react'

import Dropdown from './Dropdown'

interface Props {
  condition: Condition
  updateParams: (params: any) => void
  params?: any
}

const InputParams: FC<Props> = props => {
  const updateParam = (key: string, value: any) => {
    props.updateParams({ ...props.params, [key]: value })
  }

  return (
    <div style={{ padding: 10 }}>
      {Object.keys(props.condition.params).map(key => {
        const { defaultValue, label, type, list } = props.condition.params[key]
        const value = (props.params && props.params[key]) || defaultValue

        if (type === 'string') {
          return (
            <FormGroup key={label} label={label}>
              <InputGroup value={value} onChange={e => updateParam(key, e.currentTarget.value)} />
            </FormGroup>
          )
        } else if (type === 'number') {
          return (
            <FormGroup key={label} label={label}>
              <NumericInput value={value} onValueChange={value => updateParam(key, value)} />
            </FormGroup>
          )
        } else if (type === 'list') {
          return (
            <FormGroup key={label} label={label}>
              <Dropdown
                listOptions={list}
                defaultValue={defaultValue}
                selectedValue={value}
                onChange={item => updateParam(key, item && item.value)}
              />
            </FormGroup>
          )
        } else if (type === 'boolean') {
          return (
            <Checkbox
              key={label}
              label={label}
              checked={value}
              onChange={e => updateParam(key, e.currentTarget.checked)}
            />
          )
        }
      })}
    </div>
  )
}

export default InputParams
