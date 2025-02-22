import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TaskItemProps = {
    task: string;
    time: Date;
    onDelete: () => void;
    onEdit: (newTask: string, newTime: Date) => void;
    onEditTime: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, time, onDelete, onEdit, onEditTime }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [editedTime, setEditedTime] = useState(time);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        setEditedTask(task);
        setEditedTime(time);
    }, [task, time]);

    const handleEdit = () => {
        if (isEditing && editedTask.trim()) {
            onEdit(editedTask, editedTime);
        }
        setIsEditing(!isEditing);
    };

    const handleTimeChange = (date: Date) => {
        setEditedTime(date);
        setShowTimePicker(false);
    };

    return (
        <View style={styles.taskContainer}>
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={editedTask}
                        onChangeText={setEditedTask}
                        onSubmitEditing={handleEdit}
                        returnKeyType="done"
                        multiline
                        numberOfLines={3}
                    />
                    <TouchableOpacity onPress={onEditTime} style={styles.timePickerButton}>
                        <Icon name="calendar-today" size={24} color="#eaa4ef" />
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={editedTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    handleTimeChange(date);
                                }
                            }}
                        />
                    )}
                </>
            ) : (
                <Text style={styles.taskText}>
                    {task} on {time.toLocaleDateString()} at {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleEdit}>
                    <Icon name={isEditing ? 'save' : 'edit'} size={24} color="#eaa4ef" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Icon name="delete" size={24} color="#eaa4ef" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align items to the top of the container
    },
    taskText: {
        fontSize: 18,
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        maxWidth: '70%', // Maximum width of the input
        height: 60, // Fixed height of the input
    },
    timePickerButton: {
        marginLeft: 10,
    },
});

export default TaskItem;
