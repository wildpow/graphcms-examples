import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Markdown from 'react-markdown'

// const Post = ({ data: { loading, error, post } }) => {
//   if (error) return <h1>Error fetching the post!</h1>
//   if (!loading) {
//     return (
//       <article>
//         <h1>{post.title}</h1>
//         <div className='Post-placeholder'>
//           <img
//             alt={post.title}
//             src={`https://media.graphcms.com/resize=w:650,h:366,fit:crop/${post.coverImage.handle}`}
//           />
//         </div>
//         <Markdown
//           source={post.content}
//           escapeHtml={false}
//         />
//       </article>
//     )
//   }
//   return <h2>Loading post...</h2>
// }

const singlePost = gql`
  query singlePost($slug: String!) {
    post: Post(slug: $slug) {
      id
      slug
      title
      coverImage {
        handle
      }
      content
      dateAndTime
    }
  }
`
const Post = ( slug ) => (
  
  <Query query={singlePost} variables={{slug: slug.match.params.slug }}>
    {({ loading, error, post }) => { 
      if (loading || !post) return <h2>Loading post...{console.log(post)}</h2>
      if (error) return <h1>Error fetching the post!</h1>

      return (
        <article>
        <h1>{post.title}</h1>
        <div className='Post-placeholder'>
          <img
            alt={post.title}
            src={`https://media.graphcms.com/resize=w:650,h:366,fit:crop/${post.coverImage.handle}`}
          />
        </div>
        <Markdown
          source={post.content}
          escapeHtml={false}
        />
      </article>
      )
    }}
  </Query>
)
export default Post;
// export default graphql(singlePost, {
//   options: ({ match }) => ({
//     variables: {
//       slug: match.params.slug
//     }
//   })
// })(Post)
