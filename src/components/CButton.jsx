import { AntDesign } from "@expo/vector-icons";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";

const CButton = ({ className, icon, children, ...rest }) => {
	return (
		<Pressable className={clsx("self-center mt-3.5", className)} {...rest}>
			<LinearGradient
				start={{ x: 0, y: 0.75 }}
				end={{ x: 1, y: 0.25 }}
				className={`py-2 px-6 rounded-2xl items-center ${icon ? "flex-row" : ""}`}
				colors={["#E56427", "#f04f0aff"]}
			>
				<Text
					className={`text-center font-medium text-lg text-[#FFF] ${icon ? "mr-2" : ""}`}
				>
					{children}
				</Text>
				{icon && (
					<AntDesign className="m-0 p-0" name={icon} size={24} color="white" />
				)}
			</LinearGradient>
		</Pressable>
	);
};

export default CButton;
