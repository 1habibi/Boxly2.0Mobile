import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import CButton from "@/src/components/CButton";
import Loader from "@/src/components/Loader";
import AuthFields from "@/src/components/auth-fileds/AuthFields";

export default function Login() {
	const router = useRouter();
	const [isReg, setIsReg] = useState(false);
	const [isPassReq, setIsPassReq] = useState(false);

	const { handleSubmit, reset, control } = useForm({
		mode: "onChange"
	});

	const onSubmit = ({ email, password }) => {
		console.log(email, password);
	};

	const isLoading = false;
	return (
		<View className="mx-2 my-2 flex-1 items-center justify-center h-full">
			<View className="w-10/12">
				<Text className="text-center text-4xl font-bold mb-2.5">
					{isReg ? "Регистрация" : "Вход"}
				</Text>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields control={control} isPassRequired={isPassReq} />
						<CButton onPress={handleSubmit(onSubmit)} icon="arrowright">
							Войти
						</CButton>
					</>
				)}
				<Pressable
					onPress={() => {
						setIsReg(!isReg);
						setIsPassReq(!isPassReq);
					}}
				>
					<Text className="opacity-30 text-center text-base mt-1">
						{isReg ? "Вход" : "Регистрация"}
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
