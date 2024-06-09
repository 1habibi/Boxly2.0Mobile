import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Icon, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { View, Pressable, StyleSheet } from "react-native";

const DatePicker = ({ control, label, rules, name, className, ...rest }) => {
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const showMode = currentMode => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => {
					let date;
					if (value) {
						date = new Date(value);
					} else {
						date = new Date();
					}
					return (
						<>
							{label && <Text style={styles.label}>{label}</Text>}
							<Pressable style={styles.pressable} onPress={showDatepicker}>
								<Icon
									iconStyle={styles.icon}
									name="calendar"
									type="antdesign"
								/>
								<Text
									style={
										date ? styles.placeholderActive : styles.placeholderInactive
									}
								>
									{date.toLocaleDateString()}
								</Text>
								{show && (
									<RNDateTimePicker
										testID="dateTimePicker"
										value={date}
										mode={mode}
										is24Hour
										onChange={(event, selectedDate) => {
											onChange(selectedDate);
											const currentDate = selectedDate;
											setShow(false);
											setDate(currentDate);
										}}
									/>
								)}
							</Pressable>
							{error && <Text style={styles.errorText}>{error.message}</Text>}
						</>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "95%",
		marginBottom: 15
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
		color: "#111",
		fontWeight: "900"
	},
	pressable: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		marginRight: 10,
		padding: 3
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 5
	},
	placeholderActive: {
		color: "#111"
	},
	placeholderInactive: {
		color: "rgba(0, 0, 0, 0.5)"
	}
});

export default DatePicker;
