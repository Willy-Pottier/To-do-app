import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Ajouter une tâche
  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask(""); // Réinitialiser l'input
    }
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Marquer une tâche comme terminée
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Ma To-Do List</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ajouter une tâche..." 
        value={task} 
        onChangeText={setTask} 
      />
      <Button title="Ajouter" onPress={addTask} />

      <FlatList 
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={[styles.taskText, item.completed && styles.completed]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="❌" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa", paddingTop: 75 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  task: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#fff", marginVertical: 5, borderRadius: 5 },
  taskText: { fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "gray" }
});