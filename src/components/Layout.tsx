import { Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import { Header } from './Header'

function Layout (): JSX.Element {
  return (
    <Container maxW={['full', 'container.lg']} px={4}>
      <Header />
      <Outlet />
    </Container>
  )
}

export default Layout
