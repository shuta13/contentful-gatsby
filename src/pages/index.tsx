import React from 'react';
import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = () => {
  return <div></div>;
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    allContentfulBlogPost {
      edges {
        node {
          title
          slug
          updatedAt(locale: "ja-JP", formatString: "YYYY年MM月DD日")
          body {
            raw
          }
        }
      }
    }
  }
`;
