import React from 'react'
import propTypes from 'prop-types'
import Img from 'gatsby-image'

// Render inline SVG with fallback non-svg images
export default function Image({ svgContent, fluid, file, alt }) {
  const imgProps = {}
  if (alt && alt.trim && alt.trim()) {
    imgProps.alt = alt.trim()
  } else {
    imgProps.role = 'presentation'
  }
  if (file.contentType === 'image/svg+xml') {
    if (svgContent) {
      // Inlined SVGs
      return <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    }

    // SVGs that can/should not be inlined
    return <img {...imgProps} src={file.url} />
  }

  // Non SVG images
  return <Img {...imgProps} fluid={fluid} />
}

Image.propTypes = {
  svgContent: propTypes.string,
  fluid: propTypes.object,
  file: propTypes.object.isRequired,
  alt: propTypes.string,
}