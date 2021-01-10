import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

const Image = ({ src, debug, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
          }
        }
      }
    }
  `)
  const match = useMemo(
    () => data.allFile.edges.find(({ node }) => src === node.relativePath),
    [data, src]
  )
  if (!match)
    if (debug) return <span>Image not found: {src}</span>
    else return null

  const { node: { publicURL } = {} } = match
  return <img src={publicURL} {...props} />
}

export default Image