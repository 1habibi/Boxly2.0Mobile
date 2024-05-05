import { useAssets } from "expo-asset";
import { Link, Redirect, usePathname, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

import { useAuth } from "@/src/hooks/useAuth";
import { useCheckAuth } from "@/src/providers/useCheckAuth";

export default function Home() {
	const { user, setUser } = useAuth();
	const navigation = usePathname();
	useCheckAuth(navigation);

	if (!user) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<View className="flex-1 items-center justify-center">
			<Image
				className="w-[200px] h-[200px]"
				source={require("@/assets/images/home_hero.png")}
			/>
			<Text className="size-xl">Лучшая доставка в вашем городе</Text>
		</View>
	);
}
