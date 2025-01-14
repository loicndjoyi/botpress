import { Dialog } from '@blueprintjs/core'
import _ from 'lodash'
import React, { FC } from 'react'

import Editor from '.'

interface Props {
  closeQnAModal: () => void
  fetchData: () => void
  updateQuestion: any
  page: any
  filters: any
  id: any
  isEditing: boolean
  contentLang: any
  showQnAModal: boolean
  categories: any
  bp: any
  flowsList: any
  flows: any
}

const EditorModal: FC<Props> = props => {
  return (
    <Dialog
      title={props.isEditing ? 'Edit Q&A' : 'Create a new Q&A'}
      icon={props.isEditing ? 'edit' : 'add'}
      isOpen={props.showQnAModal}
      onClose={props.closeQnAModal}
      transitionDuration={0}
      canOutsideClickClose={false}
      style={{ width: 700 }}
      enforceFocus={false}
    >
      <Editor {...props} />
    </Dialog>
  )
}

export default EditorModal
