import React, {Profiler, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useActions, useAppState} from '../overmind';

/* components */
import LoadingModal from '../components/common/Modal';
import UserCard from '../components/common/UserCard';

function UserList() {
  const {
    users: {userList},
    loading,
  } = useAppState();

  const {
    users: {getUsers},
  } = useActions();

  useEffect(() => {
    if (userList?.length === 0) {
      getUsers();
    }
  }, []);

  return (
    <Profiler
      id="Padre"
      onRender={(id, phase, actualDuration) =>
        console.log(actualDuration, '\t', id, phase)
      }>
      <View style={styles.container}>
        {loading && <LoadingModal />}
        {!loading && (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={userList ?? []}
            renderItem={({item: user}) => <UserCard {...user} />}
            estimatedItemSize={180}
            extraData={[userList]}
          />
        )}
      </View>
    </Profiler>
  );
}

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
