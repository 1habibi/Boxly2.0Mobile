import { Button, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

import DatePicker from "../form-elements/date-picker/DatePicker";
import Field from "../form-elements/field/Field";
import Select from "../form-elements/select/Select";

import { useCreateProfile } from "@/src/hooks/profile/useCreateProfile";
import { useUpdateProfile } from "@/src/hooks/profile/useUpdateProfile";

const ProfileForm = ({ profile = null, refetch, mode }) => {
	const { createProfile, isCreateProfileLoading } = useCreateProfile();
	const { updateProfile, isUpdateProfileLoading } = useUpdateProfile();
	const { handleSubmit, reset, control } = useForm({
		mode: "onChange",
		defaultValues: {
			name: profile?.name || null,
			surname: profile?.surname || null,
			patronymic: profile?.patronymic || null,
			birthday: profile?.birthday || null,
			gender: profile?.gender || null,
			address: profile?.address || null
		}
	});

	const onFinish = async data => {
		console.log(data);
		try {
			if (mode === "update") {
				const id = profile.id;
				await updateProfile({ data, id });
			} else if (mode === "create") {
				await createProfile(data);
			}
		} catch (e) {
			console.error("Ошибка: ", e);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={{
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				paddingVertical: 10
			}}
		>
			<Field
				control={control}
				name="name"
				label="Имя"
				placeholder="Имя"
				leftIcon={<Icon name="user" type="antdesign" size={20} />}
			/>
			<Field
				control={control}
				name="surname"
				label="Фамилия"
				placeholder="Фамилия"
				leftIcon={<Icon name="user" type="antdesign" size={20} />}
			/>
			<Field
				control={control}
				name="patronymic"
				label="Отчество"
				placeholder="Отчество"
				leftIcon={<Icon name="user" type="antdesign" size={20} />}
			/>
			<Field
				control={control}
				name="address"
				label="Адрес"
				placeholder="Адрес"
				leftIcon={<Icon name="home" type="antdesign" size={20} />}
			/>
			<DatePicker label="Дата рождения" control={control} name="birthday" />
			<Select
				control={control}
				name="gender"
				placeholder="Пол"
				label="Пол"
				icon={{ type: "font-awesome", name: "transgender" }}
				items={[
					{
						label: "Мужской",
						value: "Мужской"
					},
					{
						label: "Женский",
						value: "Женский"
					}
				]}
			/>
			<View className="mt-5">
				<Button
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: ["#FF9800", "#F44336"],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 }
					}}
					loading={isCreateProfileLoading || isUpdateProfileLoading}
					onPress={handleSubmit(onFinish)}
					containerStyle={{ borderRadius: 10 }}
				>
					Сохранить
					<Icon
						iconStyle={{ marginLeft: 10 }}
						color="#FFF"
						name="save"
						type="font-awesome"
					/>
				</Button>
			</View>
		</ScrollView>
	);
};

export default ProfileForm;
