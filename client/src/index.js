import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { IntlProvider } from "react-intl"
import messages from "./localisation/messages"

const apolloClient = new ApolloClient({
  uri: `/graphql`
})

ReactDOM.render(
  <IntlProvider locale={"en"} messages={messages["en"]}>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </IntlProvider>,
  document.getElementById("root")
)
