import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props): React.JSX.Element => {
  return (
    <>
      <View style={styles.mainContainer}>
        <Button onPress={() => navigation.navigate('Listing')}>
          <Text variant="displaySmall">List</Text>
        </Button>
        <Button onPress={() => navigation.navigate('Search')}>
          <Text variant="displaySmall">Search</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
