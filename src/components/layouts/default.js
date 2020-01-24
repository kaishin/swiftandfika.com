import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "../../css/normalize.css"
import "../../css/styles.css"

import 'typeface-exo'

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <div>
        <main>{children}</main>
        <footer className="site-footer">
          © {new Date().getFullYear()}, Swift &amp; Fika. <Link to="privacy">Privacy Policy</Link>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
