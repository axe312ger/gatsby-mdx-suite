import React from 'react'
import propTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed'
import styled from '@emotion/styled'

const StyledInstagramEmbed = styled(InstagramEmbed)`
  width: 40vw;
  min-width: 326px;
  max-width: ${({ maxWidth }) => maxWidth}px;
`

export default function InstagramPost({
  id,
  maxWidth = 600,
  hideCaption = true,
  ...props
}) {
  if (!id) {
    return null
  }

  return (
    <StyledInstagramEmbed
      maxWidth={maxWidth}
      hideCaption={hideCaption}
      url={`https://instagr.am/p/${id}/`}
    />
  )
}

InstagramPost.displayName = 'InstagramPost'

InstagramPost.propTypes = {
  id: propTypes.string.isRequired,
  hideCaption: propTypes.bool,
  maxWidth: propTypes.number,
}
