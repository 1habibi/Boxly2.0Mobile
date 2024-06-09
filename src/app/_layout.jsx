import { createTheme, ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "../components/ui/Toast";
import AuthProvider from "../providers/AuthProvider";

export default function RootLayout() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	});

	const theme = createTheme({
		lightColors: {
			primary: "#E56427",
			secondary: "transparent"
		},
		components: {
			Divider: {
				style: {
					marginBottom: 10,
					marginTop: 10
				}
			}
		}
	});

	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemeProvider theme={theme}>
					<AuthProvider>
						<SafeAreaView
							edges={["top"]}
							style={{ flex: 1, backgroundColor: "#F2F2F2" }}
						>
							<QueryClientProvider client={queryClient}>
								<Stack>
									<Stack.Screen
										name="(tabs)"
										options={{ headerShown: false }}
									/>
									<Stack.Screen name="index" options={{ headerShown: false }} />
								</Stack>
							</QueryClientProvider>
						</SafeAreaView>
					</AuthProvider>
					<Toast />
				</ThemeProvider>
			</GestureHandlerRootView>
		</>
	);
}
