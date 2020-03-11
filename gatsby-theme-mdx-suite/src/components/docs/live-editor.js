import React, { useState, useEffect, useContext } from 'react'
import { useDebounce } from '@react-hook/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import mdx from '@mdx-js/mdx'
import loadable from '@loadable/component'
import tw from 'twin.macro'
import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

const MDX = loadable(() => import('@mdx-js/runtime'))

const PreviewFailedWrapper = tw.div`flex justify-center content-center w-full h-full`

class MDXErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  static propTypes = {
    children: propTypes.node.isRequired,
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <PreviewFailedWrapper>
          <h1>Something went wrong rendering the preview.</h1>
        </PreviewFailedWrapper>
      )
    }

    return this.props.children
  }
}

const AceEditor = loadable(async () => {
  const ace = await import('react-ace')
  await import('ace-builds/src-noconflict/mode-markdown')
  await import('ace-builds/src-noconflict/theme-dracula')
  return ace
})

const LiveEditorWrapper = styled.section(
  ({ layout }) => css`
    ${tw`grid`}

    ${layout === 'horizontal'
      ? css`
          grid-template-columns: 1fr;
          grid-template-rows: min-content 30vh min-content;
          grid-template-areas:
            'preview'
            'editor'
            'error';
          max-height: calc(100vh - 60px);
        `
      : css`
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr min-content;
          grid-template-areas:
            'preview editor'
            'error editor';
          height: calc(100vh - 60px);
        `}
  `
)
const LiveEditorPreview = styled.div`
  ${tw`relative bg-gray-100 overflow-scroll shadow-inner`}
  grid-area: preview;
`

const LiveEditorError = styled.div`
  ${tw`p-4 m-4 border-4 border-dashed border-red-400 bg-red-700 text-sm text-white`}
  grid-area: error;
`
const LiveEditorEditor = styled.div`
  grid-area: editor;
  min-height: 4rem;

  .ace_heading {
    ${tw`font-bold text-blue-600`}
  }

  .ace_xml,
  .ace_html {
    &.ace_punctuation,
    &.ace_tag-name {
      ${tw`font-bold text-green-600`}
    }

    &.ace_attribute-name {
      ${tw`font-bold text-red-600`}
    }

    &.ace_attribute-value {
      ${tw`font-bold text-orange-600`}
    }
  }

  .ace_emphasis {
    ${tw`italic`}
  }
  .ace_strong {
    ${tw`font-bold`}
  }
`

function LiveEditor({ editorId, initialValue, layout }) {
  const [editorValue, setEditorValue] = useState(initialValue || '')
  const [rawValue, setRawValue] = useDebounce('', 1000)
  const [error, setError] = useState()
  const {
    data: { images, videos, youtubeVideos, instagramPosts },
  } = useContext(MdxSuiteContext)

  const pictures = images.filter(
    ({ file: { contentType } }) => contentType.indexOf('svg') === -1
  )
  const graphics = images.filter(
    ({ file: { contentType } }) => contentType.indexOf('svg') !== -1
  )

  useEffect(() => {
    async function parseMdx() {
      try {
        // Replace tokens with asset ids
        const processedValue = editorValue
          .replace(
            /"randomImageId"/gi,
            () =>
              `"${images[Math.floor(Math.random() * images.length)].assetId}"`
          )
          .replace(
            /"randomPictureId"/gi,
            () =>
              `"${
                pictures[Math.floor(Math.random() * pictures.length)].assetId
              }"`
          )
          .replace(
            /"randomGraphicId"/gi,
            () =>
              `"${
                graphics[Math.floor(Math.random() * graphics.length)].assetId
              }"`
          )
          .replace(
            /"randomVideoId"/gi,
            () =>
              `"${videos[Math.floor(Math.random() * videos.length)].assetId}"`
          )
          .replace(
            /"randomInstagramPostId"/gi,
            () =>
              `"${
                instagramPosts[
                  Math.floor(Math.random() * instagramPosts.length)
                ].id
              }"`
          )
          .replace(
            /"randomYoutubeVideoId"/gi,
            () =>
              `"${
                youtubeVideos[Math.floor(Math.random() * youtubeVideos.length)]
                  .videoId
              }"`
          )

        // Validate mdx by parsing it
        await mdx(processedValue)

        // Set valid raw value
        setError(null)
        setRawValue(processedValue)
      } catch (error) {
        console.error(error)
        setError(error)
      }
    }

    parseMdx()
  }, [editorValue])

  return (
    <LiveEditorWrapper layout={layout}>
      {error && (
        <LiveEditorError>
          <p>
            <strong>Oops, something went wrong:</strong>
          </p>
          <pre>
            {error.message
              .replace(/[> ]+([0-9]+) \|/g, (a, b) =>
                a.replace(b, parseInt(b) - 2)
              )
              .replace(/\(([0-9]+):[0-9]+\)/, (a, b) =>
                a.replace(b, parseInt(b) - 2)
              )}
          </pre>
        </LiveEditorError>
      )}
      <LiveEditorPreview>
        <MDXErrorBoundary>
          <MDX>{rawValue}</MDX>
        </MDXErrorBoundary>
      </LiveEditorPreview>
      <LiveEditorEditor>
        <AceEditor
          mode="markdown"
          theme="dracula"
          onChange={setEditorValue}
          name={`docs-ace-editor-${editorId}`}
          editorProps={{
            $blockScrolling: true,
            // Do we get these working?
            // enableBasicAutocompletion: true,
            // enableLiveAutocompletion: true,
          }}
          value={editorValue}
          width="100%"
          height="100%"
        />
      </LiveEditorEditor>
    </LiveEditorWrapper>
  )
}

LiveEditor.defaultProps = {
  editorId: 'default-editor',
  layout: 'horizontal',
}

LiveEditor.propTypes = {
  editorId: propTypes.string,
  initialValue: propTypes.string,
  layout: propTypes.string,
}

export default LiveEditor
