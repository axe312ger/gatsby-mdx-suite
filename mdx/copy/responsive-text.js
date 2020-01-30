import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const ResponsiveTextWrapper = styled.div(
  ({
    theme: {
      sizes: { maxContentWidth },
      fonts: { heading },
      colors,
    },
    fontSizeMin,
    fontSizeMax,
    lineHeightMin,
    lineHeightMax,
  }) => css`
    font-size: ${fontSizeMin};
    line-height: ${lineHeightMin};
    font-family: ${heading};
    font-weight: bold;
    color: ${colors.ash};

    @media screen and (min-width: 300px) {
      font-size: calc(
        ${fontSizeMin} + (${parseInt(fontSizeMax) - parseInt(fontSizeMin)}) *
          ((100vw - 300px) / ${maxContentWidth - 300})
      );
      line-height: calc(
        ${lineHeightMin} +
          (${parseFloat(lineHeightMax) - parseFloat(lineHeightMin)}) *
          ((100vw - 300px) / ${maxContentWidth - 300})
      );
    }
    @media screen and (min-width: ${maxContentWidth}px) {
      font-size: ${fontSizeMax};
      line-height: ${lineHeightMax};
    }
  `
)

const ResponsiveText = ({
  children,
  fontSizeMin,
  fontSizeMax,
  lineHeightMin,
  lineHeightMax,
}) => {
  return (
    <ResponsiveTextWrapper
      fontSizeMin={fontSizeMin}
      fontSizeMax={fontSizeMax}
      lineHeightMin={lineHeightMin}
      lineHeightMax={lineHeightMax}
    >
      {children}
    </ResponsiveTextWrapper>
  )
}

ResponsiveText.propTypes = {
  children: propTypes.node,
  fontSizeMin: propTypes.string,
  fontSizeMax: propTypes.string,
  lineHeightMin: propTypes.string,
  lineHeightMax: propTypes.string,
}

ResponsiveText.defaultProps = {
  fontSizeMin: '26px',
  fontSizeMax: '82px',
  lineHeightMin: '1.4em',
  lineHeightMax: '1.1em',
}

export default ResponsiveText
