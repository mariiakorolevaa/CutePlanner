import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import TaskItem from './components/TaskItem';

type Task = {
    key: string;
    time: Date;
};

const App = () => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [, setEditingTaskKey] = useState<string | null>(null);

    const addTask = () => {
        if (task.trim()) {
            setTaskList([...taskList, { key: task, time: selectedTime }]);
            resetTaskInput();
        }
    };

    const resetTaskInput = () => {
        setTask('');
        setSelectedTime(new Date());
        setEditingTaskKey(null);
    };

    const editTask = (key: string, newTask: string, newTime: Date) => {
        setTaskList(taskList.map(item => (item.key === key ? { ...item, key: newTask, time: newTime } : item)));
    };

    const deleteTask = (key: string) => {
        setTaskList(taskList.filter((item) => item.key !== key)); // Удаляем задачу
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setSelectedTime(date);
            setShowDatePicker(false);
            setShowTimePicker(true);
        }
    };

    const handleTimeChange = (event: any, date?: Date) => {
        if (date) {
            setSelectedTime(date);
        }
        setShowTimePicker(false);
    };

    const handleEditTime = (taskKey: string) => {
        setEditingTaskKey(taskKey);
        setShowDatePicker(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Planner</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Create a new task"
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Icon name="calendar-today" size={30} color="#eaa4ef" />
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={addTask}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

            <FlatList
                data={taskList}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item.key}
                        time={item.time}
                        onDelete={() => deleteTask(item.key)}
                        onEdit={(newTask: string, newTime: Date) => editTask(item.key, newTask, newTime)}
                        onEditTime={() => handleEditTime(item.key)}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#eaa4ef',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default App;
