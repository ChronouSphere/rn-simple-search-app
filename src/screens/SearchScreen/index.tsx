import * as React from 'react';
import uuid from 'react-native-uuid';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import {ActivityIndicator, Card, Text, Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {organizationListAction} from '../../redux/actions/organizationListAction';
import {useState, useEffect, useCallback} from 'react';
import {LIST_LOAD_LIMIT} from '../../constants';
import {searchOrganizationItemSelector} from '../../redux/selectors/listItemSelector';
import debounce from 'lodash/debounce';
import {useFocusEffect} from '@react-navigation/native';

const SearchScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const searchOgranizationList = useSelector(searchOrganizationItemSelector);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const itemLimit = LIST_LOAD_LIMIT; // Limit of items to render

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim() !== '') {
        setLoading(true);
        dispatch(
          organizationListAction.searchStartRequestFetchApi({
            query: searchQuery,
          }),
        );
      }
    }, 300), // 300ms debounce delay
    [],
  );

  useEffect(() => {
    if (query.trim() !== '') {
      debouncedSearch(query);
    }
  }, [query]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [searchOgranizationList]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Reset the query and dispatch reset action when the screen is unfocused
        setQuery('');
      };
    }, [dispatch]),
  );

  const keyExtractor = (item: Module.OrganizationItem): string =>
    item.ein.toString() + uuid.v4();

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
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>
      {loading && <ActivityIndicator style={{backgroundColor: '#f5f5f5'}} />}
      <FlatList
        data={searchOgranizationList.slice(0, itemLimit)}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 0,
    borderRadius: 34,
  },
  flatListContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
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
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 24,
    right: 0,
    bottom: 0,
  },
});

export default SearchScreen;
