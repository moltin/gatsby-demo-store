const path = require(`path`)

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

//   return graphql(`
//     {
//       allMoltinProduct {
//         edges {
//           node {
//             id
//             mainImage {
//               childImageSharp {
//                 fixed(width: 400) {
//                   ...GatsbyImageSharpFixed
//                 }
//               }
//             }
//             name
//             slug
//             meta {
//               display_price {
//                 without_tax {
//                   formatted
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       throw result.errors
//     }

//     result.data.allMoltinProduct.edges.forEach(edge => {
//       createPage({
//         // Path for this page — required
//         path: `${edge.node.fields.slug}`,
//         // component: blogPostTemplate,
//         context: {
//           // Add optional context data to be inserted
//           // as props into the page component..
//           //
//           // The context data can also be used as
//           // arguments to the page GraphQL query.
//           //
//           // The page "path" is always available as a GraphQL
//           // argument.
//         },
//       })
//     })
//   })
// }
