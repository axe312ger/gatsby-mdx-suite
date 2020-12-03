import React, { useState, useMemo, useCallback } from 'react'
import propTypes from 'prop-types'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useBreakpoint } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'
import {
  killScrollTrigger,
  useKillScrollTrigger,
} from '@gatsby-mdx-suite/helpers/styling/gsap'

gsap.registerPlugin(ScrollTrigger)

const Parallax = ({ children, till, from, speed, markers }) => {
  const activeBreakpoints = useBreakpoint()
  const [scrollTriggerInstance, setScrollTriggerInstance] = useState(null)
  useKillScrollTrigger(scrollTriggerInstance)

  // Activate effect based on props
  const effectActive = useMemo(() => {
    if (
      (!till && !from) ||
      (till && !activeBreakpoints[till]) ||
      (from && activeBreakpoints[from])
    ) {
      return true
    }

    killScrollTrigger(scrollTriggerInstance)

    return false
  }, [till, from, activeBreakpoints, scrollTriggerInstance])

  // Calculate css transform values based on effect state
  const [transformStart, transformEnd] = useMemo(
    () => [
      effectActive ? `translateY(${speed})` : '',
      effectActive ? `translateY(-${speed})` : '',
    ],
    [speed, effectActive]
  )

  // Initialize ScrollTrigger on child mount
  const initScrollTrigger = useCallback(
    (node) => {
      if (!node || !effectActive) {
        return
      }
      const positionParent = node.closest('section,#___gatsby')

      const gsapInstance = gsap
        .timeline({
          scrollTrigger: {
            trigger: positionParent,
            scrub: true,
            markers,
            start: `top center`,
            end: `bottom center`,
            invalidateOnRefresh: true,
          },
        })
        .to(node, {
          transform: transformEnd,
        })

      setScrollTriggerInstance(gsapInstance)
    },
    [effectActive, transformEnd, markers]
  )

  // Wrap children if they are no regular components to apply styling
  const styledChild = useMemo(() => {
    const count = React.Children.count(children)
    let wrappedChildren = children

    if (
      typeof children === 'string' ||
      !count ||
      count > 1 ||
      typeof children?.type?.render === 'function'
    ) {
      wrappedChildren = <div>{children}</div>
    }

    return React.cloneElement(wrappedChildren, {
      style: { transform: transformStart },
      ref: initScrollTrigger,
    })
  }, [children, transformStart, initScrollTrigger])

  return <>{styledChild}</>
}

Parallax.defaultProps = {
  speed: '50%',
  from: 'sm',
  markers: false,
}

Parallax.propTypes = {
  children: propTypes.node.isRequired,
  /** Speed of the component while traveling parallax on the Y-axis. Usually a value between 25% and 100% */
  speed: propTypes.string,
  /** Add the debug attribute to render markers to debug the parallax animation */
  markers: propTypes.bool,
  /** Enable parallax scrolling of the component till given screen size is reached */
  till: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  /** Enable parallax scrolling of the component as soon given screen size is reached */
  from: propTypes.oneOf(['sm', 'md', 'lg', 'xl']),
}

export default Parallax
