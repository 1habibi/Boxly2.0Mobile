import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
	const router = useRouter();
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="">Лучшая доставка в вашем городе</Text>
		</View>
	);
}
