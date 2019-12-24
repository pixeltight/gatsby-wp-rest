import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"

import Layout from "../components/layout"

const BlogPostTemplate = ({ data }, index) => {
  const postData = data.wordpressPost
  let featuredImg = undefined

  if (postData.featured_media) {
    featuredImg = postData.featured_media.localFile.childImageSharp.fixed
  }

  return (
    <Layout>
      <SEO title={postData.title} description={postData.excerpt} />
      {featuredImg && <Img fixed={featuredImg} />}
      <h3
        style={{ fontSize: 33, marginTop: 0 }}
        dangerouslySetInnerHTML={{ __html: postData.title }}
      />
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </Layout>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query($id: Int) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MM DD, YYYY")
      author {
        name
      }
      featured_media {
        localFile {
          childImageSharp {
            fixed(width: 1000) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
