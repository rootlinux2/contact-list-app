/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ToastContainer } from 'react-toastify';
import styled from "styled-components"
import 'react-toastify/dist/ReactToastify.css';
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const LayoutWrapper = styled.section`
  main {
    padding: 0 20%;   
  }
`
  return (
    <LayoutWrapper>
        <ToastContainer />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with 
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
