import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'

import Layout from 'components/layout'
import Grouper from 'components/grouper'

const Page: NextPageWithLayout = () => {
    return Grouper()
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Page