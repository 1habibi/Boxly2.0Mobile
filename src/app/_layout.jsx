import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigation, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "../components/ui/Toast";
import AuthProvider from "../providers/AuthProvider";
import { useCheckAuth } from "../providers/useCheckAuth";

export default function RootLayout() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	});

	return (
		<>
			<ApplicationProvider {...eva} theme={eva.light}>
				<AuthProvider>
					<SafeAreaView
						edges={["top"]}
						style={{ flex: 1, backgroundColor: "white" }}
					>
						<QueryClientProvider client={queryClient}>
							<Stack>
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
								<Stack.Screen name="index" options={{ headerShown: false }} />
							</Stack>
						</QueryClientProvider>
					</SafeAreaView>
				</AuthProvider>
			</ApplicationProvider>
			<Toast />
		</>
	);
}
