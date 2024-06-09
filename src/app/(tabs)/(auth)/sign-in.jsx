import { Button, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

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
				<Text className="text-center text-4xl font-bold mb-4">Вход</Text>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields control={control} isPassRequired={false} />
						<Button
							ViewComponent={LinearGradient}
							linearGradientProps={{
								colors: ["#FF9800", "#F44336"],
								start: { x: 0, y: 0.5 },
								end: { x: 1, y: 0.5 }
							}}
							onPress={handleSubmit(onSubmit)}
							containerStyle={{ borderRadius: 10 }}
						>
							Войти
							<Icon
								iconStyle={{ marginLeft: 10 }}
								color="#FFF"
								name="arrowright"
								type="antdesign"
							/>
						</Button>
						<Link href="/sign-up" asChild>
							<Pressable>
								<Text className="opacity-30 text-center text-base mt-1">
									Регистрация
								</Text>
							</Pressable>
						</Link>
					</>
				)}
			</View>
		</View>
	);
}
