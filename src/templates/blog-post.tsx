import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogPostTemplate: React.FC<PageProps<GatsbyTypes.BlogPostQuery>> = ({
  data,
  location,
}) => {
  const post = data.contentfulBlogPost?.body?.raw;
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  // const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" description="" />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {post && documentToReactComponents(JSON.parse(post))}
      </article>
      <nav className="blog-post-nav">
        {/* <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul> */}
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPost {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: "first-post" }) {
      body {
        raw
      }
      slug
      createdAt(formatString: "YYYY年MM月DD日", locale: "jp-JP")
      title
      updatedAt(formatString: "YYYY年MM月DD日", locale: "jp-JP")
    }
  }
`;
