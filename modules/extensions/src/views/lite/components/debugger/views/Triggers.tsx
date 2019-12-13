import { Pre } from '@blueprintjs/core'
import { IO } from 'botpress/sdk'
import _ from 'lodash'
import React, { FC } from 'react'

import style from '../style.scss'

const sortTriggersByScore = triggers => {
  const result = Object.keys(triggers).map(id => {
    const trigger = triggers[id]
    const values = _.values(trigger.result)
    const score = _.sum(values) / values.length

    return { id, goal: trigger.goal, result: trigger.result, score: isNaN(score) ? -1 : score }
  })

  return _.orderBy(result, 'score', 'desc')
}

export const Triggers: FC<{ ndu: IO.DialogUnderstanding }> = ({ ndu }) => {
  if (!ndu || !ndu.triggers) {
    return null
  }

  const sorted = sortTriggersByScore(ndu.triggers)

  const listResults = results => {
    const keys = Object.keys(results || [])
    if (!keys.length) {
      return <li>No results</li>
    }

    return keys.map(id => (
      <li>
        {id}: {_.round(results[id], 3)}
      </li>
    ))
  }

  return (
    <Pre className={style.inspectorContainer}>
      {sorted.map(trigger => {
        return (
          <div style={{ paddingBottom: 10 }}>
            <strong>{trigger.goal.replace('.flow.json', '')}</strong>
            <small> ({trigger.id}) </small>
            <ul>{listResults(trigger.result)}</ul>
          </div>
        )
      })}
    </Pre>
  )
}
