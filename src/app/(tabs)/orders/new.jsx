import { useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import Loader from "@/src/components/Loader";
import NewOrderForm from "@/src/components/new-order-form/NewOrderForm";
import { useOrder } from "@/src/hooks/order/useOrder";
import { useProfile } from "@/src/hooks/profile/useProfile";
import { useAuth } from "@/src/hooks/useAuth";

const MyOrders = () => {
	const { user } = useAuth();
	const { orders, isOrdersLoading, refetchOrders } = useOrder(user?.id);
	const { profile, isProfileLoading } = useProfile();
	const { theme } = useTheme();
	const styles = createStyles(theme);

	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries(["user-orders"]).then(() => {
			refetchOrders();
			setRefreshing(false);
		});
	}, [queryClient, refetchOrders]);

	if (isOrdersLoading || isProfileLoading) return <Loader />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Новый {"\n"}
				<Text style={styles.primaryText}>заказ</Text>{" "}
			</Text>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-row items-center">
					<NewOrderForm />
				</View>
			</ScrollView>
		</View>
	);
};

const createStyles = theme =>
	StyleSheet.create({
		container: {
			paddingTop: 40,
			paddingBottom: 8,
			paddingHorizontal: 8,
			flex: 1
		},
		title: {
			fontSize: 48,
			lineHeight: 48,
			fontWeight: "bold",
			marginBottom: 0
		},
		primaryText: {
			color: theme.colors.primary
		},
		newOrderButton: {
			alignItems: "center",
			marginTop: 10
		},
		modalButtons: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			columnGap: 50
		},
		modalButtonText: {
			fontWeight: "bold",
			fontSize: 20
		},
		closeButton: {
			marginTop: 20,
			display: "flex",
			alignItems: "flex-end"
		},
		closeButtonText: {
			color: theme.colors.primary,
			fontSize: 16
		},
		modalTitle: {
			color: theme.colors.primary,
			fontWeight: "bold",
			fontSize: 24,
			marginBottom: 25
		}
	});

export default MyOrders;
