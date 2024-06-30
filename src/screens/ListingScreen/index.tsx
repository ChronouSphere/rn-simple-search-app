import * as React from 'react';
import uuid from 'react-native-uuid';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import {ActivityIndicator, Card, Text, FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {organizationListAction} from '../../redux/actions/organizationListAction';
import listItemSelector from '../../redux/selectors';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LIST_LOAD_LIMIT} from '../../constants';

const ListingScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const organizationList = useSelector(listItemSelector);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemLimit = LIST_LOAD_LIMIT; // Limit of items to render

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = (): void => {
    if (!loading && organizationList.length < itemLimit) {
      setLoading(true);
      dispatch(organizationListAction.startRequestFetchApi({pageNumber}));
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [organizationList]);

  const keyExtractor = (item: Module.OrganizationItem): string =>
    item.ein.toString() + uuid.v4();

  const handleLoadMore = () => {
    if (!loading) {
      loadMore();
    }
  };

  const renderListItem = ({
    item,
  }: {
    item: Module.OrganizationItem;
  }): JSX.Element => {
    return (
      <Card key={item.ein} style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {item.name}
          </Text>
          <View style={styles.row}>
            <Text variant="bodyLarge" style={styles.primaryValue}>
              {item.city ?? 'Empty'}, {item.state ?? 'Empty'}
            </Text>
            <Text variant="bodyLarge" style={styles.primaryValue}>
              {item.score ?? '0.00'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.secondaryValue}>
              EIN: {item.ein ?? 'Empty'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.secondaryValue}>
              NTEE Code: {item.ntee_code ?? 'Empty'}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={organizationList.slice(0, itemLimit)}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={6}
        updateCellsBatchingPeriod={1000}
        maxToRenderPerBatch={25}
        ListFooterComponent={() =>
          loading && <ActivityIndicator style={{backgroundColor: '#f5f5f5'}} />
        }
      />
      {organizationList && organizationList.length > 0 && (
        <FAB
          style={styles.fab}
          size="medium"
          icon="arrow-left"
          onPress={() => navigation.navigate('Home')}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  pageTitle: {
    textAlign: 'center',
  },
  card: {
    marginVertical: 10,
    borderRadius: 24,
    backgroundColor: '#F3E5F5',
    borderWidth: 0,
    borderColor: '#ddd', // Border to give a subtle outline
    elevation: 0, // Remove elevation to remove shadow on Android
    shadowColor: 'transparent', // Remove shadow
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 10,
  },
  primaryValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  secondaryValue: {
    color: '#777',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    color: '#777',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 24,
    right: 0,
    bottom: 0,
  },
});

export default ListingScreen;
