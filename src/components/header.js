import { StaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query {
        wordpressSiteMetadata {
          name
        }
        wordpressWpApiMenusMenusItems(name: { eq: "TEST MENU" }) {
          items {
            title
            object_slug
          }
        }
      }
    `}
    render={data => (
      <header style={{ background: `rebeccapurple`, marginBottom: `1.45rem` }}>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
            justifyContent: `space-between`,
            alignItems: `center`,
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link to='/' style={{ color: `white`, textDecoration: `none` }}>
              {data.wordpressSiteMetadata.name}
            </Link>
          </h1>
          <ul style={{ listStyle: `none`, display: `flex`, margin: 0 }}>
            {data.wordpressWpApiMenusMenusItems.items.map(item => (
              <li
                key={item.object_slug}
                style={{
                  margin: `0 10px`,
                }}
              >
                <Link
                  to={`/${item.object_slug}`}
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                    fontFamily: `sans-serif`,
                  }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
