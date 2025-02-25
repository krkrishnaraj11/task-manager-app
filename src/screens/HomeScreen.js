import React, {useState, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { View, FlatList, RefreshControl } from "react-native";
import { List, Checkbox, Card, Text, Button, FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { fetchTasks } from "../redux/slices/task/taskApi";
import {logoutUser} from "../redux/slices/auth/authApi";

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);

  const [refreshing, setRefreshing] = useState(false);

  const handleTasks = () => {
      dispatch(fetchTasks());
  };

  useEffect(() => {
    handleTasks();
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleTasks();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('TaskDetails', { task: item })} style={{ margin: 8 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={item.completed ? "checked" : "unchecked"}
          />
          <View style={{ marginLeft: 10 }}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text variant="bodyMedium" style={{ color: "gray" }}>
              {item.description}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text variant="titleLarge" style={{ marginBottom: 10 }}>Hi {user?.name}</Text>
      <Text variant="titleMedium" style={{ marginBottom: 10 }}>Your Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.fabContainer}>
        <FAB icon="plus" label="Add Task" onPress={() => navigation.navigate('AddTask')} style={styles.fab} />
        <FAB icon="logout" label="Logout" onPress={() => dispatch(logoutUser())} style={styles.fab} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  fab: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
