import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type TimePickerProps = {
    selectedTime: Date;
    onTimeChange: (time: Date) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({ selectedTime, onTimeChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Time:</Text>
            <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, date) => onTimeChange(date || selectedTime)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default TimePicker;
