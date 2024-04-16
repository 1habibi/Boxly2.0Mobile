import React from "react";

import Field from "@/src/components/form-elements/field/Field";
import { validEmail } from "@/src/shared/email-regex";
import { validPassword } from "@/src/shared/pass-regex";

const AuthFields = ({ control, isPassRequired }) => {
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
			/>
			<Field
				placeholder="Пароль"
				control={control}
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
			/>
		</>
	);
};

export default AuthFields;
