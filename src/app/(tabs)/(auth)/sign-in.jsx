import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import CButton from "@/src/components/CButton";
import Loader from "@/src/components/Loader";
import AuthFields from "@/src/components/auth-fileds/AuthFields";
import { useAuthMutations } from "@/src/services/auth/useAuthMutations";

export default function Login() {
	const router = useRouter();
	const { handleSubmit, reset, control } = useForm({
		mode: "onChange"
	});

	const { isLoading, loginSync } = useAuthMutations(reset);

	const onSubmit = data => {
		loginSync(data);
		router.replace("/(tabs)");
	};

	return (
		<View className="mx-2 my-2 flex-1 items-center justify-center h-full">
			<View className="w-10/12">
				<Text className="text-center text-4xl font-bold mb-2.5">Вход</Text>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields control={control} isPassRequired={false} />
						<CButton onPress={handleSubmit(onSubmit)} icon="arrowright">
							Войти
						</CButton>
					</>
				)}
				<Link href="/sign-up" asChild>
					<Pressable>
						<Text className="opacity-30 text-center text-base mt-1">
							Регистрация
						</Text>
					</Pressable>
				</Link>
			</View>
		</View>
	);
}
