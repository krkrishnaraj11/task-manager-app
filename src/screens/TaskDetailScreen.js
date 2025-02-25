import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Button, Checkbox } from "react-native-paper";
import {useDispatch} from "react-redux";
import { deleteTask, updateTask } from "../redux/slices/task/taskApi";

const TaskDetailScreen = ({ route, navigation }) => {
  const { task, onUpdateTask, onDeleteTask } = route.params;
  const dispatch = useDispatch();

  const toggleCompletion = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const resultAction = await dispatch(updateTask({ id: task._id, updatedData: updatedTask }));
      if (updateTask.fulfilled.match(resultAction)) {
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deleteTask(task._id));
      if (deleteTask.fulfilled.match(resultAction)) {
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Task Details" />
        <Card.Content>
          <Text variant="titleLarge">{task.title}</Text>
          <Text variant="bodyMedium" style={styles.description}>{task.description}</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={task.completed ? "checked" : "unchecked"}
              onPress={toggleCompletion}
            />
            <Text>{task.completed ? "Completed" : "Incomplete"}</Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('AddTask', { task: route.params.task })} mode="contained">
            Edit Task
          </Button>
          <Button onPress={handleDelete} mode="outlined" textColor="red">
            Delete Task
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
//    justifyContent: "center",
  },
  description: {
    marginVertical: 10,
    color: "gray",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default TaskDetailScreen;
