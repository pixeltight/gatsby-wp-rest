import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"

import Layout from "../components/layout"

const BlogPostTemplate = ({ data }) => {
  const postData = data.wordpressPost
  let featuredImg = undefined

  if (postData.featured_media) {
    featuredImg = postData.featured_media.localFile.childImageSharp.fluid
  }

  return (
    <Layout>
      <SEO title={postData.title} description={postData.excerpt} />
      {featuredImg && <Img fluid={featuredImg} />}
      <h3
        style={{ fontSize: 33, marginTop: 0 }}
        dangerouslySetInnerHTML={{ __html: postData.title }}
      />
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      {postData.acf.author && (
        <ul>
          <li>{postData.acf.author}</li>
          <li>{postData.acf.release_year}</li>
          <li>{postData.acf.book_rating} / 10</li>
        </ul>
      )}
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
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
      }
      acf {
        author
        book_rating
        release_year
      }
    }
  }
`
