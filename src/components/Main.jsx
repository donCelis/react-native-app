import { SafeAreaView, StyleSheet } from 'react-native'
import { Route, Routes } from 'react-router-native'

/* Components */
import UsersList from '../pages/UsersList'
import LogIn from '../pages/LogIn'

export default function Main () {
  return (
    <SafeAreaView style={styles.container}>
      <Routes>
        <Route path='/' element={<UsersList />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
