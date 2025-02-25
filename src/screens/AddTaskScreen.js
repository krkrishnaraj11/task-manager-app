import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Checkbox, Text } from "react-native-paper";
import {createTask, updateTask, deleteTask} from "../redux/slices/task/taskApi";
import {useDispatch, useSelector} from "react-redux";
import {CommonActions} from "@react-navigation/native";

const AddTaskScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector( state => state?.tasks);
  let task = route?.params?.task;
  const [taskName, setTaskName] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [completed, setCompleted] = useState(task ? task.completed : false);

  const handleAddTask = async () => {
    if (!taskName.trim()) {
      alert("Task name is required");
      return;
    }

    const newTask = {
      title: taskName,
      description,
      completed,
    };

    const resultAction = await dispatch(createTask(newTask));
    if (createTask.fulfilled.match(resultAction)) {
        navigation.goBack();
    }
  };

  const handleUpdateTask = async () => {
    if (!taskName.trim()) {
      alert("Task name is required");
      return;
    }

    const newTask = {
      title: taskName,
      description,
      completed,
    };

    const resultAction = await dispatch(updateTask({ id: task._id, updatedData: newTask }));
    if (updateTask.fulfilled.match(resultAction)) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Add New Task</Text>
      <TextInput
        label="Task Name"
        value={taskName}
        onChangeText={setTaskName}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={completed ? "checked" : "unchecked"}
          onPress={() => setCompleted(!completed)}
        />
        <Text>Completed</Text>
      </View>
      {!error && <Text style={styles.errorText}>{error}</Text>}
      <Button mode="contained" loading={loading} onPress={task ? handleUpdateTask : handleAddTask} style={styles.button}>
        {task ? "Update Task" : "Add Task"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AddTaskScreen;