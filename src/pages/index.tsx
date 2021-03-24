import React from 'react';
import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const title = data.site?.siteMetadata?.title ?? 'Title';
  const edges = data.allContentfulBlogPost.edges;
  return (
    <Layout location={location} title={title}>
      <SEO title="home" />
      {edges.map((edge, i) => (
        <div key={i}>
          {edge.node.body?.raw &&
            JSON.stringify(JSON.parse(edge.node.body.raw))}
        </div>
      ))}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
        description
        social {
          twitter
        }
      }
    }
    allContentfulBlogPost {
      edges {
        node {
          body {
            raw
          }
          id
          createdAt(formatString: "YYYY年MM月DD日", locale: "ja-JP")
          slug
          title
          updatedAt(formatString: "YYYY年MM月DD日", locale: "ja-JP")
        }
      }
    }
  }
`;
