/**
 * This file defines fragments for all available media collections. These are
 * automatically selected by the components, except the user overrides them
 * for a specific component instance.
 *
 * This file is especially helpful if you change the default breakpoints or want
 * to use different placeholders.
 *
 * If you need more or other collection types as the defaults, remember to also
 * pass your new list to the core theme config.
 */

import { graphql } from 'gatsby'

// This helper fragment includes all possible collection types
export const MdxSuiteMediaCollections = graphql`
  fragment MdxSuiteMediaCollections on Mdx {
    screen: media(collectionType: "screen") {
      ...MdxSuiteMediaCollectionScreen
    }
    full: media(collectionType: "full") {
      ...MdxSuiteMediaCollectionFull
    }
    half: media(collectionType: "half") {
      ...MdxSuiteMediaCollectionHalf
    }
    third: media(collectionType: "third") {
      ...MdxSuiteMediaCollectionThird
    }
    quarter: media(collectionType: "quarter") {
      ...MdxSuiteMediaCollectionQuarter
    }
    sixth: media(collectionType: "sixth") {
      ...MdxSuiteMediaCollectionSixth
    }
    eight: media(collectionType: "eight") {
      ...MdxSuiteMediaCollectionEigth
    }
  }
`

// Media collection for fullscreen media
export const MdxSuiteMediaCollectionScreen = graphql`
  fragment MdxSuiteMediaCollectionScreen on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(
      width: 2048
      placeholder: DOMINANT_COLOR
      layout: FULL_WIDTH
    )
  }
`

// Media collection for media that spans the full content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionFull = graphql`
  fragment MdxSuiteMediaCollectionFull on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 1200, placeholder: DOMINANT_COLOR)
  }
`

// Media collection for media that spans half of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionHalf = graphql`
  fragment MdxSuiteMediaCollectionHalf on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 600, placeholder: DOMINANT_COLOR)
  }
`

// Media collection for media that spans a third of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionThird = graphql`
  fragment MdxSuiteMediaCollectionThird on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR)
  }
`

// Media collection for media that spans a quarter of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionQuarter = graphql`
  fragment MdxSuiteMediaCollectionQuarter on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 300, placeholder: DOMINANT_COLOR)
  }
`

// Media collection for media that spans a sixth of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionSixth = graphql`
  fragment MdxSuiteMediaCollectionSixth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 200, placeholder: DOMINANT_COLOR)
  }
`

// Media collection for media that spans a eigth of the content column when the largest breakpoint is reached
export const MdxSuiteMediaCollectionEigth = graphql`
  fragment MdxSuiteMediaCollectionEigth on ContentfulAsset {
    ...MdxSuiteContentfulAsset
    gatsbyImageData(width: 150, placeholder: DOMINANT_COLOR)
  }
`
