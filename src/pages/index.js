import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title='Home' />
    <h1>WP API Test</h1>
    {data.allWordpressPost.edges.map(({ node }) => {
      return (
        <div title='test title' key={node.wordpress_id}>
          <h3>
            <Link to={`${node.slug}`}>{node.title}</Link>
          </h3>
          <time>{node.date}</time>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      )
    })}
  </Layout>
)

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
          date(formatString: "lll")
          wordpress_id
        }
      }
    }
  }
`
