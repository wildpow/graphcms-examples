import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const About = () => (
  <Query query={allAuthors}>
    {({ loading, error, data: { allAuthors } }) => {
      if (loading || !allAuthors) return <h2>Loading author...</h2>
      if (error) return <h1>Error fetching authors!</h1>
      
      return (
        <div>
          {allAuthors.map(author => (
            <div className='About-author' key={author.id}>
              <div className='About-infoHeader'>
                <img
                  className='About-img'
                  alt={author.name}
                  src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${author.avatar.handle}`}
                />
                <h1>Hello! My name is {author.name}</h1>
              </div>
              <p>{author.bibliography}</p>
            </div>
          ))}
      </div>
      )
    }}
  </Query>
)

const allAuthors = gql`
  query allAuthors {
    allAuthors {
      id
      name
      bibliography
      avatar {
        handle
      }
    }
  }
`
export default About

