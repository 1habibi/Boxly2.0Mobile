import clsx from "clsx";
import { Controller } from "react-hook-form";
import { TextInput, View, Text } from "react-native";

const Field = ({ control, rules, name, className, ...rest }) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<>
					<View
						className={clsx(
							"w-full border border-dark rounded-xl pb-4 pt-2 px-3 my-1.5 bg-light",
							error ? "border-red" : "border-transparent"
						)}
					>
						<TextInput
							autoCapitalize="none"
							onChangeText={onChange}
							onBlur={onBlur}
							value={(value || "").toString()}
							className="text-base"
							{...rest}
						/>
					</View>
					{error && (
						<Text className="text-[12px] text-customError">
							{error.message}
						</Text>
					)}
				</>
			)}
		/>
	);
};

export default Field;
