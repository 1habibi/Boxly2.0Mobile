import { Redirect, usePathname } from "expo-router";
import { Text, View } from "react-native";

import HomeHero from "@/assets/images/home_hero.svg";
import { useAuth } from "@/src/hooks/useAuth";
import { useCheckAuth } from "@/src/providers/useCheckAuth";

export default function Home() {
	const { user } = useAuth();
	const navigation = usePathname();
	useCheckAuth(navigation);

	if (!user) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<View className="h-full my-10 mx-2">
			<View>
				<Text className="text-5xl font-bold">
					Лучшая {"\n"}
					<Text className="text-primary">доставка</Text> в{"\n"}вашем городе
				</Text>
			</View>
			<View className="h-full flex-1 justify-center items-center">
				<HomeHero />
			</View>
		</View>
	);
}
