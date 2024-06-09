import { CheckBox, Icon, useTheme } from "@rneui/themed";
import React from "react";

import Field from "@/src/components/form-elements/field/Field";
import { validEmail } from "@/src/shared/email-regex";
import { validPassword } from "@/src/shared/pass-regex";

const AuthFields = ({ control, isPassRequired }) => {
	const [checked, setChecked] = React.useState(true);
	const toggleCheckbox = () => setChecked(!checked);
	const { theme } = useTheme();
	return (
		<>
			<Field
				placeholder="Почта"
				control={control}
				name="email"
				rules={{
					required: "Обязательное поле",
					pattern: {
						value: validEmail,
						message: "Неверный формат почты"
					}
				}}
				keyboardType="email-address"
				leftIcon={<Icon name="mail-outline" type="ionicon" />}
			/>
			<Field
				placeholder="Пароль"
				control={control}
				secureTextEntry
				name="password"
				rules={
					isPassRequired
						? {
								required: "Обязательное поле",
								pattern: {
									value: validPassword,
									message:
										"Длинна пароля - минимум 8 символов. Должен содержать большие и маленькие буквы, цифры, а также символы"
								}
							}
						: { required: "Обязательное поле" }
				}
				leftIcon={<Icon name="lock1" type="antdesign" />}
			/>
			{isPassRequired && (
				<CheckBox
					checked={checked}
					onPress={toggleCheckbox}
					title="Вы курьер?"
					containerStyle={{ backgroundColor: "transparent", marginTop: -20 }}
					iconType="material-community"
					checkedIcon="checkbox-marked"
					uncheckedIcon="checkbox-blank-outline"
					checkedColor={theme.colors.primary}
				/>
			)}
		</>
	);
};

export default AuthFields;
