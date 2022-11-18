import { useEffect, useMemo } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { addUserSchema } from '../schemas'
import { theme } from '../theme'
/* hooks */
import { useUpdate } from '../hooks/useUpdate'
import { useAddUser } from '../hooks/useAddUser'

/* components */
import InputField from './common/InputField'
import Button from './common/Button'

export default function AddEditForm ({ currentUser, isEdit = false }) {
  const { goBack } = useNavigation()
  const { updateUser } = useUpdate()
  const { addUser } = useAddUser()
  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || 0,
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      cellphone: currentUser?.cellphone || '',
      cedula: currentUser?.cedula || '',
      address: currentUser?.address || ''
    }),
    [currentUser]
  )
  const methods = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues
  })

  const {
    handleSubmit,
    reset: resetForm,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (isEdit && currentUser) resetForm(defaultValues)
  }, [isEdit, currentUser])

  const onSubmit = async ({
    firstName,
    lastName,
    cedula,
    address,
    cellphone
  }) => {
    try {
      /* method update user */
      isEdit &&
        (await updateUser({
          updateClientId: currentUser?.id,
          firstName,
          lastName,
          cellphone,
          cedula,
          streetAddress: address
        }))
      /* method add user */
      if (!isEdit) {
        await addUser({
          firstName,
          lastName,
          cedula,
          cellphone: `+57${cellphone}`,
          cityId: 2,
          stateId: 1,
          streetAddress: address
        })
        resetForm()
      }
      goBack()
    } catch (e) {
      console.log(e)
    }
  }

  const titleBtn = !isEdit ? 'Save' : 'Update'

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 15
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            <InputField topError label='First Name' name='firstName' />
          </View>
          <View style={styles.inner}>
            <InputField topError label='Last Name' name='lastName' />
          </View>
          <View style={styles.inner}>
            <InputField topError label='Document' name='cedula' />
          </View>
          <View style={styles.inner}>
            <InputField topError label='Address' name='address' />
          </View>
          <View style={[styles.inner, styles.space]}>
            <InputField topError label='Cellphone' name='cellphone' />
          </View>
          <Button
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            title={isSubmitting ? 'Loading' : titleBtn}
          />
        </ScrollView>
      </FormProvider>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    backgroundColor: theme.colors.whitePure,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
  space: {
    marginBottom: 20
  }
})
