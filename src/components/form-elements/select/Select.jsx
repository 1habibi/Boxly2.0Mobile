import { Picker } from "@react-native-picker/picker";
import { Icon, Text, useTheme } from "@rneui/themed";
import { Controller } from "react-hook-form";
import { View, Pressable, StyleSheet } from "react-native";

const Select = ({ control, label, rules, name, icon, items, ...rest }) => {
	const { theme } = useTheme();

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => {
				return (
					<View style={styles.container}>
						{label && <Text style={styles.label}>{label}</Text>}
						<Pressable style={styles.pressable}>
							<Icon iconStyle={styles.icon} name={icon.name} type={icon.type} />
							<Picker
								selectedValue={value}
								onValueChange={(itemValue, itemIndex) => {
									onChange(itemValue);
								}}
								style={styles.picker}
							>
								{items.map((item, index) => (
									<Picker.Item
										key={index}
										label={item.label}
										value={item.value}
									/>
								))}
							</Picker>
						</Pressable>
						{error && <Text style={styles.errorText}>{error.message}</Text>}
					</View>
				);
			}}
		/>
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
		borderWidth: 1,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		paddingLeft: 10
	},
	picker: {
		flex: 1
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 5
	}
});

export default Select;
