import Document, { Head, Main, NextScript } from 'next/document'
import { TypographyStyle, GoogleFont } from 'react-typography'
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components'

import { typography } from '../theme'
import { ReactElement } from 'react'

interface DocumentProps {
  styleTags: ReactElement
}

export default class MyDocument extends Document<DocumentProps> {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
