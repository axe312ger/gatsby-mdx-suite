import React from 'react'

import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'

import ColorModeSwitcher from './color-mode-switcher'

const Main = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxContentWidth}px;
  padding: ${({ theme }) => theme.spacing.s1}px;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s2}px 0;
`

const Layout = ({ children }) => {
  return (
    <Styled.root>
      <Global
        styles={(theme) => css`
          body {
            margin: 0;
            overflow-x: hidden;

            a {
              color: inherit;
              text-decoration: none;

              :visited {
                color: inherit;
              }
            }

            p a,
            nav a,
            a.more {
              position: relative;

              &:after {
                content: '';
                position: absolute;
                left: -4px;
                right: -4px;
                bottom: -4px;
                height: 4px;
                background: ${theme.colors.text};
                transition: 0.15s height ease-in-out;
                opacity: 0.2;
              }

              &:hover {
                &:after {
                  height: calc(100% + 4px);
                }
              }
            }
          }
        `}
      />
      <Main>
        <Header>
          <h1>Gatsby MDX Suite Starter</h1>
          <ColorModeSwitcher />
        </Header>
        {children}
      </Main>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
