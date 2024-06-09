import { Input, useTheme } from "@rneui/themed";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { TextInput, View, Text } from "react-native";

const Field = ({ control, rules, name, className, ...rest }) => {
	const { theme } = useTheme();
	return (
		<View className="w-full">
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<Input
							selectionColor={theme.colors.primary}
							autoCapitalize="none"
							onChangeText={onChange}
							onBlur={onBlur}
							value={(value || "").toString()}
							errorMessage={error ? error.message : ""}
							errorStyle={{ fontSize: 12 }}
							leftIconContainerStyle={{ padding: 5, marginRight: 5 }}
							inputStyle={{ fontSize: 16 }}
							labelStyle={{
								color: "#111",
								marginBottom: 5,
								fontWeight: "900",
								fontSize: 16
							}}
							inputContainerStyle={{
								borderBottomWidth: 1.1,
								borderWidth: 1.1,
								borderRadius: 10,
								borderColor: error ? "red" : null
							}}
							{...rest}
						/>
					</>
				)}
			/>
		</View>
	);
};

export default Field;
