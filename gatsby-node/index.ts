import path from 'path';
import type {
  CreateSchemaCustomizationArgs,
  GatsbyNode,
  PluginOptions,
} from 'gatsby';

interface Result {
  allContentfulBlogPost: {
    edges: {
      node: {
        id: string;
        slug: string;
        title: string;
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql<Result, any>(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
              title
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data?.allContentfulBlogPost.edges;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts != null && posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].node.id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].node.id;

      post.node.slug &&
        createPage({
          path: post.node.slug,
          component: blogPost,
          context: {
            id: post.node.id,
            previousPostId,
            nextPostId,
          },
        });
    });
  }
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode });

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     });
//   }
// };

export const createSchemaCustomization = (
  { actions }: CreateSchemaCustomizationArgs,
  _options: PluginOptions
) => {
  const { createTypes } = actions;
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
