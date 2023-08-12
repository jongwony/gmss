import type { ReactElement } from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app'

import Recommend from 'components/recommend'

const Page: NextPageWithLayout = () => {
  return Recommend()
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>

      {page}
    </Layout>
  )
}
 
export default Page