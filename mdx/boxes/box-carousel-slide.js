import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'

import Image from '@gatsby-mdx-suite/mdx-image/image'
import { applyColorSet } from '@gatsby-mdx-suite/helpers'

import { Slide } from 'pure-react-carousel'

const StyledSlide = styled(Slide)(applyColorSet)

const SlideContent = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(
  () => css`
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
  `
)

const SlideBackgroundImageWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'scale',
})(
  () => css`
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `
)

const BoxCarouselSlide = ({
  children,
  backgroundImageFit,
  backgroundImageId,
  backgroundImagePosition,
  ...slideProps
}) => {
  return (
    <StyledSlide {...slideProps}>
      {children && <SlideContent>{children}</SlideContent>}
      {backgroundImageId && (
        <SlideBackgroundImageWrapper
          backgroundImageFit={backgroundImageFit}
          backgroundImagePosition={backgroundImagePosition}
        >
          <Image
            id={backgroundImageId}
            fit={backgroundImageFit}
            position={backgroundImagePosition}
          />
        </SlideBackgroundImageWrapper>
      )}
    </StyledSlide>
  )
}

BoxCarouselSlide.defaultProps = {
  backgroundImageId: null,
  backgroundImageFit: 'cover',
  backgroundImagePosition: 'center center',
}

BoxCarouselSlide.propTypes = {
  children: propTypes.node.isRequired,
  // Id of the background image
  backgroundImageId: propTypes.string,
  /**
   * Set how the background image should be fit into the box.
   *
   * Possible options:
   *
   * * fill
   * * contain
   * * cover
   * * none
   * * scale-down
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  backgroundImageFit: propTypes.string,
  /**
   * Set how the background image should be positioned within the box.
   *
   * Takes two values, one for the horizontal and one for the vertical axis.
   *
   * Example values:
   *
   * * center bottom
   * * 2rem center
   * * top right
   *
   * Live demo and more details:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
   */
  backgroundImagePosition: propTypes.string,
  /* Set a color set for this box */
  colorSet: propTypes.string,
  /* Set background color for this element */
  backgroundColor: propTypes.string,
  /* Set primary color for this element and all children */
  primaryColor: propTypes.string,
  /* Set secondary color for this element and all children */
  secondaryColor: propTypes.string,
}

export default BoxCarouselSlide